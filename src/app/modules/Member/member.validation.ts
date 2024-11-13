import { z } from "zod";

const createMemberSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    membershipDate: z.string(),
  }),
});
const updateMemberSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    membershipDate: z.string().optional(),
  }),
});

export const memberSchema = {
  createMemberSchema,
  updateMemberSchema,
};
