import { describe, it, expect } from "vitest";
import { createAuthToken } from "./utils/auth.js";
import { createOrg, createProject } from "./utils/factories.js";
import { withAuth } from "./utils/request.js";

describe("Document routes", () => {
  it("should create a document entry", async () => {
    const token = await createAuthToken();
    const org = await createOrg(token);
    const project = await createProject(token, org.id);
    const auth = withAuth(token);
    const document = await auth
    .post(`/api/orgs/${org.id}/projects/${project.id}/documents`)
    .send({
      name: "test-doc.txt",
      type: "text",
      size: 100
    });

    expect(document.status).toBe(201);
    expect(document.body.name).toBe("test-doc.txt");
  })
})
