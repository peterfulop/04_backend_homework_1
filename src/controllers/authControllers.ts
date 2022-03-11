import { RequestHandler, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as Secret, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (userId: string, statusCode: number, res: Response) => {
  const token = signToken(userId);
  const cookieExpiresIn: number = parseInt(
    `${process.env.JWT_COOKIE_EXPIRES_IN}`,
    10
  );
  const cookieOptions: any = {
    expires: new Date(Date.now() + cookieExpiresIn * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }
  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({
    token,
  });
};

const verifyToken = async (token: string) => {
  return new Promise<any>((resolve, rejects) => {
    try {
      resolve(jwt.verify(token, process.env.JWT_SECRET as string));
    } catch (error) {
      rejects(error);
    }
  });
};

export const login: RequestHandler = async (req, res, _next) => {
  try {
    const VALID_PASSWORD = process.env.VALID_PASSWORD as string;
    const VALID_USERID = process.env.VALID_USERID as string;

    const { username, password } = req.body as {
      username: string;
      password: string;
    };
    if (!username || !password) {
      throw Error();
    }
    const userPassword = await bcrypt.compare(password, VALID_PASSWORD);
    if (!userPassword) {
      return res.status(401).json({
        error: "invalid login credential",
      });
    }
    createSendToken(VALID_USERID, 200, res);
  } catch (e) {
    res.status(500).json({
      error: "internal server error",
    });
  }
};

export const protect: RequestHandler = async (req, res, next) => {
  try {
    console.log("Protected rout...");
    const VALID_USERID = process.env.VALID_USERID as string;
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
