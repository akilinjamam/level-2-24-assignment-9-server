import { PrismaClient } from "@prisma/client";
import { TVendor } from "./vendor.constant";

const pirsma = new PrismaClient();

const createVendor = async (data: TVendor) => {
  const result = await pirsma.vendor.create({
    data: data,
  });

  return result;
};
const getAllVendor = async () => {
  const result = await pirsma.vendor.findMany({ include: { product: true } });

  return result;
};

export const vendorService = {
  createVendor,
  getAllVendor,
};
