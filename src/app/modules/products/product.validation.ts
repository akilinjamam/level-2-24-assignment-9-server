import { z } from "zod";

const createProductSchema = z.object({
  body: z.object({
    productName: z.string().min(1, "Product name is required"),
    category: z.string().min(1, "Category is required"),
    price: z.number().nonnegative("Price must be non-negative"),
    ratings: z.number().int().min(0).max(5, "Ratings must be between 0 and 5"),
    details: z.string().min(1, "Product details are required"),
    clicked: z.number().nonnegative("Clicked count must be non-negative"),
    images: z.array(z.string().url("Each image must be a valid URL")),
    vendorId: z.string(),
  }),
});

export const productSchema = {
  createProductSchema,
};
