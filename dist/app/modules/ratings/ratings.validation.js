"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingValidation = void 0;
const zod_1 = require("zod");
const ratingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z.string(),
        purchasedProductId: zod_1.z.string(),
        userId: zod_1.z.string(),
        rating: zod_1.z.number().max(5, "rating can not give more than 5"),
    }),
});
exports.ratingValidation = {
    ratingValidationSchema,
};
