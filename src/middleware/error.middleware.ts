import { Request, Response, NextFunction } from "express";
import HttpExceptions from "../exceptions/http.exception";

const setErrorMessage = (error: HttpExceptions) => {
  console.log("The Error: ", error);

  let sendingObject = {
    error: "Internal server error",
    status: 500,
  };

  if (error.message.includes("Cast to ObjectId failed")) {
    sendingObject.error = "Not found";
    sendingObject.status = 404;
  } else if (error.message.includes("E11000")) {
    sendingObject.error = "The email is already in use";
    sendingObject.status = 400;
  }
  return sendingObject;
};

const ErrorMiddleware = (
  err: HttpExceptions,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errorObject = setErrorMessage(err);
  const status = errorObject.status;
  const error = errorObject.error;

  res.status(status).send({
    error,
  });
};

export default ErrorMiddleware;
