"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberSchema = void 0;
const zod_1 = require("zod");
const createMemberSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string(),
        phone: zod_1.z.string(),
        membershipDate: zod_1.z.string(),
    }),
});
const updateMemberSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        membershipDate: zod_1.z.string().optional(),
    }),
});
exports.memberSchema = {
    createMemberSchema,
    updateMemberSchema,
};
