import { Request, Response, NextFunction } from "express";
import HttpExceptions from "../exceptions/http.exception";
import ErrorObject from "../utils/interfaces/error.interface";

const handleDuplicateFieldsDB = (err: any): ErrorObject => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return { statusCode: 400, errorMessage: message };
};

const setErrorDetails = (error: HttpExceptions) => {
  let errorMessage: string = "Internal server error";
  let statusCode: number = 500;
  if (error.name === "JsonWebTokenError" || error.message === "notoken") {
    errorMessage = "You are not logged in!";
    statusCode = 401;
  } else if (error.message === "loginerror") {
    (errorMessage = "invalid login credential"), (statusCode = 401);
  } else if (error.message === "nouser") {
    errorMessage = "The user no longer exists";
    statusCode = 401;
  } else if (error.name === "TokenExpiredError") {
    errorMessage = "Expired token. You must be logged in!";
    statusCode = 401;
  } else if (error.message.includes("Cast to ObjectId failed") || error.message === "nodata") {
    errorMessage = "not found";
    statusCode = 404;
  }
  return { errorMessage, statusCode };
};

const ErrorMiddleware = (err: HttpExceptions, req: Request, res: Response, next: NextFunction): void => {
  let errorObj: ErrorObject;

  if (err.message.includes("11000")) {
    errorObj = handleDuplicateFieldsDB(err);
  } else {
    errorObj = setErrorDetails(err);
  }
  res.status(errorObj.statusCode).send({
    error: errorObj.errorMessage,
  });
};

export default ErrorMiddleware;
