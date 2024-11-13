"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Book_route_1 = require("../app/modules/Book/Book.route");
const Borrow_route_1 = require("../app/modules/Borrow/Borrow.route");
const member_route_1 = require("../app/modules/Member/member.route");
const return_route_1 = require("../app/modules/Return/return.route");
const routes = [
    {
        path: "books",
        routes: Book_route_1.bookRouter,
    },
    {
        path: "members",
        routes: member_route_1.memberRouter,
    },
    {
        path: "borrow",
        routes: Borrow_route_1.borrowRouter,
    },
    {
        path: "return",
        routes: return_route_1.returnRouter,
    },
];
exports.default = routes;
