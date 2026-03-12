import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";
import {createAuthToken} from "./utils/auth.js";

describe("Project routes", () => {
  it("should create an orgranization project", async () => {
    const token = await createAuthToken();
    const orgCreateRes = await request(app)
    .post("/api/orgs")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Test Org"
    });

    const projCreateRes = await request(app)
    .post(`/api/orgs/${orgCreateRes.body.id}/projects`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Test Proj"
    });

    expect(projCreateRes.status).toBe(201);
    expect(projCreateRes.body.name).toBe("Test Proj");
  })
})
