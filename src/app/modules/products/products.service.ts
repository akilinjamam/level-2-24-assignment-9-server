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
  });

  return result;
};

export const productService = {
  createProductService,
  getProductService,
};
