console.log("Vitest setup loaded");
// setup env for prisma and config
process.env.NODE_ENV = "test";

import { beforeEach, afterAll } from "vitest";
import { prisma } from "../lib/prisma.js";

beforeEach(async () => {
  await prisma.$transaction([
    prisma.member.deleteMany(),
    prisma.project.deleteMany(),
    prisma.organization.deleteMany(),
    prisma.user.deleteMany()
  ]);
});

afterAll(async () => {
  await prisma.$disconnect();
});
