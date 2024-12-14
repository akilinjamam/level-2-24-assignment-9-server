import { PrismaClient } from "@prisma/client";

type TRating = {
  productId: string;
  rating: number;
};

const prism = new PrismaClient();
const createRating = async (data: TRating) => {
  const result = await prism.rating.create({
    data: data,
  });

  return result;
};

export const ratingService = {
  createRating,
};
