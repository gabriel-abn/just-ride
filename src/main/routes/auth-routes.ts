import { Elysia } from "elysia";
import restRouteAdapter from "../adapters/rest-route-adapter";
import loginFactory from "../factories/auth/login-factory";
import signUpFactory from "../factories/auth/sign-up-factory";

const authRoutes = new Elysia()
  .post("/sign-up", restRouteAdapter(signUpFactory.make().controller))
  .post("/login", restRouteAdapter(loginFactory.make().controller))
  .post("/verify-email", () => {});

export default authRoutes;
