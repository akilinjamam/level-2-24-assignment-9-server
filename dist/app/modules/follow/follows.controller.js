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
exports.followController = void 0;
const tryCatchAsynce_1 = require("../../../shared/tryCatchAsynce");
const follows_service_1 = require("./follows.service");
const createFollowController = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield follows_service_1.followService.createFollow(req.body);
    res.status(201).json({
        success: true,
        status: 201,
        message: result === null || result === void 0 ? void 0 : result.message,
        data: result === null || result === void 0 ? void 0 : result.result,
    });
}));
const getFollowController = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield follows_service_1.followService.getFollow();
    res.status(201).json({
        success: true,
        status: 201,
        message: "Follows fetched successfully",
        data: result,
    });
}));
exports.followController = {
    createFollowController,
    getFollowController,
};
