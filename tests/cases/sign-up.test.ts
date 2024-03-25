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

  describe("Creating account", () => {
    it("should create with email and password", async () => {
      const response = await axios({
        method: "post",
        url: `http://localhost:${env.PORT}/auth/sign-up`,
        data: { ...user },
        validateStatus: () => true,
      });

      expect(response.data.response).toEqual({ created: true });
    });

    it("should save confirmation code", async () => {});

    it("should send confirmation code to email", async () => {});
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
