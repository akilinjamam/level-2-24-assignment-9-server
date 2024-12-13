import { tryCatchAsync } from "../../../shared/tryCatchAsynce";
import { ratingService } from "./ratings.service";

const createRatingController = tryCatchAsync(async (req, res) => {
  const result = await ratingService.createRating(req.body);

  res.status(201).json({
    success: true,
    status: 201,
    message: "rating created successfully",
    data: result,
  });
});

export const ratingController = {
  createRatingController,
};
