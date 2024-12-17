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
exports.vendorService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../../shared/prisma");
const pirsma = new client_1.PrismaClient();
const createVendor = (data, image, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const newData = Object.assign(Object.assign({}, data), { logo: image, userId: userId });
    const result = yield pirsma.vendor.create({
        data: newData,
    });
    return result;
});
const getAllVendor = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pirsma.vendor.findMany({
        include: {
            product: true,
            follows: {
                include: {
                    vendor: true,
                    user: true,
                },
            },
        },
    });
    return result;
});
const getAllVendorWithId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pirsma.vendor.findFirst({
        where: {
            vendorId: id,
        },
        include: {
            product: true,
            follows: {
                include: {
                    vendor: true,
                    user: true,
                },
            },
        },
    });
    return result;
});
const getAllVendorWithUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pirsma.vendor.findFirst({
        where: {
            userId: id,
        },
        include: {
            product: true,
            follows: {
                include: {
                    vendor: true,
                    user: true,
                },
            },
        },
    });
    return result;
});
const updateVendor = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.vendor.update({
        where: {
            vendorId: id,
        },
        data: data,
    });
    return result;
});
const updateVendorImg = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.vendor.update({
        where: {
            vendorId: id,
        },
        data: data,
    });
    return result;
});
exports.vendorService = {
    createVendor,
    getAllVendor,
    getAllVendorWithId,
    getAllVendorWithUserId,
    updateVendor,
    updateVendorImg,
};
