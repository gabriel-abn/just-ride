import env from "@/main/env";
import { faker } from "@faker-js/faker";
import axios from "axios";
import { beforeAll, describe, it } from "bun:test";

describe("Verify Email", () => {
  const user = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: "Gabriel!2343",
  };

  beforeAll(async () => {
    axios({
      method: "post",
      url: `http://localhost:${env.PORT}/auth/sign-up`,
      data: {
        email: user.email,
        password: user.password,
      },
    });
  });

  it("should verify account if given the right code", async () => {
    // const code = await redis.get(`confirmation:${user.email}`);
    // const response = await axios({
    //   method: "post",
    //   url: `http://localhost:${env.PORT}/auth/verify-email`,
    //   data: { email: user.email, code },
    // });
    // expect(response.data.response).toEqual({ verified: true });
  });
});
