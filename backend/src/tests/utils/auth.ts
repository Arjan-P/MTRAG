import request from "supertest";
import app from "../../app.js";

export async function createUser({
  email = `user${Date.now()}@mail.com`,
  password = "Password321",
  name = "Test"
} = {}) {

  const createRes = await request(app)
    .post("/api/user")
    .send({ email, name, password });

  if (createRes.status !== 201 && createRes.status !== 409) {
    throw new Error(`User creation failed: ${createRes.status}`);
  }
  return { email, password };
}

export async function createAuthToken(user = {}) {
  const { email, password } = await createUser(user);

  const login = await request(app)
    .post("/api/user/login")
    .send({ email, password });

  return login.body.token;
}
