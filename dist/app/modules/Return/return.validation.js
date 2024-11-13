"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnSchema = void 0;
const zod_1 = require("zod");
const createReturnSchema = zod_1.z.object({
    body: zod_1.z.object({
        borrowId: zod_1.z.string(),
    }),
});
exports.returnSchema = {
    createReturnSchema,
};
