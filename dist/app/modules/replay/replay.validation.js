"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replayValidation = void 0;
const zod_1 = require("zod");
const replayValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        replay: zod_1.z.string(),
        reviewId: zod_1.z.string(),
    }),
});
exports.replayValidation = {
    replayValidationSchema,
};
