import { ENV } from "../../config/env.js";
import { comparePassword, hashPassword } from "../../lib/bcrypt.js";
import { UnauthorizedError } from "../../lib/errors.js";
import { prisma } from "../../lib/prisma.js";
import jwt from "jsonwebtoken";

export const createUser = async (email: string, name: string, password: string) => {
  const existing = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (existing) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  return prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hashedPassword
    }
  })
}

export const getUser = async (id: string) => {
  return prisma.user.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true
    }
  })
}

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new UnauthorizedError("Invalid credentials");
  }
  const isValid = await comparePassword(password, user.passwordHash);
  if(!isValid) {
    throw new UnauthorizedError("Invalid credentials");
  }
  const token = jwt.sign(
    {sub: user.id},
    ENV.JWT_SECRET,
    {expiresIn: "15m"}
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  }
}
