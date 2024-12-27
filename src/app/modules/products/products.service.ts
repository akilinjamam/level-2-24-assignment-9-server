import { Prisma, PrismaClient } from "@prisma/client";
import { TProduct } from "./products.constant";
import { prisma } from "../../../shared/prisma";

const pirsma = new PrismaClient();

const createProductService = async (data: TProduct, images: string[]) => {
  const findVendor = await prisma.vendor.findFirst({
    where: {
      vendorId: data.vendorId,
    },
  });

  const getUserId = findVendor?.userId;

  const getUser = await prisma.user.findFirst({
    where: {
      userId: getUserId,
    },
  });

  if (getUser?.blacklist) {
    throw new Error("sorry you are black listed. can not run operation");
  }

  const newData = {
    ...data,
    images,
  };

  console.log(newData);

  const result = await prisma.products.create({
    data: newData,
  });
  return result;
};

const createMany = async (data: any) => {
  const result = await prisma.products.createMany({
    data: data,
  });

  return result;
};

const getProductService = async (
  category: string,
  from: string,
  to: string
) => {
  let addFilterCondition = {};

  if (category && !from && !to) {
    addFilterCondition = {
      category: category,
    };
  }

  if (from && to && !category) {
    addFilterCondition = {
      price: {
        gte: Number(from),
        lte: Number(to),
      },
    };
  }

  const result = await prisma.products.findMany({
    orderBy: {
      vendor: {
        followedCount: "desc",
      },
    },
    where: { ...addFilterCondition, suspend: false },
    include: {
      vendor: true,
      Review: {
        include: {
          Replay: true,
        },
      },
      Rating: true,
    },
  });

  const totalData = await prisma.products.count();

  return {
    totalData,
    result,
  };
};

const getProductWithCategory = async () => {
  const result = await prisma.products.groupBy({
    by: ["category"],
  });

  return result;
};
const getProductWithFlashSale = async () => {
  const result = await prisma.products.findMany({
    where: {
      flashSale: true,
    },
  });
  return result;
};
const getProductWithId = async (id: string) => {
  const result = await prisma.products.findFirst({
    where: {
      productId: id,
    },
    include: {
      Rating: true,
      vendor: true,
      Review: {
        include: {
          Replay: true,
        },
      },
    },
  });
  return result;
};
const getProductWithVendorId = async (id: string) => {
  const result = await prisma.products.findFirst({
    where: {
      vendorId: id,
    },
    include: {
      Rating: true,
      vendor: true,
      Review: true,
    },
  });
  return result;
};

const updateProduct = async (id: string, data: any) => {
  const result = await prisma.products.update({
    where: {
      productId: id,
    },
    data: data,
  });

  return result;
};

const updateImageProduct = async (
  id: string,
  image: string,
  indexId: number
) => {
  const findImagesWithId = (await prisma.products.findUnique({
    where: { productId: id },
    select: { images: true },
  })) as any;

  const updatedImages = [...findImagesWithId?.images];
  updatedImages[indexId] = image;

  const result = await prisma.products.update({
    where: {
      productId: id,
    },
    data: {
      images: updatedImages,
    },
  });

  return result;
};

const deleteProduct = async (id: string) => {
  const findProduct = await prisma.products.findFirst({
    where: {
      productId: id,
    },
    include: {
      Review: true,
      Rating: true,
    },
  });

  const findPurchasedProductId = await prisma.purchasedProduct.findFirst({
    where: {
      productId: id,
    },
  });

  const ratingIds = findProduct?.Rating?.map((rating) => rating.ratingId);
  const reviewIds = findProduct?.Review?.map((rating) => rating.reviewId);
  const purchasedProductId = findPurchasedProductId?.purchasedProductId;

  try {
    const result = await pirsma.$transaction(async (prix) => {
      await prix.rating.deleteMany({
        where: {
          ratingId: { in: ratingIds },
        },
      });

      await prix.replay.deleteMany({
        where: {
          reviewId: { in: reviewIds },
        },
      });

      await prix.review.deleteMany({
        where: {
          reviewId: { in: reviewIds },
        },
      });

      if (purchasedProductId) {
        await prix.purchasedProduct.delete({
          where: {
            purchasedProductId: purchasedProductId,
          },
        });
      }

      const result = await prix.products.delete({
        where: { productId: id },
      });

      return result;
    });

    return result;
  } catch (error) {
    console.error("Transaction failed, rolled back:", error);
  } finally {
    await prisma.$disconnect();
  }
};

export const productService = {
  createProductService,
  getProductService,
  getProductWithCategory,
  getProductWithFlashSale,
  getProductWithId,
  updateProduct,
  updateImageProduct,
  deleteProduct,
  getProductWithVendorId,
  createMany,
};
