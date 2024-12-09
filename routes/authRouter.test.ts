import request from "supertest";
import users from "../assets/users";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import app from "../app";

it("should return a 400 if user credentials are not in the response body", async () => {
  await request(app).post("/api/signin").send().expect(400);
});

it("should return a 401 status if user credentials are not correct", async () => {
  await request(app)
    .post("/api/signin")
    .send({
      username: "invalid",
      password: "invalid",
    })
    .expect(401);
});

it("should return a JWT token in the response if the user credentials are correct", async () => {
  const { id, username, password } = users[0];
  const { body } = await request(app)
    .post("/api/signin")
    .send({
      username,
      password,
    })
    .expect(200);
  const { sub: userId } = jwt.verify(body.token, JWT_SECRET);
  expect(userId).toBe(id);
});
