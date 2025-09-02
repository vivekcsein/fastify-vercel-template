import { routesOptions } from "./auth.routes";
import type { FastifyRequest, FastifyReply } from "fastify";

/**
 * Creates a reusable auth error handler for Fastify routes.
 * @param context - Optional context label for debugging or logging.
 */
const createAuthErrorHandler =
  (context?: routesOptions) =>
  (err: Error, _req: FastifyRequest, reply: FastifyReply) => {
    if (err) {
      reply
        .status(401)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({
          message: err.message,
          ...(context && { context }), // Optional context for debugging
        });
    }
  };

export default createAuthErrorHandler;
