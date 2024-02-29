import app, { type App } from "@/main/app";
import env from "@/main/env";
import { edenTreaty } from "@elysiajs/eden";
import { afterAll, beforeAll } from "bun:test";

beforeAll(() => {
  app.listen(env.PORT, () => {
    console.log("Started testing server...");
  });
});

afterAll(async () => {
  await app.stop();
});

export default edenTreaty<App>(`http://localhost:${env.PORT}`);
