import {prisma} from "../../lib/prisma.js";
import { Role } from "@prisma/client"; 

export const createOrganization = async (user_id: string, name: string) => {
  return prisma.$transaction(async (tx) => {
    const org = await tx.organization.create({
      data: {
        name
      }
    });

    await tx.member.create({
      data: {
        user_id,
        org_id: org.id,
        role: Role.OWNER
      }
    });

    return org;
  });
}

export const getOrganization = async (user_id: string) => {
  return prisma.member.findMany({
    where: {
      user_id,
    },
    include: {
      organization: true
    }
  });
}
