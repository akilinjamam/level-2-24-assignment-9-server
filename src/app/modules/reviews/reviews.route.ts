import express from "express";
import { validateRequest } from "../../../middleware/validateRequest";
import { reviewValidation } from "./reviews.validation";
import { reviewController } from "./reviews.controller";

const router = express.Router();

router.post(
  "/create-review",
  validateRequest(reviewValidation.reviewValidationSchema),
  reviewController.createReviewController
);

export const reviewRouter = router;