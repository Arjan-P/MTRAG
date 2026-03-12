import type { Request, Response } from "express";
import { createProjectSchema } from "./projects.schema.js"
import { createProject } from "./projects.service.js";

export const createProjectController = async (req: Request, res: Response) => {
  const org_id = req.params.org_id;
  const parsed = createProjectSchema.parse(req.body);
  if(typeof org_id !== "string") {
    return res.status(400).json({error: "invalid org id"});
  }
  const project = await createProject(parsed.name, org_id);
  return res.status(201).json({
    id: project.id,
    name: project.name,
    createdAt: project.createdAt
  })
}
