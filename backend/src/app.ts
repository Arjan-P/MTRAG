import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import userRoutes from "./modules/users/users.routes.js";
import orgsRoutes from "./modules/orgs/orgs.routes.js";

import type { Request, Response, NextFunction } from "express";

import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ConflictError, UnauthorizedError } from "./lib/errors.js";

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: {
    error: "Too many requests"
  }
});

const app = express();

app.use(express.json()); // request body json parser
app.use(morgan("dev"));  // http request logger
app.use(apiLimiter);     // enforce api request limit within a time window

app.use('/api/user', userRoutes);
app.use('/api/orgs', orgsRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof UnauthorizedError) {
    return res.status(err.statusCode).json({
      error: err.message
    });
  }
  if (err instanceof ConflictError) {
    return res.status(err.statusCode).json({
      error: err.message
    });
  }
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Validation failed",
      issues: err.issues
    })
  }
  if (err instanceof PrismaClientKnownRequestError) {
    return res.status(400).json({
      error: "Database error",
      issues: err.code
    });
  }
  console.error(err);
  return res.status(500).json({ error: "Internal server error" });
});

export default app;
