import { PrismaClient } from "@prisma/client";
import { TProduct } from "./products.constant";
import { prisma } from "../../../shared/prisma";

const pirsma = new PrismaClient();

const createProductService = async (data: TProduct, images: string[]) => {
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
    where: addFilterCondition,
    include: {
      vendor: true,
      Review: true,
      Rating: true,
    },
  });

  return result;
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

export const productService = {
  createProductService,
  getProductService,
  getProductWithCategory,
  getProductWithFlashSale,
  getProductWithId,
  updateProduct,
};
