import { DecodedToken } from "../../../auth/auth";
import { tryCatchAsync } from "../../../shared/tryCatchAsynce";
import { userService } from "./user.service";

const createUserController = tryCatchAsync(async (req, res) => {
  const result = await userService.createUser(req.body);

  res.status(201).json({
    success: true,
    status: 201,
    message: "User created successfully",
    data: result,
  });
});

const createUserLoginController = tryCatchAsync(async (req, res) => {
  const result = await userService.createLogin(req.body);

  res.status(201).json({
    success: true,
    status: 201,
    message: "User Logged in successfully",
    data: result,
  });
});

const changePasswordController = tryCatchAsync(async (req, res) => {
  const getUser = req.user;
  console.log(getUser);

  const result = await userService.changePassword(
    req.body,
    getUser as DecodedToken
  );

  res.status(201).json({
    success: true,
    status: 201,
    message: "Password changed successfully",
    data: result,
  });
});

const resetPasswordController = tryCatchAsync(async (req, res) => {
  const getUser = req.user;
  console.log(getUser);

  const result = await userService.resetPassword(
    req.body,
    getUser as DecodedToken
  );

  res.status(201).json({
    success: true,
    status: 201,
    message: "Password reset successfully done",
    data: result,
  });
});

export const userController = {
  createUserController,
  createUserLoginController,
  changePasswordController,
  resetPasswordController,
};
