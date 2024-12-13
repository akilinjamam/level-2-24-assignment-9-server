import { tryCatchAsync } from "../../../shared/tryCatchAsynce";
import { replayService } from "./replay.service";

const createReplayController = tryCatchAsync(async (req, res) => {
  const result = await replayService.createReplay(req.body);

  res.status(201).json({
    success: true,
    status: 201,
    message: "replay created successfully",
    data: result,
  });
});

export const replayController = {
  createReplayController,
};
