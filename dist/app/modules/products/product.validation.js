"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const zod_1 = require("zod");
const createProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        productName: zod_1.z.string().min(1, "Product name is required"),
        category: zod_1.z.string().min(1, "Category is required"),
        price: zod_1.z.number().nonnegative("Price must be non-negative"),
        quantity: zod_1.z.number().int().min(1, "quantity must have to be minimum 1"),
        discount: zod_1.z.number().int(),
        details: zod_1.z.string().min(1, "Product details are required"),
        clicked: zod_1.z.number().nonnegative("Clicked count must be non-negative"),
        vendorId: zod_1.z.string(),
        flashSale: zod_1.z.boolean(),
    }),
});
exports.productSchema = {
    createProductSchema,
};
