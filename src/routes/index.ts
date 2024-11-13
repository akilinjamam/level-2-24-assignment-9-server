import { bookRouter } from "../app/modules/Book/Book.route";
import { borrowRouter } from "../app/modules/Borrow/Borrow.route";
import { memberRouter } from "../app/modules/Member/member.route";

const routes = [
  {
    path: "books",
    routes: bookRouter,
  },
  {
    path: "members",
    routes: memberRouter,
  },
  {
    path: "borrow",
    routes: borrowRouter,
  },
];

export default routes;
