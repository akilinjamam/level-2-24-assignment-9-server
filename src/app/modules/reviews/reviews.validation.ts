import { z } from "zod";

const reviewValidationSchema = z.object({
  body: z.object({
    review: z.string(),
    productId: z.string(),
    purchasedProductId: z.string(),
  }),
});

export const reviewValidation = {
  reviewValidationSchema,
};
