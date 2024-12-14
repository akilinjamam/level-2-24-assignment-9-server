import { z } from "zod";

const createPurchasedProductSchema = z.object({
  body: z.object({
    productName: z.string().min(1, "Product name is required"),
    category: z.string().min(1, "Category is required"),
    price: z.number().nonnegative("Price must be non-negative"),
    totalPrice: z.number().nonnegative("Price must be non-negative"),
    quantity: z.number().int().min(1, "quantity must have to be minimum 1"),
    discount: z.number().int(),
    details: z.string().min(1, "Product details are required"),
    userId: z.string(),
    productId: z.string(),
  }),
});

const createAddToCartProductSchema = z.object({
  body: z.object({
    productName: z.string().min(1, "Product name is required"),
    category: z.string().min(1, "Category is required"),
    price: z.number().nonnegative("Price must be non-negative"),
    totalPrice: z.number().nonnegative("Price must be non-negative"),
    quantity: z.number().int().min(1, "quantity must have to be minimum 1"),
    discount: z.number().int(),
    details: z.string().min(1, "Product details are required"),
    userId: z.string(),
    productId: z.string(),
  }),
});

export const purchasedProductSchema = {
  createPurchasedProductSchema,
  createAddToCartProductSchema,
};
