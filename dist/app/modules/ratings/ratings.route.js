"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../../middleware/validateRequest");
const ratings_validation_1 = require("./ratings.validation");
const ratings_controller_1 = require("./ratings.controller");
const router = express_1.default.Router();
router.post("/create-rating", (0, validateRequest_1.validateRequest)(ratings_validation_1.ratingValidation.ratingValidationSchema), ratings_controller_1.ratingController.createRatingController);
exports.ratingRoute = router;
