import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import foodRoutes from "./routes/foodRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();
const API = process.env.API_URL;

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(`${API}/food`, foodRoutes);
app.use(`${API}/user`, userRoutes);

app.all("*", (_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ error: "not found" });
});

export default app;
