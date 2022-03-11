import { Request, Response, NextFunction } from "express";
import { stat } from "fs";
import HttpExceptions from "../exceptions/http.exception";

const ErrorMiddleware = (
  error: HttpExceptions,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const status = error.status || 500;
  const message = error.message || "Internal server error";

  res.status(status).send({
    status,
    message,
  });
};

export default ErrorMiddleware;
