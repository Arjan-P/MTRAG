import jwt from "jsonwebtoken"
import type { Response, NextFunction } from "express"
import { ENV } from "../config/env.js"
import type { AuthenticatedRequest } from "../types/express.js";

interface JWTPayload {
  sub: string;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  if(!token) return res.status(401).json({error: "No token provided"});

  try {
    const payload = jwt.verify(token, ENV.JWT_SECRET) as JWTPayload;
    if(!payload.sub) throw new Error("Invalid token");

    req.user = { id: payload.sub};

    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}
