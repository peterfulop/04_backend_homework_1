import { NextFunction, Request, Response, Router } from "express";
import HttpExceptions from "../../exceptions/http.exception";
import validationMiddleware from "../../middleware/validation.middleware";
import Controller from "../../utils/interfaces/controller.interface";
import { createSendToken } from "../../utils/token";
import { UserEntryCreateOptions, UserLoginOptions } from "./user.interface";
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
    this.router.post(
      `${this.path}/signup`,
      validationMiddleware(validation.create),
      this.signup
    );
    this.router.post(`${this.path}/login`, this.login);

    this.router.get(`${this.path}`, this.getAll);
    this.router.get(`${this.path}/:id`, this.getOne);
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(validation.create),
      this.update
    );
    this.router.delete(`${this.path}/:id`, this.delete);
  }

  private login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user: UserLoginOptions = { email, password };
      const data = await this.userService.loginUser(user);
      res.status(200).json({
        status: "success",
        data,
      });
    } catch (error: any) {
      next(new HttpExceptions(400, error.message));
    }
  };

  private signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password, confirmPassword } = req.body;
      const updateUser: UserEntryCreateOptions = {
        username,
        email,
        password,
        confirmPassword,
      };
      const data = await this.userService.createUser(updateUser);
      const userId = data._id as string;
      createSendToken(userId, 200, res);
      //   res.status(200).json({
      //     id: data._id,
      //     status: "success",
      //     data,
      //   });
    } catch (error: any) {
      next(new HttpExceptions(400, error.message));
    }
  };

  private getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.userService.getUsers();
      res.status(200).json({
        status: "success",
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
      const data = await this.userService.deleteUser(id);
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
      const { username, email, password, confirmPassword } = req.body;
      const updateUser: UserEntryCreateOptions = {
        username,
        email,
        password,
        confirmPassword,
      };
      const data = await this.userService.updateUser(id, updateUser);
      res.status(200).json({
        status: "success",
        data,
      });
    } catch (error: any) {
      next(new HttpExceptions(400, error.message));
    }
  };
}

export default UserController;
