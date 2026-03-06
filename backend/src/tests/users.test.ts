import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../app.js";
import { prisma } from "../lib/prisma.js";

// Follow:
// Arrange
// Act
// Assert

describe("User routes", () => {
  it("should create a user", async () => {
    const res = await request(app)
      .post("/api/user")
      .send({
        email: "test@mail.com",
        name: "Test",
        password: "Password321"
      });

    expect(res.status).toBe(201);
    expect(res.body.email).toBe("test@mail.com");
  });

  it("should login with an existing user", async () => {
    await request(app)
    .post("/api/user")
    .send({
      email: "test@mail.com",
      name: "Test",
      password: "Password321"
    });
    const res = await request(app)
    .post("/api/user/login")
    .send({
      email: "test@mail.com",
      password: "Password321"
    });
    expect(res.status).toBe(200);
    expect(res.body.email).toBe("test@mail.com");
    expect(res.body.token).toBeDefined();
  });

  it("should reject login with incorrect password", async () => {
    await request(app)
    .post("/api/user")
    .send({
      email: "test@mail.com",
      name: "Test",
      password: "Password321"
    });

    const res = await request(app)
    .post("/api/user/login")
    .send({
      email: "test@mail.com",
      password: "Password123"
    });

    expect(res.status).toBe(401);
    expect(res.body.error).toBeDefined();
  });

  it("should get logged in user information", async() => {
    
    await request(app)
    .post("/api/user")
    .send({
      email: "test@mail.com",
      name: "Test",
      password: "Password123"
    });

    const loginRes = await request(app)
    .post("/api/user/login")
    .send({
      email: "test@mail.com",
      password: "Password123"
    });

    const token = loginRes.body.token;

    const res = await request(app)
    .get("/api/user/me")
    .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.email).toBe(loginRes.body.email);
  });
});
