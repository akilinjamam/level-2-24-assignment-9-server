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
exports.ratingController = void 0;
const tryCatchAsynce_1 = require("../../../shared/tryCatchAsynce");
const ratings_service_1 = require("./ratings.service");
const createRatingController = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ratings_service_1.ratingService.createRating(req.body);
    res.status(201).json({
        success: true,
        status: 201,
        message: "rating created successfully",
        data: result,
    });
}));
exports.ratingController = {
    createRatingController,
};
