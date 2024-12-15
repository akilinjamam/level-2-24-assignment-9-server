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
const client_1 = require("@prisma/client");
const jwt_decode_1 = require("jwt-decode");
const auth = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        const prisma = new client_1.PrismaClient();
        if (!token) {
            throw new Error("token not found");
        }
        const decoded = (0, jwt_decode_1.jwtDecode)(token);
        const checkUser = yield prisma.user.findFirst({
            where: {
                email: decoded === null || decoded === void 0 ? void 0 : decoded.email,
            },
        });
        if (!checkUser) {
            throw new Error("user not found from given token");
        }
        req.user = decoded;
        next();
    });
};
exports.default = auth;
