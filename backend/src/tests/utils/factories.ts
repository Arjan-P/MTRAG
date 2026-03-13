import request from "supertest";
import app from "../../app.js";
import type { Role } from "@prisma/client";

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

export async function inviteUser(token: string, org_id: string, email: string, role: Role) {
  const res = await request(app)
  .post(`/api/orgs/${org_id}/invite`)
  .set("Authorization", `Bearer ${token}`)
  .send({email, role})

  return res.body;
}
