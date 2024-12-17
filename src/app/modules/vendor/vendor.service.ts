import { PrismaClient } from "@prisma/client";
import { TVendor } from "./vendor.constant";
import { prisma } from "../../../shared/prisma";

const pirsma = new PrismaClient();

const createVendor = async (data: TVendor, image: string, userId: string) => {
  const newData = {
    ...data,
    logo: image,
    userId: userId,
  };
  const result = await pirsma.vendor.create({
    data: newData,
  });

  return result;
};
const getAllVendor = async () => {
  const result = await pirsma.vendor.findMany({
    include: {
      product: true,
      follows: {
        include: {
          vendor: true,
          user: true,
        },
      },
    },
  });

  return result;
};
const getAllVendorWithId = async (id: string) => {
  const result = await pirsma.vendor.findFirst({
    where: {
      vendorId: id,
    },
    include: {
      product: true,
      follows: {
        include: {
          vendor: true,
          user: true,
        },
      },
    },
  });

  return result;
};

const getAllVendorWithUserId = async (id: string) => {
  const result = await pirsma.vendor.findFirst({
    where: {
      userId: id,
    },
    include: {
      product: true,
      follows: {
        include: {
          vendor: true,
          user: true,
        },
      },
    },
  });

  return result;
};

const updateVendor = async (id: string, data: Record<string, unknown>) => {
  const result = await prisma.vendor.update({
    where: {
      vendorId: id,
    },
    data: data,
  });

  return result;
};
const updateVendorImg = async (id: string, data: Record<string, unknown>) => {
  const result = await prisma.vendor.update({
    where: {
      vendorId: id,
    },
    data: data,
  });

  return result;
};

export const vendorService = {
  createVendor,
  getAllVendor,
  getAllVendorWithId,
  getAllVendorWithUserId,
  updateVendor,
  updateVendorImg,
};
