import { tryCatchAsync } from "../../../shared/tryCatchAsynce";
import { followService } from "./follows.service";

const createFollowController = tryCatchAsync(async (req, res) => {
  const result = await followService.createFollow(req.body);

  res.status(201).json({
    success: true,
    status: 201,
    message: "follow created successfully",
    data: result,
  });
});

export const followController = {
  createFollowController,
};
