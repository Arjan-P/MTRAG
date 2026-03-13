import { Role } from "@prisma/client";
import { z } from "zod";

export const createOrgSchema = z.object({
  name: z.string().min(3).max(100)
})

export type CreateOrgInput = z.infer<typeof createOrgSchema>;

export const inviteUserSchema = z.object({
  email: z.email(),
  role: z.enum(Role)
})
export type InviteUserInput = z.infer<typeof inviteUserSchema>;
