import authRoutes from "@/main/routes/auth-routes";
import { Elysia } from "elysia";

const app = new Elysia()
  .get("/", () => {
    return "Hello World!";
  })
  .group("/auth", (app) => app.use(authRoutes));

export default app;

export type App = typeof app;
