import { z } from "zod";

const createBorrowSchema = z.object({
  body: z.object({
    bookId: z.string(),
    memberId: z.string(),
  }),
});

export const borrowSchema = {
  createBorrowSchema,
};
