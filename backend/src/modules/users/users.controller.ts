import type { Request, Response } from "express";
import {createUserSchema, loginUserSchema} from "./users.schema.js";
import {createUser, getUser, loginUser} from "./users.service.js"

export const createUserController = async (req: Request, res: Response) => {
  const parsed = createUserSchema.parse(req.body);
  const user = await createUser(parsed.email, parsed.name, parsed.password);

  return res.status(201).json({
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt
  });
}

export const getUserController = async (req: Request, res: Response) => {
  const user = await getUser(req.user!.id);
  return res.status(200).json({
    user
  });
}

export const loginUserController = async (req: Request, res: Response) => {
  const parsed = loginUserSchema.parse(req.body);
  const result = await loginUser(parsed.email, parsed.password);
  return res.status(200).json(result);
}
