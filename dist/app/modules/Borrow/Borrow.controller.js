"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowController = void 0;
const tryCatchAsynce_1 = require("../../../shared/tryCatchAsynce");
const Borrow_service_1 = require("./Borrow.service");
const createBorrow = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Borrow_service_1.borrowService.createBorrow(req.body);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Book borrowed successfully",
        data: result,
    });
}));
const getOverDueBorrowedBooks = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Borrow_service_1.borrowService.getOverDueBooks();
    res.status(200).json({
        success: true,
        status: 200,
        message: result.length > 0 ? "Overdue borrow list fetched" : "No overdue books",
        data: result,
    });
}));
exports.borrowController = {
    createBorrow,
    getOverDueBorrowedBooks,
};
