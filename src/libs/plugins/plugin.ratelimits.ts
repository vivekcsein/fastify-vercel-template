import { FastifyPluginAsync } from "fastify";
import rateLimit from "@fastify/rate-limit";
import { envBackendConfig } from "../env/env.backend";

const rateLimitPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.register(rateLimit, {
    max: envBackendConfig.APP_RATE_LIMIT_MAX,
    timeWindow: envBackendConfig.APP_RATE_LIMIT_TIME_WINDOW,
  });
};

export default rateLimitPlugin;
