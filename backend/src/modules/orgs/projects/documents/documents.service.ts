import { prisma } from "../../../../lib/prisma.js";
import type { UploadDocumentInput } from "./documents.schema.js";
import { randomUUID } from "crypto";


export const uploadDocument = async (document: UploadDocumentInput, org_id: string, project_id: string, user_id: string) => {
  const docId = randomUUID();
  const key = `org/${org_id}/projects/${project_id}/${docId}-${document.name}`;
  const project = await prisma.project.findUnique({
    where: { id: project_id },
    select: { id: true }
  });

  if (!project) {
    throw new Error("Project not found");
  }
  return await prisma.document.create({
    data: {
      id: docId,
      name: document.name,
      size: document.size,
      mimeType: document.type,
      org_id,
      key,
      project_id,
      uploadedBy: user_id
    }
  })
}
