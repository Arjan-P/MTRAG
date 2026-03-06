import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../app.js";
import { prisma } from "../lib/prisma.js";
import {createAuthToken} from "./utils/auth.js";

// Follow:
// Arrange
// Act
// Assert


describe("Organization routes", () => {
  it("should create an organization", async () => {

    const token = await createAuthToken();

    const orgCreateRes = await request(app)
    .post("/api/orgs")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Test Org",
    });

    expect(orgCreateRes.status).toBe(201);
    expect(orgCreateRes.body.name).toBe("Test Org");
  });

  it("should get all orgs user is a part of", async () => {
    const token = await createAuthToken();

    const orgGetRequest = await request(app)
    .get("/api/orgs")
    .set("Authorization", `Bearer ${token}`)

    expect(orgGetRequest.status).toBe(200);
  });
})
