import express from "express";
import { bookRouter } from "../app/modules/Book/Book.route";
import { borrowRouter } from "../app/modules/Borrow/Borrow.route";
import { memberRouter } from "../app/modules/Member/member.route";
import { returnRouter } from "../app/modules/Return/return.route";

const routes = express.Router();

const moduleRoutes = [
  {
    path: "/books",
    routes: bookRouter,
  },
  {
    path: "/members",
    routes: memberRouter,
  },
  {
    path: "/borrow",
    routes: borrowRouter,
  },
  {
    path: "/return",
    routes: returnRouter,
  },
];

moduleRoutes.forEach((route) => routes.use(route.path, route.routes));

export default routes;
