"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.resetPasswordValidationSchema = exports.createResetPasswordValidationSchema = exports.createChangePasswordValidationSchema = exports.createUserLoginValidationSchema = exports.createUserValidationSchema = void 0;
const zod_1 = require("zod");
exports.createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userName: zod_1.z
            .string()
            .min(1, "User name is required.")
            .max(100, "User name should not exceed 100 characters."),
        address: zod_1.z
            .string()
            .min(1, "Address is required.")
            .max(150, "Address should not exceed 100 characters."),
        email: zod_1.z
            .string()
            .email("Invalid email address.")
            .max(100, "Email should not exceed 100 characters."),
        phoneNumber: zod_1.z.string().max(11, "number not exceed 11 characters."),
        userType: zod_1.z.enum(["USER", "VENDOR", "ADMIN"]),
    }),
});
exports.createUserLoginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string(),
        password: zod_1.z.string(),
    }),
});
exports.createChangePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string(),
        newPassword: zod_1.z.string(),
    }),
});
exports.createResetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string(),
    }),
});
exports.resetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string(),
        password: zod_1.z.string(),
    }),
});
// Example usage
exports.userSchema = {
    createUserValidationSchema: exports.createUserValidationSchema,
    createUserLoginValidationSchema: exports.createUserLoginValidationSchema,
    createChangePasswordValidationSchema: exports.createChangePasswordValidationSchema,
    createResetPasswordValidationSchema: exports.createResetPasswordValidationSchema,
    resetPasswordValidationSchema: exports.resetPasswordValidationSchema,
};
