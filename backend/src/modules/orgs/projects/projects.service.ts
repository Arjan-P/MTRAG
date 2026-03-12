import { prisma } from "../../../lib/prisma.js";

export const getProject = async (id: string) => {
  return prisma.project.findUnique({
    where: {id}
  });
}


export const createProject = async (name: string, org_id: string) => {
  return prisma.project.create({
    data: {
      name,
      org_id
    }
  });
}
