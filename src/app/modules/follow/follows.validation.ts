import { z } from "zod";

export const createFollowValidationSchema = z.object({
  vendorId: z.string().min(1, "vendor id is required."),
  userId: z.string().min(1, "user id is required"),
});

// Example usage
export const followSchema = {
  createFollowValidationSchema,
};
