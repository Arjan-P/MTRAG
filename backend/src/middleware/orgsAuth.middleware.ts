import type { Request, Response, NextFunction } from "express"
import { prisma } from "../lib/prisma.js";
import { UnauthorizedError } from "../lib/errors.js";

export const orgsAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { org_id } = req.params;
  const user_id = req.user?.id;

  if (!org_id || !user_id) {
    return next(new UnauthorizedError());
  }

  if (typeof org_id !== "string") {
    return res.status(400).json({ error: "invalid org id" });
  }
  if (typeof user_id !== "string") {
    return res.status(400).json({ error: "invalid project id" });
  }

  const membership = await prisma.member.findUnique({
    where: {
      user_id_org_id: {
        user_id: user_id,
        org_id
      }
    }
  });

  if (!membership) {
    return next(new UnauthorizedError("Not a member of this organization"));
  }

  req.membership = membership;

  next();
}
