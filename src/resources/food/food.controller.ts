import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpExceptions from "../../exceptions/http.exception";
import validationMiddleware from "../../middleware/validation.middleware";
import validate from "../food/food.validation";
import FoodService from "../food/food.service";

class FoodController implements Controller {
  public path = "/food";
  public router = Router();
  private FoodService = new FoodService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.get(`${this.path}`, this.getAll);

    this.router.get(`${this.path}/:id`, this.getById);

    this.router.post(
      `${this.path}`,
      validationMiddleware(validate.create),
      this.create
    );

    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(validate.create),
      this.update
    );

    this.router.delete(`${this.path}/:id`, this.delete);
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { name, details } = req.body;
      const data = await this.FoodService.createFood(name, details);
      res.status(201).json({ status: "success", data });
    } catch (error: any) {
      next(new HttpExceptions(400, error.message));
    }
  };

  private update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { name, details } = req.body;
      const { id } = req.params as { id: string };
      const data = await this.FoodService.updateFood(id, name, details);
      res.status(200).json({
        status: "success",
        message: "Document has been updated",
        data,
      });
    } catch (error: any) {
      next(new HttpExceptions(400, error.message));
    }
  };

  private delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params as { id: string };
      const data = await this.FoodService.deleteFood(id);
      res.status(204).json({
        status: "success",
        message: "Document has been deleted",
        data: null,
      });
    } catch (error: any) {
      next(new HttpExceptions(400, error.message));
    }
  };

  private getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const data = await this.FoodService.getFoods();
      res.status(200).json({
        status: "success",
        data: { data },
      });
    } catch (error: any) {
      next(new HttpExceptions(400, error.message));
    }
  };

  private getById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params as { id: string };
      const data = await this.FoodService.getFood(id);
      res.status(201).json({
        status: "success",
        results: data.length,
        data: { data },
      });
    } catch (error: any) {
      next(new HttpExceptions(400, error.message));
    }
  };
}

export default FoodController;
