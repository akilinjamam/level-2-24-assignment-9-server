import { PrismaClient } from "@prisma/client";

type TReviews = {
  review: string;
  productId: string;
  purchasedProductId: string;
};

const prisma = new PrismaClient();
const createReviews = async (data: TReviews) => {
  const result = await prisma.review.create({ data: data });
  return result;
};

const getReviews = async (data: TReviews) => {
  const result = await prisma.review.findMany({
    include: {
      Replay: true,
    },
  });
  return result;
};

export const reviewService = {
  createReviews,
  getReviews,
};
