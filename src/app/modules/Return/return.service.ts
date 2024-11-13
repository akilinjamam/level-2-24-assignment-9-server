import { PrismaClient } from "@prisma/client";
import { TReturn } from "./return.constant";

const prisma = new PrismaClient();

const createReturn = async (data: TReturn) => {
  const { borrowId } = data;

  const findBorrowId = await prisma.borrowRecord.findUniqueOrThrow({
    where: {
      borrowId,
    },
  });

  if (findBorrowId) {
    return "Book returned successfully";
  } else {
    return "Sorry id not fount";
  }
};

export const returnService = {
  createReturn,
};
