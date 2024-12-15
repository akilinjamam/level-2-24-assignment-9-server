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
exports.userController = void 0;
const tryCatchAsynce_1 = require("../../../shared/tryCatchAsynce");
const user_service_1 = require("./user.service");
const createUserController = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.createUser(req.body);
    res.status(201).json({
        success: true,
        status: 201,
        message: "User created successfully",
        data: result,
    });
}));
const createUserLoginController = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.createLogin(req.body);
    res.status(201).json({
        success: true,
        status: 201,
        message: "User Logged in successfully",
        data: result,
    });
}));
const changePasswordController = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getUser = req.user;
    console.log(getUser);
    const result = yield user_service_1.userService.changePassword(req.body, getUser);
    res.status(201).json({
        success: true,
        status: 201,
        message: "Password changed successfully",
        data: result,
    });
}));
const resetPasswordController = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getUser = req.user;
    console.log(getUser);
    const result = yield user_service_1.userService.resetPassword(req.body, getUser);
    res.status(201).json({
        success: true,
        status: 201,
        message: "Password reset successfully done",
        data: result,
    });
}));
exports.userController = {
    createUserController,
    createUserLoginController,
    changePasswordController,
    resetPasswordController,
};