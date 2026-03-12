import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(3).max(100)
})

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
