"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followSchema = exports.createFollowValidationSchema = void 0;
const zod_1 = require("zod");
exports.createFollowValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        vendorId: zod_1.z.string().min(1, "vendor id is required."),
        userId: zod_1.z.string().min(1, "user id is required"),
    }),
});
// Example usage
exports.followSchema = {
    createFollowValidationSchema: exports.createFollowValidationSchema,
};
