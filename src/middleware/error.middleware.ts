import { Request, Response, NextFunction } from "express";
import HttpExceptions from "../exceptions/http.exception";

const selectError = (error: HttpExceptions) => {
  let sendingObject = {
    error: "Internal server error",
    status: 500,
  };

  if (error.message.includes("Cast to ObjectId failed")) {
    sendingObject.error = "Not found";
    sendingObject.status = 404;
  }
  return sendingObject;
};

const ErrorMiddleware = (
  err: HttpExceptions | any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errorObject = selectError(err);
  const status = errorObject.status;
  const error = errorObject.error;

  res.status(status).send({
    error,
  });
};

export default ErrorMiddleware;
