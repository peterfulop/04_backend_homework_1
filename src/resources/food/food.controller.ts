import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpExceptions from "../../exceptions/http.exception";

class FoodController implements Controller {
  public path = "/food";
  public router = Router();

  constructor() {
    this.initialiseRoutes();
  }
  private initialiseRoutes(): void {}
}
