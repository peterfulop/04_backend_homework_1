import { Request, Response, NextFunction } from "express";
import HttpExceptions from "../exceptions/http.exception";

const setErrorDetails = (error: HttpExceptions) => {
  let errorMessage: string = "Internal server error";
  let statusCode: number = 500;
  if (error.name === "JsonWebTokenError" || error.message === "notoken") {
    errorMessage = "You are not logged in!";
    statusCode = 401;
  } else if (error.message === "nouser") {
    errorMessage = "The user no longer exists";
    statusCode = 401;
  } else if (error.name === "TokenExpiredError") {
    errorMessage = "Expired token. You must be logged in!";
    statusCode = 401;
  } else if (error.message.includes("Cast to ObjectId failed")) {
    errorMessage = "Not found";
    statusCode = 404;
  } else if (error.message.includes("E11000")) {
    errorMessage = "The email is already in use";
    statusCode = 400;
  }
  return { errorMessage, statusCode };
};

const ErrorMiddleware = (
  err: HttpExceptions,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errorObject = setErrorDetails(err);
  const status = errorObject.statusCode;
  const error = errorObject.errorMessage;

  res.status(status).send({
    error,
  });
};

export default ErrorMiddleware;
