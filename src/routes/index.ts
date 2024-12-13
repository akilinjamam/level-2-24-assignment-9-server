import { followRouter } from "../app/modules/follow/follows.route";
import { productRouter } from "../app/modules/products/products.route";
import { ratingRoute } from "../app/modules/ratings/ratings.route";
import { reviewRouter } from "../app/modules/reviews/reviews.route";
import { userRouter } from "../app/modules/user/user.route";
import { vendorRouter } from "../app/modules/vendor/vendor.route";

const routes = [
  {
    path: "products",
    routes: productRouter,
  },
  {
    path: "vendors",
    routes: vendorRouter,
  },
  {
    path: "users",
    routes: userRouter,
  },
  {
    path: "follows",
    routes: followRouter,
  },
  {
    path: "ratings",
    routes: ratingRoute,
  },
  {
    path: "reviews",
    routes: reviewRouter,
  },
];

export default routes;
