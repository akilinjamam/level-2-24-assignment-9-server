import { PrismaClient } from "@prisma/client";

type TReply = {
  reviewId: string;
  replay: string;
};

const prisma = new PrismaClient();

const createReplay = async (data: TReply) => {
  const result = await prisma.replay.create({
    data: data,
  });

  return result;
};

export const replayService = {
  createReplay,
};
