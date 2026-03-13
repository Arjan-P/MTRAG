import type { Request, Response } from "express";
import { createOrgSchema, inviteUserSchema } from "./orgs.schema.js";
import { createOrganization, getOrganization, inviteUser } from "./orgs.service.js";

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

export const inviteUserController = async (req: Request, res: Response) => {
  const {org_id} = req.params;
  if(typeof org_id !== "string") {
    return res.status(400).json({error: "invalid org id"});
  }
  const parsed = inviteUserSchema.parse(req.body); 
  const member = await inviteUser(org_id, parsed.email, parsed.role);
  return res.status(201).json({
    id: member.id,
    role: member.role,
    createdAt: member.createdAt
  })
}
