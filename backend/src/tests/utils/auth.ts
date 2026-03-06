import request from "supertest";
import app from "../../app.js";

export async function createAuthToken() {
  await request(app).post("/api/user").send({
    email: "test@mail.com",
    name: "Test",
    password: "Password321"
  });

  const login = await request(app).post("/api/user/login").send({
    email: "test@mail.com",
    password: "Password321"
  });

  return login.body.token;
}
