import fp from "fastify-plugin";
import type { FastifyPluginAsync } from "fastify";
import { connectRedisDatabase } from "./db.redis";
import sequelize, { connectSequelizeDatabase } from "./db.sequelize";

// Models

const dbPlugin: FastifyPluginAsync = fp(
  async (fastify) => {
    // Connect to database
    await connectSequelizeDatabase();
    // Connect to redis
    await connectRedisDatabase();
    // Decorate Fastify instance
    fastify.decorate("sequelize", sequelize);
    // Make model accessible
    // fastify.decorate("iLocalUsers", iLocalUsersModel);
  },
  {
    name: "db",
  }
);

export default dbPlugin;
