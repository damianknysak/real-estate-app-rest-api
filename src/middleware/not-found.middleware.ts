import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const message = "Resource not found";

  if (request.path.startsWith("/images")) {
    return next();
  }

  response.status(404).send(message);
};
