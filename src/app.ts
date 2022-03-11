import express, { Application, NextFunction, Request, Response } from "express";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import foodRoutes from "./routes/foodRoutes";
import userRoutes from "./routes/userRoutes";
import Controller from "./utils/interfaces/controller.interface";
import ErrorMiddleware from "./middleware/error.middleware";

// dotenv.config();
// const API = process.env.API_URL;

// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use(cookieParser());

// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

// app.use(`${API}/food`, foodRoutes);
// app.use(`${API}/user`, userRoutes);

// app.all("*", (_req: Request, res: Response, _next: NextFunction) => {
//   res.status(404).json({ error: "not found" });
// });

// export default app;

class App {
  public express: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

    this.initialiseDatabaseConnection();
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

  private initialiseDatabaseConnection(): void {}

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(
        `App is running on port: ${this.port}... mode:${process.env.NODE_ENV}`
      );
    });
  }
}

export default App;
