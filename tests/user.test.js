// tests/user.test.js
import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import User from "../models/user.js";

describe("User Authentication API", () => {
  beforeAll(async () => {
    await User.deleteOne({ email: "ram@gmail.com" });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("fails if required fields are missing", async () => {
    const res = await request(app).post("/api/auth/register").send({
      firstname: "Ram",
      email: "ram@gmail.com",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Missing fields");
  });
});
