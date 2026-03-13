import request from "supertest";
import app from "../../app.js";

export async function createAuthToken({
  email = "test@mail.com",
  password = "Password321",
  name = "Test"
}: {
  email?: string;
  password?: string;
  name?: string;
} = {}) {

  const createRes = await request(app)
    .post("/api/user")
    .send({ email, name, password });

  if (createRes.status !== 201 && createRes.status !== 409) {
    throw new Error(`User creation failed: ${createRes.status}`);
  }

  const loginRes = await request(app)
    .post("/api/user/login")
    .send({ email, password });

  return loginRes.body.token;
}
