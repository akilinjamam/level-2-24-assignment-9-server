import { PrismaClient } from "@prisma/client";

type TRating = {
  productId: string;
  purchasedProductId: string;
  userId: string;
  rating: number;
};

const prism = new PrismaClient();
const createRating = async (data: TRating) => {
  const findPurchseProduct = await prism.rating.findFirst({
    where: {
      purchasedProductId: data.purchasedProductId,
    },
  });
  let result;
  if (!findPurchseProduct) {
    result = await prism.rating.create({
      data: data,
    });
  }
  if (findPurchseProduct) {
    const find = findPurchseProduct.ratingId;

    result = await prism.rating.update({
      where: {
        ratingId: find,
      },
      data: {
        rating: data.rating,
      },
    });
  }

  return result;
};

export const ratingService = {
  createRating,
};
