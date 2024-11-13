import { PrismaClient } from "@prisma/client";
import { TBorrow } from "./Borrow.constant";

const prisma = new PrismaClient();

const createBorrow = async (data: TBorrow) => {
  const date = new Date();

  const dueDate = new Date(date);

  dueDate.setDate(dueDate.getDate() + 14);

  const newData = {
    ...data,
    borrowDate: date,
    returnDate: dueDate,
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

const getOverDueBooks = async () => {
  const today = new Date();

  const overDueBorrowedBooks = await prisma.borrowRecord.findMany({
    where: {
      returnDate: {
        lte: today,
      },
    },
  });

  return overDueBorrowedBooks;
};

export const borrowService = {
  createBorrow,
  getOverDueBooks,
};
