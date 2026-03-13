import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";
import { createAuthToken } from "./utils/auth.js";
import {createOrg, inviteUser} from "./utils/factories.js";
import {withAuth} from "./utils/request.js"

// Follow:
// Arrange
// Act
// Assert


describe("Organization routes", () => {
  it("should create an organization", async () => {

    const token = await createAuthToken();
    const org = await createOrg(token);
    expect(org.name).toBe("Test Org");
  });

  it("should get all orgs user is a part of", async () => {
    const token = await createAuthToken();

    const auth = withAuth(token);
    const orgGetRequest = await auth
      .get("/api/orgs")

    expect(orgGetRequest.status).toBe(200);
  });

  it("should invite an existing user", async () => {
    const owner_token = await createAuthToken();
    await createAuthToken({email: "user@mail.com"});
    const org = await createOrg(owner_token);
    const member = await inviteUser(owner_token, org.id, "user@mail.com", "MEMBER");

    expect(member.role).toBe("MEMBER");
  });
})
