import type { RouteOptions } from "fastify";
import createAuthErrorHandler from "./auth.error";
import { validateBody } from "../../../libs/utils/utils.validate";

// import everything
import * as replyHandler from "./auth.reply";
import * as schemaHandler from "./auth.schemas";
import * as controller from "./auth.controllers";

const signupRoute: RouteOptions = {
  method: "POST",
  url: "/register",
  preHandler: validateBody(schemaHandler.signupAuthSchema),
  handler: controller.signupAuthController,
  schema: replyHandler.signinReply,
  errorHandler: createAuthErrorHandler("signup"),
};
const signinRoute: RouteOptions = {
  method: "POST",
  url: "/login",
  preHandler: validateBody(schemaHandler.signinAuthSchema),
  handler: controller.signinAuthController,
  schema: replyHandler.signinReply,
  errorHandler: createAuthErrorHandler("signin"),
};

const signoutRoute: RouteOptions = {
  method: "POST",
  url: "/logout",
  handler: controller.signoutAuthController,
  errorHandler: createAuthErrorHandler("signout"),
};

export default [signupRoute, signinRoute, signoutRoute];

export type routesOptions =
  | "signup"
  | "signin"
  | "signout"
  | "profile"
  | "refreshToken"
  | "verifyEmail"
  | "resetPassword"
  | "forgotPassword";
