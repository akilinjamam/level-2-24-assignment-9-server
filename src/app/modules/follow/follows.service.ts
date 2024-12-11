import { PrismaClient } from "@prisma/client";
import { TFollows } from "./follows.constant";

const prisma = new PrismaClient();

const createFollow = async (data: TFollows) => {
  const result = await prisma.follow.create({
    data: data,
  });

  return result;
};

export const followService = {
  createFollow,
};
