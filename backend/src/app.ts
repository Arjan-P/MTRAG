import express from "express";
import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UnauthorizedError } from "./lib/errors.js";
import userRoutes from "./routes/users.routes.js";

const app = express();

app.use('api/user', userRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof UnauthorizedError) {
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
