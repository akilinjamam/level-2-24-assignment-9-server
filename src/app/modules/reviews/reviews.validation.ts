import { z } from "zod";

const reviewValidationSchema = z.object({
  body: z.object({
    review: z.string(),
    productId: z.string(),
  }),
});

export const reviewValidation = {
  reviewValidationSchema,
};
