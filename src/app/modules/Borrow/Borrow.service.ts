import { PrismaClient } from "@prisma/client";
import { TBorrow } from "./Borrow.constant";

const prisma = new PrismaClient();

const createBorrow = async (data: TBorrow) => {
  const date = new Date();

  const newData = {
    ...data,
    borrowDate: date,
  };

  const result = await prisma.borrowRecord.create({
    data: newData,
    select: {
      borrowId: true,
      bookId: true,
      memberId: true,
      borrowDate: true,
      returnDate: false,
    },
  });

  return result;
};

export const borrowService = {
  createBorrow,
};
