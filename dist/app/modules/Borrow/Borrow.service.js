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
exports.borrowService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createBorrow = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const dueDate = new Date(date);
    dueDate.setDate(dueDate.getDate() + 14);
    const newData = Object.assign(Object.assign({}, data), { borrowDate: date, returnDate: dueDate });
    const result = yield prisma.borrowRecord.create({
        data: newData,
        select: {
            borrowId: true,
            bookId: true,
            memberId: true,
            borrowDate: true,
            returnDate: false,
        },
    });
    return result;
});
const getOverDueBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    const overDueBorrowedBooks = yield prisma.borrowRecord.findMany({
        where: {
            returnDate: {
                lte: today,
            },
        },
    });
    return overDueBorrowedBooks;
});
exports.borrowService = {
    createBorrow,
    getOverDueBooks,
};
