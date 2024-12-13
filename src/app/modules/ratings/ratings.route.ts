import express from "express";
import { validateRequest } from "../../../middleware/validateRequest";
import { ratingValidation } from "./ratings.validation";
import { ratingController } from "./ratings.controller";

const router = express.Router();

router.post(
  "/create-rating",
  validateRequest(ratingValidation.ratingValidationSchema),
  ratingController.createRatingController
);

export const ratingRoute = router;
