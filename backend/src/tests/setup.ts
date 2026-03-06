console.log("Vitest setup loaded");
// setup env for prisma and config
process.env.NODE_ENV = "test";

import {beforeEach} from "vitest";
import {prisma} from "../lib/prisma.js";

beforeEach(async () => {
  console.log("Clearing db");
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "User", "Organization", "Member" RESTART IDENTITY CASCADE
  `);
});

