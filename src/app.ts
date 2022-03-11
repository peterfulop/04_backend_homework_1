import express, { Application } from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import Controller from "./utils/interfaces/controller.interface";
import ErrorMiddleware from "./middleware/error.middleware";

class App {
  public express: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

    //this.initialiseDatabaseConnection();
    this.initialiseMiddleware();
    this.initialiseControllers(controllers);
    this.initialiseErrorHandling();
  }

  private initialiseMiddleware(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(cookieParser());
    this.express.use(morgan("dev"));
    this.express.use(express.urlencoded({ extended: false }));
  }

  private initialiseControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use(process.env.API_URL as string, controller.router);
    });
  }

  private initialiseErrorHandling(): void {
    this.express.use(ErrorMiddleware);
  }

  private initialiseDatabaseConnection(): void {
    const DB = String(process.env.MONGO_PATH).replace(
      "<PASSWORD>",
      String(process.env.MONGO_PASSWORD)
    );
    mongoose.connect(DB).then(() => {
      console.log("DB connection successful!");
    });
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(
        `App is running on port: ${this.port}... mode:${process.env.NODE_ENV}`
      );
    });
  }
}

export default App;
