import express from "express";
import { validateRequest } from "../../../middleware/validateRequest";
import { userSchema } from "./user.validation";
import { userController } from "./user.controller";

const router = express.Router();

router.post(
  "/create-user",
  validateRequest(userSchema.createUserValidationSchema),
  userController.createUserController
);

export const userRouter = router;
