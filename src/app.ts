import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import type { FastifyInstance } from "fastify";
import { envAppConfig } from "./libs/env/env.app";
import { configViews, Home } from "./libs/configs/config.view";

//import plugins
import corsPlugin from "./libs/plugins/plugin.cors";
import cookiePlugin from "./libs/plugins/plugin.cookie";
import rateLimitPlugin from "./libs/plugins/plugin.ratelimits";

// import routes
import supabaseTestRoute from "./api/test/test.routes";

const createApp = async () => {
  const app: FastifyInstance = Fastify({
    logger: {
      level: process.env.NODE_ENV === "production" ? "warn" : "info",
    },
  });

  //register all plugins
  //serve static files
  await app.register(rateLimitPlugin);
  await app.register(cookiePlugin);
  await app.register(corsPlugin);
  await app.register(fastifyStatic, configViews);

  app.get("/", async (_req, reply) => {
    return reply.status(200).type("text/html").sendFile(Home);
  });

  // register api routes
  app.register(supabaseTestRoute, { prefix: `${envAppConfig.API_PATH}/test` });

  app.get("/api/health", (_req, reply) => {
    return reply.status(200).send({
      success: true,
      message: "Server is healthy",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    });
  });

  // 404 handler
  app.setNotFoundHandler((_request, reply) => {
    return reply.status(404).send({
      success: false,
      message: "Route not found",
    });
  });

  return app;
};

export default createApp;
