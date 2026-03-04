import dotenv from "dotenv";
import path from "path";

// load .env from project root
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export interface EnvConfig {
  PORT: string;
  JWT_SECRET: string;
}

export const ENV: EnvConfig = {
  PORT: process.env.PORT ?? "3000",
  JWT_SECRET: process.env.JWT_SECRET!
};
