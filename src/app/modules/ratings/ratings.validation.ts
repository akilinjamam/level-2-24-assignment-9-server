import { z } from "zod";

const ratingValidationSchema = z.object({
  body: z.object({
    productId: z.string(),
    rating: z.number().max(5, "rating can not give more than 5"),
  }),
});

export const ratingValidation = {
  ratingValidationSchema,
};
