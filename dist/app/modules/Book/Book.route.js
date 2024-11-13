"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const Book_controller_1 = require("./Book.controller");
const validateRequest_1 = require("../../../middleware/validateRequest");
const Book_validation_1 = require("./Book.validation");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.validateRequest)(Book_validation_1.bookSchema.createBookSchema), Book_controller_1.bookController.createBook);
router.get("/", Book_controller_1.bookController.getBook);
router.get("/:bookId", Book_controller_1.bookController.getBookByBookId);
router.put("/:bookId", (0, validateRequest_1.validateRequest)(Book_validation_1.bookSchema.updateBookSchema), Book_controller_1.bookController.updateBookByBookId);
router.delete("/:bookId", Book_controller_1.bookController.deleteBookByBookId);
exports.bookRouter = router;
