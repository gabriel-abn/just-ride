import env from "@/main/env";
import { faker } from "@faker-js/faker";
import axios from "axios";
import { beforeAll, describe, expect, it } from "bun:test";

describe("Create an account/Sign up", () => {
  let user: any;

  beforeAll(async () => {
    user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: "Gabriel!2343",
    };
  });

  it("should create with email and password", async () => {
    const response = await axios({
      method: "post",
      url: `http://localhost:${env.PORT}/auth/sign-up`,
      data: { ...user },
      validateStatus: () => true,
    });

    expect(response.data.response).toEqual({ created: true });
  });

  it("should return status 400 if email is already in use", async () => {
    await axios({
      method: "post",
      url: `http://localhost:${env.PORT}/auth/sign-up`,
      data: { ...user },
      validateStatus: () => true,
    });

    const response = await axios({
      method: "post",
      url: `http://localhost:${env.PORT}/auth/sign-up`,
      data: { ...user },
      validateStatus: () => true,
    });

    expect(response.data.response).toHaveProperty(
      "error",
      "EMAIL_ALREADY_IN_USE"
    );
    expect(response.status).toEqual(400);
  });

  it("should return status 400 if password is invalid", async () => {
    const response = await axios({
      method: "post",
      url: `http://localhost:${env.PORT}/auth/sign-up`,
      data: { ...user, password: "gabriel123" },
      validateStatus: () => true,
    });

    expect(response.data.response).toHaveProperty(
      "error",
      "INVALID_MISSING_PARAMS"
    );
    expect(response.status).toEqual(400);
  });
});

describe("Login", () => {
  let user: any;

  beforeAll(async () => {
    user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: "Gabriel!2343",
    };

    await axios({
      method: "post",
      url: `http://localhost:${env.PORT}/auth/sign-up`,
      data: { ...user, password: "gabriel123" },
      validateStatus: () => true,
    });
  });

  it("should receive 400 if email not found", async () => {
    const response = await axios({
      method: "post",
      url: `http://localhost:${env.PORT}/auth/login`,
      data: { email: faker.internet.email(), password: user.password },
    });

    expect(response.data.response).toHaveProperty("error", "EMAIL_NOT_FOUND");
    expect(response.status).toEqual(400);
  });

  it("should receive 400 if password is invalid", async () => {
    const response = await axios({
      method: "post",
      url: `http://localhost:${env.PORT}/auth/login`,
      data: { email: user.email, password: "gabriel123" },
      validateStatus: () => true,
    });

    expect(response.data.response).toHaveProperty("error", "INVALID_PASSWORD");
    expect(response.status).toEqual(400);
  });

  it("should login with email and password", async () => {
    const response = await axios({
      method: "post",
      url: `http://localhost:${env.PORT}/auth/login`,
      data: { email: user.email, password: user.password },
      validateStatus: () => true,
    });

    expect(response.data.response).toHaveProperty("token");
  });
});
