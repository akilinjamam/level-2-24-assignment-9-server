// const prisma = new PrismaClient();

import { PrismaClient } from "@prisma/client";
import { TProduct } from "./products.constant";
import { prisma } from "../../../shared/prisma";

const pirsma = new PrismaClient();

const createProductService = async (data: TProduct) => {
  const result = await prisma.products.create({
    data: data,
  });

  return result;
};

const getProductService = async () => {
  const result = await prisma.products.findMany({
    include: {
      vendor: {
        select: { followedCount: true },
      },
    },
    orderBy: {
      vendor: {
        followedCount: "desc",
      },
    },
  });

  return result;
};

export const productService = {
  createProductService,
  getProductService,
};
