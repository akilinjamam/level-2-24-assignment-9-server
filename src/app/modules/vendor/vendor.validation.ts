import { z } from "zod";

const createvendorValidationSchema = z.object({
  body: z.object({
    vendorName: z
      .string()
      .min(1, "Vendor name is required.")
      .max(100, "Vendor name should not exceed 100 characters."),
    shopName: z
      .string()
      .min(1, "Shop name is required.")
      .max(100, "Shop name should not exceed 100 characters."),
    details: z
      .string()
      .min(1, "Details are required.")
      .max(500, "Details should not exceed 500 characters."),
    logo: z.string(),
  }),
});

export const vendorSchema = {
  createvendorValidationSchema,
};
