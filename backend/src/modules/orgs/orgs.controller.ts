import type { Request, Response } from "express";
import { createOrgSchema } from "./orgs.schema.js";
import { createOrganization, getOrganization } from "./orgs.service.js";

export const createOrgController = async (req: Request, res: Response) => {
  const parsed = createOrgSchema.parse(req.body);
  const org = await createOrganization(req.user!.id, parsed.name);

  return res.status(201).json({
    id: org.id,
    name: org.name,
    createdAt: org.createdAt
  })
}

export const getOrgController = async (req: Request, res: Response) => {
  const orgs = await getOrganization(req.user!.id);
  return res.status(200).json({
    orgs
  })
}
