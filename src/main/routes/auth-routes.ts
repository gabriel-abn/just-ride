import { Elysia } from "elysia";
import restRouteAdapter from "../adapters/rest-route-adapter";
import signUpFactory from "../factories/auth/sign-up-factory";

const authRoutes = new Elysia()
  .post("/sign-up", restRouteAdapter(signUpFactory.make().controller))
  .post("/verify-email", () => {})
  .post("/login", () => {});

export default authRoutes;
