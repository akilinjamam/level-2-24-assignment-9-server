import express from "express";
import { validateRequest } from "../../../middleware/validateRequest";
import { userSchema } from "./user.validation";
import { userController } from "./user.controller";
import auth from "../../../auth/auth";

const router = express.Router();

router.post(
  "/create-user",
  validateRequest(userSchema.createUserValidationSchema),
  userController.createUserController
);

router.post(
  "/create-user-login",
  validateRequest(userSchema.createUserLoginValidationSchema),
  userController.createUserLoginController
);

router.post(
  "/change-password",
  auth(),
  validateRequest(userSchema.createChangePasswordValidationSchema),
  userController.changePasswordController
);

router.post(
  "/reset-password",
  auth(),
  validateRequest(userSchema.createResetPasswordValidationSchema),
  userController.resetPasswordController
);

export const userRouter = router;
