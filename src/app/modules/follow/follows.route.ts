import express from "express";
import { validateRequest } from "../../../middleware/validateRequest";
import { followSchema } from "./follows.validation";
import { followController } from "./follows.controller";

const router = express.Router();

router.post(
  "/create-follow",
  validateRequest(followSchema.createFollowValidationSchema),
  followController.createFollowController
);
router.get("/", followController.getFollowController);

export const followRouter = router;
