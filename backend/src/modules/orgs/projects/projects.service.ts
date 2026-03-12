import { prisma } from "../../../lib/prisma.js";

export const createProject = async (name: string, org_id: string) => {
  return prisma.project.create({
    data: {
      name,
      org_id
    }
  });
}
