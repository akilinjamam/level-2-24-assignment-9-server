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
exports.productService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../../shared/prisma");
const pirsma = new client_1.PrismaClient();
const createProductService = (data, images) => __awaiter(void 0, void 0, void 0, function* () {
    const newData = Object.assign(Object.assign({}, data), { images });
    console.log(newData);
    const result = yield prisma_1.prisma.products.create({
        data: newData,
    });
    return result;
});
const getProductService = (category, from, to) => __awaiter(void 0, void 0, void 0, function* () {
    let addFilterCondition = {};
    if (category && !from && !to) {
        addFilterCondition = {
            category: category,
        };
    }
    if (from && to && !category) {
        addFilterCondition = {
            price: {
                gte: Number(from),
                lte: Number(to),
            },
        };
    }
    const result = yield prisma_1.prisma.products.findMany({
        orderBy: {
            vendor: {
                followedCount: "desc",
            },
        },
        where: addFilterCondition,
        include: {
            vendor: true,
            Review: true,
            Rating: true,
        },
    });
    return result;
});
const getProductWithCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.products.groupBy({
        by: ["category"],
    });
    return result;
});
const getProductWithFlashSale = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.products.findMany({
        where: {
            flashSale: true,
        },
    });
    return result;
});
const getProductWithId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.products.findFirst({
        where: {
            productId: id,
        },
        include: {
            Rating: true,
            vendor: true,
            Review: true,
        },
    });
    return result;
});
exports.productService = {
    createProductService,
    getProductService,
    getProductWithCategory,
    getProductWithFlashSale,
    getProductWithId,
};
