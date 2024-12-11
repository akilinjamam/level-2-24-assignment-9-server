import { z } from "zod";

export const createUserValidationSchema = z.object({
  userName: z
    .string()
    .min(1, "User name is required.")
    .max(100, "User name should not exceed 100 characters."),
  email: z
    .string()
    .email("Invalid email address.")
    .max(100, "Email should not exceed 100 characters."),
  phoneNumber: z
    .number()
    .int("Phone number must be an integer.")
    .positive("Phone number must be positive."),
  userType: z.enum(["USER", "VENDOR"]),
});

// Example usage
export const userSchema = {
  createUserValidationSchema,
};
