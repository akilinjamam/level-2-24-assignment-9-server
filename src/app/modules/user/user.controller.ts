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

export const userController = {
  createUserController,
};
