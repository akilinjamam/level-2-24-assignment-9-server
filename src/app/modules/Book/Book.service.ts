import { PrismaClient } from "@prisma/client";
import { TBooks } from "./Book.constant";

const pirsma = new PrismaClient();

const createBook = async (data: TBooks) => {
  const result = await pirsma.book.create({
    data: data,
  });

  return result;
};
const getBook = async () => {
  const result = await pirsma.book.findMany({});
  return result;
};
const getBookByBookId = async (id: string) => {
  const result = await pirsma.book.findUniqueOrThrow({
    where: {
      bookId: id,
    },
  });
  return result;
};

const updateBookByBookId = async (
  id: string,
  data: Record<string, unknown>
) => {
  const result = await pirsma.book.update({
    where: {
      bookId: id,
    },
    data: data,
  });
  return result;
};

const deleteBookByBookId = async (id: string) => {
  const result = await pirsma.book.delete({
    where: {
      bookId: id,
    },
  });
  return result;
};

export const bookService = {
  createBook,
  getBook,
  getBookByBookId,
  updateBookByBookId,
  deleteBookByBookId,
};
