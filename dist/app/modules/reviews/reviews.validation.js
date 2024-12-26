"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidation = void 0;
const zod_1 = require("zod");
const reviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        review: zod_1.z.string(),
        productId: zod_1.z.string(),
        purchasedProductId: zod_1.z.string(),
        userId: zod_1.z.string(),
    }),
});
exports.reviewValidation = {
    reviewValidationSchema,
};
