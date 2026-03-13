import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";
import { createAuthToken } from "./utils/auth.js";
import { createOrg, createProject } from "./utils/factories.js";
import { withAuth } from "./utils/request.js";

describe("Project routes", () => {
  it("should create an orgranization project", async () => {
    const token = await createAuthToken();
    const org = await createOrg(token);
    const project = await createProject(token, org.id);

    expect(project.name).toBe("Test Project");
  });
  it("should get an organization project", async () => {

    const token = await createAuthToken();
    const org = await createOrg(token);
    const project = await createProject(token, org.id);
    const auth = withAuth(token);

    const projGetRes = await auth
      .get(`/api/orgs/${org.id}/projects/${project.id}`)

    expect(projGetRes.body.name).toBe("Test Project");
  });

  it("should reject cross org project access", async () => {
    const u1token = await createAuthToken({ email: "user1@mail.com" });
    const u2token = await createAuthToken({ email: "user2@mail.com" });

    const org1 = await createOrg(u1token);
    const org2 = await createOrg(u2token);

    const proj1 = await createProject(u1token, org1.id);
    const proj2 = await createProject(u2token, org2.id);

    const auth1 = withAuth(u1token);
    const auth2 = withAuth(u2token);

    const cross1 = await auth1
      .get(`/api/orgs/${org2.id}/projects/${proj2.id}`)

    const cross2 = await auth2
      .get(`/api/orgs/${org1.id}/projects/${proj1.id}`)

    expect(cross1.status).toBe(401);
    expect(cross2.status).toBe(401);
  });
  it("should reject cross org project creation", async () => {
    const u1token = await createAuthToken({ email: "user1@mail.com" });
    const u2token = await createAuthToken({ email: "user2@mail.com" });

    const org1 = await createOrg(u1token);
    const org2 = await createOrg(u2token);

    const proj1 = await createProject(u1token, org1.id);
    const proj2 = await createProject(u2token, org1.id);

    expect(proj1.name).toBe("Test Project");
    expect(proj2.error).toBeDefined();
  });
});
