import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpExceptions from "../../exceptions/http.exception";
import validationMiddleware from "../../middleware/validation.middleware";
import validate from "../food/food.validation";
import FoodService from "../food/food.service";
import { FoodEntryCreateOptions, FoodEntryUpdateOptions } from "./food.interface";
import { protect } from "../../middleware/protect.middleware";

class FoodController implements Controller {
  public path = "/food";
  public router = Router();
  private FoodService = new FoodService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.get(`${this.path}`, protect, this.getAll);
    this.router.get(`${this.path}/:id`, protect, this.getOne);
    this.router.post(`${this.path}`, protect, validationMiddleware(validate.create), this.create);
    this.router.put(`${this.path}/:id`, protect, validationMiddleware(validate.create), this.update);
    this.router.delete(`${this.path}/:id`, protect, this.delete);
  }

  private getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const data = await this.FoodService.getFoods();
      res.status(200).json({
        status: "success",
        results: data.length,
        data,
      });
    } catch (error: any) {
      next(new HttpExceptions(400, error.message));
    }
  };

  private getOne = async (req: Request, res: Response, next: NextFunction): Promise<Response | any> => {
    try {
      const { id } = req.params as { id: string };
      const data = await this.FoodService.getFood(id);
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

  private create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { name, details } = req.body;
      const newFood: FoodEntryCreateOptions = { name, details };
      const data = await this.FoodService.createFood(newFood);
      res.status(201).json({ status: "success", data });
    } catch (error: any) {
      next(new HttpExceptions(400, error.message));
    }
  };

  private update = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { name, details } = req.body;
      const { id } = req.params as { id: string };
      const updateFood: FoodEntryUpdateOptions = { name, details };
      const data = await this.FoodService.updateFood(id, updateFood);
      if (!data) {
        return res.status(404).json({
          error: "Id not exist!",
        });
      }
      res.status(200).json({
        status: "success",
        message: "Document has been updated",
        data,
      });
    } catch (error: any) {
      next(new HttpExceptions(400, error.message));
    }
  };

  private delete = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { id } = req.params as { id: string };
      await this.FoodService.deleteFood(id);
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

export default FoodController;
