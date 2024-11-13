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
exports.bookController = void 0;
const Book_service_1 = require("./Book.service");
const tryCatchAsynce_1 = require("../../../shared/tryCatchAsynce");
const createBook = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Book_service_1.bookService.createBook(req.body);
    res.status(201).json({
        success: true,
        status: 201,
        message: "Book created successfully",
        data: result,
    });
}));
const getBook = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Book_service_1.bookService.getBook();
    res.status(201).json({
        success: true,
        status: 200,
        message: "Books retrieved successfully",
        data: result,
    });
}));
const getBookByBookId = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Book_service_1.bookService.getBookByBookId(req.params.bookId);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Book retrieved successfully",
        data: result,
    });
}));
const updateBookByBookId = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Book_service_1.bookService.updateBookByBookId(req.params.bookId, req.body);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Book updated successfully",
        data: result,
    });
}));
const deleteBookByBookId = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Book_service_1.bookService.deleteBookByBookId(req.params.bookId);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Book successfully deleted",
    });
}));
exports.bookController = {
    createBook,
    getBook,
    getBookByBookId,
    updateBookByBookId,
    deleteBookByBookId,
};
