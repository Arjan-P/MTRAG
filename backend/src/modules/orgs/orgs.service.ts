import { ConflictError } from "../../lib/errors.js";
import { prisma } from "../../lib/prisma.js";
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

export const inviteUser = async (org_id: string, email: string, role: Role) => {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (!user) {
    throw new Error("User not found");
  }

  const existing = await prisma.member.findUnique({
    where: {
      user_id_org_id: {
        user_id: user.id,
        org_id
      }
    }
  });
  if (existing) {
    throw new ConflictError("User already in organization");
  }
  return prisma.member.create({
    data: {
      user_id: user.id,
      org_id,
      role
    }
  });
}
