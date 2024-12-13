import { z } from "zod";

export const createUserValidationSchema = z.object({
  body: z.object({
    userName: z
      .string()
      .min(1, "User name is required.")
      .max(100, "User name should not exceed 100 characters."),
    address: z
      .string()
      .min(1, "Address is required.")
      .max(150, "Address should not exceed 100 characters."),
    email: z
      .string()
      .email("Invalid email address.")
      .max(100, "Email should not exceed 100 characters."),
    phoneNumber: z.string().max(11, "number not exceed 11 characters."),

    userType: z.enum(["USER", "VENDOR"]),
  }),
});

export const createUserLoginValidationSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

// Example usage
export const userSchema = {
  createUserValidationSchema,
  createUserLoginValidationSchema,
};
