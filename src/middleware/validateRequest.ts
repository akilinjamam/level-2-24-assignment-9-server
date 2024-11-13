import { AnyZodObject } from "zod";
import { tryCatchAsync } from "../shared/tryCatchAsynce";

export const validateRequest = (schema: AnyZodObject) => {
  return tryCatchAsync(async (req, res, next) => {
    await schema.parseAsync({
      body: req.body,
    });
    next();
  });
};
