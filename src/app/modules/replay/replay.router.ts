import experss from "express";
import { validateRequest } from "../../../middleware/validateRequest";
import { replayValidation } from "./replay.validation";
import { replayController } from "./replay.controller";

const router = experss.Router();

router.post(
  "/create-replay",
  validateRequest(replayValidation.replayValidationSchema),
  replayController.createReplayController
);

export const replayRouter = router;
