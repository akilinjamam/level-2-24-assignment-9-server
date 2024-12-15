"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorSchema = void 0;
const zod_1 = require("zod");
const createvendorValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        vendorName: zod_1.z
            .string()
            .min(1, "Vendor name is required.")
            .max(100, "Vendor name should not exceed 100 characters."),
        shopName: zod_1.z
            .string()
            .min(1, "Shop name is required.")
            .max(100, "Shop name should not exceed 100 characters."),
        details: zod_1.z
            .string()
            .min(1, "Details are required.")
            .max(500, "Details should not exceed 500 characters."),
        logo: zod_1.z.string(),
    }),
});
exports.vendorSchema = {
    createvendorValidationSchema,
};
