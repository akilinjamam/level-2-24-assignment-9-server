import { z } from "zod";

const replayValidationSchema = z.object({
  body: z.object({
    replay: z.string(),
    reviewId: z.string(),
  }),
});

export const replayValidation = {
  replayValidationSchema,
};
