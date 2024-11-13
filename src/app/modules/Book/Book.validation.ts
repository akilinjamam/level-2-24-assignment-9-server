import { z } from "zod";

const createBookSchema = z.object({
  body: z.object({
    title: z.string(),
    genre: z.string(),
    publishedYear: z.number(),
    totalCopies: z.number(),
    availableCopies: z.number(),
  }),
});
const updateBookSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    genre: z.string().optional(),
    publishedYear: z.number().optional(),
    totalCopies: z.number().optional(),
    availableCopies: z.number().optional(),
  }),
});

export const bookSchema = {
  createBookSchema,
  updateBookSchema,
};
