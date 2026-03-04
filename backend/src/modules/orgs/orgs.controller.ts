import type { Response } from "express";
import { createOrgSchema } from "./orgs.schema.js";
import { createOrganization, getOrganization } from "./orgs.service.js";
import type { AuthenticatedRequest } from "../../types/express.js";

export const createOrgController = async (req: AuthenticatedRequest, res: Response) => {
  const parsed = createOrgSchema.parse(req.body);
  const org = await createOrganization(req.user.id, parsed.name);

  return res.status(201).json({
    id: org.id,
    name: org.name,
    createdAt: org.createdAt
  })
}

export const getOrgController = async (req: AuthenticatedRequest, res: Response) => {
  const orgs = await getOrganization(req.user.id);
  return res.status(200).json({
    orgs
  })
}
