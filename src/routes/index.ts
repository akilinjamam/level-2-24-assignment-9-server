import { followRouter } from "../app/modules/follow/follows.route";
import { productRouter } from "../app/modules/products/products.route";
import { purchasedProductRouter } from "../app/modules/purchasedProduct/purchasedProduct.route";
import { ratingRoute } from "../app/modules/ratings/ratings.route";
import { replayRouter } from "../app/modules/replay/replay.router";
import { reviewRouter } from "../app/modules/reviews/reviews.route";
import { userRouter } from "../app/modules/user/user.route";
import { vendorRouter } from "../app/modules/vendor/vendor.route";

const routes = [
  {
    path: "products",
    routes: productRouter,
  },
  {
    path: "purchaseProducts",
    routes: purchasedProductRouter,
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
  {
    path: "replays",
    routes: replayRouter,
  },
];

export default routes;
