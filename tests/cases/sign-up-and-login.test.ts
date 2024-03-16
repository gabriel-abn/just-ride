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

  it("should receive email and password", async () => {
    const response = await axios({
      method: "post",
      url: `http://localhost:${env.PORT}/auth/sign-up`,
      data: { ...user },
      validateStatus: () => true,
    });

    expect(response.status).toBe(200);
  });
});
