import { z } from "zod";

const createReturnSchema = z.object({
  body: z.object({
    borrowId: z.string(),
  }),
});

export const returnSchema = {
  createReturnSchema,
};
