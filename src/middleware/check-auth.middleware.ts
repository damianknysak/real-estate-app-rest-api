import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const checkAuth = (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Auth failed",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY as string);
    req.body.userData = decoded;
    req.userData = decoded;
    next();
  } catch (e) {
    console.error(e);
    res.status(401).json({
      message: "Auth failed",
    });
  }
};
