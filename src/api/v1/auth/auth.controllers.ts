import { FastifyReply, FastifyRequest } from "fastify";

export const signinAuthController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    return reply.status(200).send({
      success: true,
      message: "Login successful",
      data: {
        id: 1,
        token: "token",
      },
    });
  } catch (error) {}
};

export const signupAuthController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    return reply.status(200).send({
      success: true,
      message: "Register successful",
      data: {
        id: 1,
        token: "token",
      },
    });
  } catch (error) {}
};

export const signoutAuthController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    return reply.status(200).send({
      success: true,
      message: "Logout successful",
      data: {
        id: 1,
        token: "token",
      },
    });
  } catch (error) {}
};
