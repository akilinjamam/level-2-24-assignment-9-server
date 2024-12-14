import { PrismaClient } from "@prisma/client";

type TReviews = {
  review: string;
  productId: string;
};

const prisma = new PrismaClient();
const createReviews = async (data: TReviews) => {
  const result = await prisma.review.create({ data: data });
  return result;
};

export const reviewService = {
  createReviews,
};
