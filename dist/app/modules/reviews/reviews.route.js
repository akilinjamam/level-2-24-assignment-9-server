"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../../middleware/validateRequest");
const reviews_validation_1 = require("./reviews.validation");
const reviews_controller_1 = require("./reviews.controller");
const router = express_1.default.Router();
router.post("/create-review", (0, validateRequest_1.validateRequest)(reviews_validation_1.reviewValidation.reviewValidationSchema), reviews_controller_1.reviewController.createReviewController);
router.get("/", reviews_controller_1.reviewController.getReviewController);
exports.reviewRouter = router;
