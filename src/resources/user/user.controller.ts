import { NextFunction, Request, Response, Router } from "express";
import HttpExceptions from "../../exceptions/http.exception";
import { protect } from "../../middleware/protect.middleware";
import validationMiddleware from "../../middleware/validation.middleware";
import Controller from "../../utils/interfaces/controller.interface";
import { createSendToken } from "../../utils/token";
import { UserCreateOptions, UserUpdateOptions } from "./user.interface";
import UserService from "./user.service";
import validation from "./user.validation";

class UserController implements Controller {
  path = "/user";
  router = Router();
  userService = new UserService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes() {
    this.router.post(`${this.path}/signup`, validationMiddleware(validation.create), this.signup);
    this.router.post(`${this.path}/login`, validationMiddleware(validation.login), this.login);
    this.router.get(`${this.path}/logout`, this.logout);
    this.router.get(`${this.path}`, protect, this.getAll);
    this.router.get(`${this.path}/:id`, protect, this.getOne);
    this.router.put(`${this.path}/:id`, protect, validationMiddleware(validation.update), this.update);
    this.router.delete(`${this.path}/:id`, protect, this.delete);
  }

  private login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        res.status(400).json({
          status: "Please provide email and password!",
        });
      }
      const user = await this.userService.loginUser(username, password);
      if (!user) {
        return res.status(401).json({
          error: "invalid login credential",
        });
      }
      createSendToken(user._id, 200, res);
    } catch (error: any) {
      next(new HttpExceptions(400, error.message));
    }
  };

  private signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password, confirmPassword } = req.body;
      const updateUser: UserCreateOptions = {
        username,
        email,
        password,
        confirmPassword,
      };
      const data = await this.userService.createUser(updateUser);
      const userId = data._id as string;
      createSendToken(userId, 200, res);
      res.status(200).json({
        id: data._id,
        status: "success",
        data,
      });
    } catch (error: any) {
      next(new HttpExceptions(400, error.message));
    }
  };

  private logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("jwt", "", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
      });
      res.status(200).json({
        status: "You logged out!",
      });
    } catch (error: any) {
      next(new HttpExceptions(400, error.message));
    }
  };

  private getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.userService.getUsers();
      res.status(200).json({
        status: "success",
        results: data.length,
        data,
      });
    } catch (error: any) {
      next(new HttpExceptions(400, error.message));
    }
  };

  private getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string };
      const data = await this.userService.getUser(id);
      if (!data) {
        return res.status(404).json({
          error: "Id not exist!",
        });
      }
      res.status(200).json({
        status: "success",
        data,
      });
    } catch (error: any) {
      next(new HttpExceptions(400, error.message));
    }
  };

  private update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string };
      const { username, email } = req.body;
      const updateUser: UserUpdateOptions = {
        username,
        email,
      };
      const data = await this.userService.updateUser(id, updateUser);
      if (!data) {
        return res.status(404).json({
          error: "Id not exist!",
        });
      }
      res.status(200).json({
        status: "success",
        data,
      });
    } catch (error: any) {
      next(new HttpExceptions(400, error.message));
    }
  };

  private delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string };
      await this.userService.deleteUser(id);
      res.status(204).json({
        status: "success",
        message: "Document has been deleted",
        data: null,
      });
    } catch (error: any) {
      next(new HttpExceptions(400, error.message));
    }
  };
}

export default UserController;
