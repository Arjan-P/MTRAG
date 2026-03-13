import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";
import { createAuthToken } from "./utils/auth.js";

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
  });
  it("should get an organization project", async () => {

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

    const projGetRes = await request(app)
      .get(`/api/orgs/${orgCreateRes.body.id}/projects/${projCreateRes.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(projGetRes.status).toBe(200);
    expect(projGetRes.body.name).toBe(projCreateRes.body.name);
  });

  it("should reject cross org project access", async () => {
    const u1token = await createAuthToken({ email: "user1@mail.com" });
    const u2token = await createAuthToken({ email: "user2@mail.com" });

    const org1 = await request(app)
      .post("/api/orgs")
      .set("Authorization", `Bearer ${u1token}`)
      .send({ name: "Org1" });

    const org2 = await request(app)
      .post("/api/orgs")
      .set("Authorization", `Bearer ${u2token}`)
      .send({ name: "Org2" });

    const proj1 = await request(app)
      .post(`/api/orgs/${org1.body.id}/projects`)
      .set("Authorization", `Bearer ${u1token}`)
      .send({ name: "Proj1" });

    const proj2 = await request(app)
      .post(`/api/orgs/${org2.body.id}/projects`)
      .set("Authorization", `Bearer ${u2token}`)
      .send({ name: "Proj2" });

    const cross1 = await request(app)
      .get(`/api/orgs/${org2.body.id}/projects/${proj2.body.id}`)
      .set("Authorization", `Bearer ${u1token}`);

    const cross2 = await request(app)
      .get(`/api/orgs/${org1.body.id}/projects/${proj1.body.id}`)
      .set("Authorization", `Bearer ${u2token}`);

    expect(cross1.status).toBe(401);
    expect(cross2.status).toBe(401);
  });
  it("should reject cross org project creation", async () => {
    const u1token = await createAuthToken({ email: "user1@mail.com" });
    const u2token = await createAuthToken({ email: "user2@mail.com" });

    const orgCreateRes1 = await request(app)
      .post("/api/orgs")
      .set("Authorization", `Bearer ${u1token}`)
      .send({ name: "Test Org1" });

    const projCreateRes1 = await request(app)
      .post(`/api/orgs/${orgCreateRes1.body.id}/projects`)
      .set("Authorization", `Bearer ${u1token}`)
      .send({ name: "Test Proj" });

    const projCreateRes2 = await request(app)
      .post(`/api/orgs/${orgCreateRes1.body.id}/projects`)
      .set("Authorization", `Bearer ${u2token}`)
      .send({ name: "Test Proj2" });

    expect(projCreateRes1.status).toBe(201);
    expect(projCreateRes2.status).toBe(401);
  });
});
