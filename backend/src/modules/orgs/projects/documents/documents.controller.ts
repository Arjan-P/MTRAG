import type { Request, Response } from "express";
import { uploadDocumentSchema } from "./documents.schema.js";
import { uploadDocument } from "./documents.service.js";

export const uploadDocumentController = async (req: Request, res: Response) => {
  const { org_id, project_id } = req.params as {
    org_id: string;
    project_id: string;
  };
  const user_id = req.user!.id;
  const parsed = uploadDocumentSchema.parse(req.body);
  const document = await uploadDocument(parsed, org_id, project_id, user_id);
  return res.status(201).json({
    id: document.id,
    name: document.name,
    key: document.key,
    status: document.status,
    createdAt: document.createdAt
  });
}
