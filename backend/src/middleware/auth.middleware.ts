import jwt from "jsonwebtoken"
import type { Request, Response, NextFunction } from "express"
import { ENV } from "../config/env.js"
import { UnauthorizedError } from "../lib/errors.js";

interface JWTPayload {
  sub: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new UnauthorizedError());
  };

  const token = authHeader.split(" ")[1];
  if (!token) {
    return next(new UnauthorizedError("No token provided"));
  }

  try {
    const payload = jwt.verify(token, ENV.JWT_SECRET) as JWTPayload;
    if (!payload.sub) {
      throw new UnauthorizedError("Invalid token");
    };

    req.user = { id: payload.sub };

    next();
  } catch {
    next(new UnauthorizedError("Invalid or expired token"));
  }
}
