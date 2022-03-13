import { RequestHandler } from "express";
import User from "../resources/user/user.model";
import { verifyToken } from "../utils/token";

export const protect: RequestHandler = async (req, res, next) => {
  try {
    console.log("Protected rout...");
    console.log(req.headers.authorization);

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
        error: "You are not logged in!",
      });
    }

    const decoded = await verifyToken(token);
    const activeUser = await User.findById(Object(decoded).id);
    if (!activeUser) {
      return res.status(401).json({
        error: "The user belonging to this token does no longer exist.",
      });
    }
    req.user = activeUser;
    res.locals.user = activeUser;
    next();
  } catch (error: any) {
    let message: string = "internal server error";
    if (error.name === "JsonWebTokenError") {
      message = "Invalid token!";
    } else if (error.name === "TokenExpiredError") {
      message = "Expired token!";
    }
    res.status(500).json({
      error: message,
    });
  }
};
