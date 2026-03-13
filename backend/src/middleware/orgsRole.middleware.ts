import type { Request, Response, NextFunction } from "express";
import type { Role } from "@prisma/client";
import { UnauthorizedError } from "../lib/errors.js";

export function requireOrgRole(roles: Role[]) {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const membership = req.membership;

    if (!membership) {
      return next(new UnauthorizedError());
    }

    if (!roles.includes(membership.role)) {
      return next(new UnauthorizedError("Insufficient permission"));
    }

    next();
  }
};

