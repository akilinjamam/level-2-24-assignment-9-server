import { tryCatchAsync } from "../../../shared/tryCatchAsynce";
import { reviewService } from "./reviews.service";

const createReviewController = tryCatchAsync(async (req, res) => {
  const result = await reviewService.createReviews(req.body);

  res.status(201).json({
    success: true,
    status: 201,
    message: "reviews created successfully",
    data: result,
  });
});

const getReviewController = tryCatchAsync(async (req, res) => {
  const result = await reviewService.getReviews(req.body);

  res.status(201).json({
    success: true,
    status: 201,
    message: "reviews found successfully",
    data: result,
  });
});

export const reviewController = {
  createReviewController,
  getReviewController,
};
