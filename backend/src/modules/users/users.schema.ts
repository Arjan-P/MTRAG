import { z } from "zod";

export const createUserSchema = z.object({
  email: z.email(),
  name: z.string(),
  password: z.string().min(8)
});

export const loginUserSchema = z.object({
  email: z.email(),
  password: z.string().min(8)
})

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
