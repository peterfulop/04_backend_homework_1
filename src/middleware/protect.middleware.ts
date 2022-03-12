import { RequestHandler } from "express";
import { verifyToken } from "../utils/token";

export const protect: RequestHandler = async (req, res, next) => {
  try {
    console.log("Protected rout...");
    const VALID_USERID: string = String(process.env.VALID_USERID);
    let token: string | undefined;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      return res.status(401).json({
        error: "No token.",
      });
    }
    const decoded = await verifyToken(token);
    if (VALID_USERID !== Object(decoded).id) {
      return res.status(401).json({
        error: "You are not logged in!",
      });
    }
    next();
  } catch (error: any) {
    let message: string = "internal server error";
    if (error.name === "JsonWebTokenError") {
      message = "Invalid token!";
    } else if (error.name === "TokenExpiredError") {
      message = "Expired token!";
    }
    res.status(500).json({
      a: error.message,
      error: message,
    });
  }
};
