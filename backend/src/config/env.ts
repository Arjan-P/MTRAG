import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

// load env file from project root based on environment

const envFile =
  process.env.NODE_ENV === "test"
    ? ".env.test"
    : ".env";

console.log(`Loaded ${envFile}`);

dotenv.config({
  path: path.resolve(process.cwd(), envFile),
});

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const envSchema = z.object({
  PORT: z.string().default("3000"),
  JWT_SECRET: z.string()
});

export type EnvSchemaType = z.infer<typeof envSchema>;

export const ENV = envSchema.parse(process.env);
