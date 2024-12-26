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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const client_1 = require("@prisma/client");
const createToken_1 = require("../../../token/createToken");
const sendMail_1 = require("../../../sendMail/sendMail");
const prisma = new client_1.PrismaClient();
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data);
    const result = yield prisma.user.create({
        data: data,
    });
    return result;
});
const createLogin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = (yield prisma.user.findFirst({
        where: {
            email: data.email,
        },
    }));
    if (!findUser) {
        throw new Error("user not found");
    }
    if (findUser === null || findUser === void 0 ? void 0 : findUser.suspend) {
        throw new Error("sorry you are suspended");
    }
    console.log(findUser);
    if ((findUser === null || findUser === void 0 ? void 0 : findUser.password) !== data.password) {
        throw new Error("password did not matched");
    }
    const jwt_token = process.env.JWT_ACCESS_SECRET;
    const jwt_expires_id = process.env.JWT_ACCESS_EXPIRES_IN;
    const jwtPayload = {
        userId: findUser === null || findUser === void 0 ? void 0 : findUser.userId,
        userName: findUser === null || findUser === void 0 ? void 0 : findUser.userName,
        email: findUser === null || findUser === void 0 ? void 0 : findUser.email,
        address: findUser === null || findUser === void 0 ? void 0 : findUser.address,
        UserType: findUser === null || findUser === void 0 ? void 0 : findUser.userType,
        phoneNumber: findUser === null || findUser === void 0 ? void 0 : findUser.phoneNumber,
        userType: findUser === null || findUser === void 0 ? void 0 : findUser.userType,
    };
    let token;
    const getTokens = (0, createToken_1.createToken)(jwtPayload, jwt_token, jwt_expires_id);
    token = getTokens;
    return { accesstoken: token };
});
const changePassword = (data, getUser) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(getUser);
    const newData = {
        password: data.newPassword,
    };
    const findUser = yield prisma.user.findFirst({
        where: {
            email: getUser === null || getUser === void 0 ? void 0 : getUser.email,
        },
    });
    const oldPassword = findUser === null || findUser === void 0 ? void 0 : findUser.password;
    if (oldPassword !== data.oldPassword) {
        throw new Error("old password did not matched");
    }
    const result = yield prisma.user.update({
        where: {
            email: getUser === null || getUser === void 0 ? void 0 : getUser.email,
        },
        data: newData,
    });
    return result;
});
const resetPassword = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = (yield prisma.user.findFirst({
        where: {
            email: data.email,
        },
    }));
    console.log(data);
    const { password } = findUser, remaining = __rest(findUser, ["password"]);
    const jwtPayload = remaining;
    console.log(jwtPayload);
    const resetToken = (0, createToken_1.createToken)(jwtPayload, process.env.JWT_ACCESS_SECRET, "10m");
    const htmlUiLink = `https://level-2-24-assignment-9-client.vercel.app/recoveryPassword?userToken=${resetToken}`;
    (0, sendMail_1.sendEmail)(data.email, htmlUiLink);
    return data;
});
const recoverPassword = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const updatePassword = yield prisma.user.update({
        where: {
            email: data.email,
        },
        data: {
            password: data.password,
        },
    });
    return updatePassword;
});
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.update({
        where: {
            userId: id,
        },
        data,
    });
    return result;
});
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.findMany({});
    return result;
});
const deletelUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.$transaction((prix) => __awaiter(void 0, void 0, void 0, function* () {
            const findUser = yield prix.user.findFirst({
                where: {
                    userId: id,
                },
            });
            const userType = findUser === null || findUser === void 0 ? void 0 : findUser.userType;
            let suspend;
            if (findUser === null || findUser === void 0 ? void 0 : findUser.suspend) {
                suspend = false;
            }
            else {
                suspend = true;
            }
            console.log(suspend);
            if (userType === "VENDOR") {
                const findVendor = yield prix.vendor.findFirst({
                    where: {
                        userId: id,
                    },
                });
                const vendorId = findVendor === null || findVendor === void 0 ? void 0 : findVendor.vendorId;
                const findProducts = yield prix.products.findMany({
                    where: {
                        vendorId: vendorId,
                    },
                });
                const productIds = findProducts === null || findProducts === void 0 ? void 0 : findProducts.map((item) => item === null || item === void 0 ? void 0 : item.productId);
                yield prix.products.updateMany({
                    where: {
                        productId: { in: productIds },
                    },
                    data: { suspend: suspend },
                });
                const result = yield prix.user.update({
                    where: {
                        userId: id,
                    },
                    data: {
                        suspend: suspend,
                    },
                });
                return result;
            }
            if (userType === "USER") {
                const result = yield prix.user.update({
                    where: {
                        userId: id,
                    },
                    data: {
                        suspend: suspend,
                    },
                });
                return result;
            }
        }));
        return result;
    }
    catch (error) {
        console.log(error);
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.userService = {
    createUser,
    createLogin,
    changePassword,
    resetPassword,
    recoverPassword,
    updateUser,
    getAllUser,
    deletelUser,
};
