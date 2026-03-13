import request from "supertest";
import app from "../../app.js";

export async function createOrg(token: string, name = "Test Org") {
  const res = await request(app)
    .post("/api/orgs")
    .set("Authorization", `Bearer ${token}`)
    .send({ name });

  return res.body;
}

export async function createProject(token: string, orgId: string, name = "Test Project") {
  const res = await request(app)
    .post(`/api/orgs/${orgId}/projects`)
    .set("Authorization", `Bearer ${token}`)
    .send({ name });

  return res.body;
}
