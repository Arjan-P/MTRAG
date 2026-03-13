import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";
import { createAuthToken } from "./utils/auth.js";
import { withAuth } from "./utils/request.js";

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

  it("should get logged in user information", async () => {
    const token = await createAuthToken({ email: "user@mail.com" });
    const auth = withAuth(token);
    const res = await auth
      .get("/api/user/me")

    expect(res.status).toBe(200);
    expect(res.body.email).toBe("user@mail.com");
  });
});
