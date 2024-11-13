"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRouter = void 0;
const express_1 = __importDefault(require("express"));
const Borrow_validation_1 = require("./Borrow.validation");
const validateRequest_1 = require("../../../middleware/validateRequest");
const Borrow_controller_1 = require("./Borrow.controller");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.validateRequest)(Borrow_validation_1.borrowSchema.createBorrowSchema), Borrow_controller_1.borrowController.createBorrow);
router.get("/overdue", Borrow_controller_1.borrowController.getOverDueBorrowedBooks);
exports.borrowRouter = router;
