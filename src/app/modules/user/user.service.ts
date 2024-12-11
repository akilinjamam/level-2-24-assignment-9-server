import { PrismaClient } from "@prisma/client";
import { TUser } from "./user.constant";

const prisma = new PrismaClient();

const createUser = async (data: TUser) => {
  const result = await prisma.user.create({
    data: data,
  });

  return result;
};

export const userService = {
  createUser,
};
