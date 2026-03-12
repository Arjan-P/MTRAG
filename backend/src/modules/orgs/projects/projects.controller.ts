import type { Request, Response } from "express";
import { createProjectSchema } from "./projects.schema.js"
import { createProject, getProject } from "./projects.service.js";

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

export const getProjectController = async (req: Request, res: Response) => {
  const org_id = req.params.org_id;
  const id = req.params.id;

  if(typeof org_id !== "string") {
    return res.status(400).json({error: "invalid org id"});
  }
  if(typeof id !== "string") {
    return res.status(400).json({error: "invalid project id"});
  }

  const project = await getProject(id);
  if(!project) {
    return res.status(404).json({error: "project not found"});
  }
  return res.status(200).json({
    id: project.id,
    name: project.name,
    createdAt: project.createdAt
  })
}
