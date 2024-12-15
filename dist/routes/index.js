"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const follows_route_1 = require("../app/modules/follow/follows.route");
const products_route_1 = require("../app/modules/products/products.route");
const purchasedProduct_route_1 = require("../app/modules/purchasedProduct/purchasedProduct.route");
const ratings_route_1 = require("../app/modules/ratings/ratings.route");
const replay_router_1 = require("../app/modules/replay/replay.router");
const reviews_route_1 = require("../app/modules/reviews/reviews.route");
const user_route_1 = require("../app/modules/user/user.route");
const vendor_route_1 = require("../app/modules/vendor/vendor.route");
const routes = [
    {
        path: "products",
        routes: products_route_1.productRouter,
    },
    {
        path: "purchaseProducts",
        routes: purchasedProduct_route_1.purchasedProductRouter,
    },
    {
        path: "vendors",
        routes: vendor_route_1.vendorRouter,
    },
    {
        path: "users",
        routes: user_route_1.userRouter,
    },
    {
        path: "follows",
        routes: follows_route_1.followRouter,
    },
    {
        path: "ratings",
        routes: ratings_route_1.ratingRoute,
    },
    {
        path: "reviews",
        routes: reviews_route_1.reviewRouter,
    },
    {
        path: "replays",
        routes: replay_router_1.replayRouter,
    },
];
exports.default = routes;
