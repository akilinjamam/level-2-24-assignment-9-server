"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const globalErrorHandler = (err, req, res, next) => {
    res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
        success: false,
        status: http_status_codes_1.default.INTERNAL_SERVER_ERROR,
        message: err.message,
    });
};
exports.globalErrorHandler = globalErrorHandler;
