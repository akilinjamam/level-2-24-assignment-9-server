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
exports.followService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createFollow = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
            const findVendor = yield prisma.follow.findMany({
                where: {
                    vendorId: data.vendorId,
                },
            });
            const isUserExistInThisVendorOrNot = findVendor === null || findVendor === void 0 ? void 0 : findVendor.find((f) => (f === null || f === void 0 ? void 0 : f.userId) === data.userId);
            console.log(isUserExistInThisVendorOrNot);
            if (isUserExistInThisVendorOrNot) {
                const deletedFollow = yield prisma.follow.delete({
                    where: {
                        followId: isUserExistInThisVendorOrNot === null || isUserExistInThisVendorOrNot === void 0 ? void 0 : isUserExistInThisVendorOrNot.followId,
                    },
                });
                const findUsers = yield prisma.follow.findMany({
                    where: {
                        vendorId: data.vendorId,
                    },
                });
                const newFollowerCount = findUsers === null || findUsers === void 0 ? void 0 : findUsers.length;
                const newVendorUpdatedData = {
                    followedCount: newFollowerCount,
                };
                yield prisma.vendor.update({
                    where: {
                        vendorId: data.vendorId,
                    },
                    data: newVendorUpdatedData,
                });
                return {
                    message: "follow deleted successfully",
                    result: deletedFollow,
                };
            }
            const createFollow = yield prisma.follow.create({
                data: data,
            });
            const findUsers = yield prisma.follow.findMany({
                where: {
                    vendorId: data.vendorId,
                },
            });
            const newFollowerCount = findUsers === null || findUsers === void 0 ? void 0 : findUsers.length;
            const newVendorUpdatedData = {
                followedCount: newFollowerCount,
            };
            yield prisma.vendor.update({
                where: {
                    vendorId: data.vendorId,
                },
                data: newVendorUpdatedData,
            });
            return {
                message: "follow created successfully",
                result: createFollow,
            };
        }));
        return result;
    }
    catch (error) {
        console.error("Transaction failed, rolled back:", error);
    }
    finally {
        yield prisma.$disconnect();
    }
});
const getFollow = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.follow.findMany({
        include: {
            user: true,
            vendor: true,
        },
    });
    return result;
});
exports.followService = {
    createFollow,
    getFollow,
};
