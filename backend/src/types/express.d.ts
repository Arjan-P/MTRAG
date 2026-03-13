import "express";
import type { Member } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
      membership?: Member;
    }
  }
}
