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
            Review: {
                include: {
                    Replay: true,
                },
            },
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
            Review: {
                include: {
                    Replay: true,
                },
            },
        },
    });
    return result;
});
const getProductWithVendorId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.products.findFirst({
        where: {
            vendorId: id,
        },
        include: {
            Rating: true,
            vendor: true,
            Review: true,
        },
    });
    return result;
});
const updateProduct = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.products.update({
        where: {
            productId: id,
        },
        data: data,
    });
    return result;
});
const updateImageProduct = (id, image, indexId) => __awaiter(void 0, void 0, void 0, function* () {
    const findImagesWithId = (yield prisma_1.prisma.products.findUnique({
        where: { productId: id },
        select: { images: true },
    }));
    const updatedImages = [...findImagesWithId === null || findImagesWithId === void 0 ? void 0 : findImagesWithId.images];
    updatedImages[indexId] = image;
    const result = yield prisma_1.prisma.products.update({
        where: {
            productId: id,
        },
        data: {
            images: updatedImages,
        },
    });
    return result;
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const findProduct = yield prisma_1.prisma.products.findFirst({
        where: {
            productId: id,
        },
        include: {
            Review: true,
            Rating: true,
        },
    });
    const findPurchasedProductId = yield prisma_1.prisma.purchasedProduct.findFirst({
        where: {
            productId: id,
        },
    });
    const ratingIds = (_a = findProduct === null || findProduct === void 0 ? void 0 : findProduct.Rating) === null || _a === void 0 ? void 0 : _a.map((rating) => rating.ratingId);
    const reviewIds = (_b = findProduct === null || findProduct === void 0 ? void 0 : findProduct.Review) === null || _b === void 0 ? void 0 : _b.map((rating) => rating.reviewId);
    const purchasedProductId = findPurchasedProductId === null || findPurchasedProductId === void 0 ? void 0 : findPurchasedProductId.purchasedProductId;
    try {
        const result = yield pirsma.$transaction((prix) => __awaiter(void 0, void 0, void 0, function* () {
            yield prix.rating.deleteMany({
                where: {
                    ratingId: { in: ratingIds },
                },
            });
            yield prix.replay.deleteMany({
                where: {
                    reviewId: { in: reviewIds },
                },
            });
            yield prix.review.deleteMany({
                where: {
                    reviewId: { in: reviewIds },
                },
            });
            yield prix.replay.deleteMany({
                where: {
                    reviewId: { in: reviewIds },
                },
            });
            yield prix.replay.deleteMany({
                where: {
                    reviewId: { in: reviewIds },
                },
            });
            yield prix.purchasedProduct.delete({
                where: {
                    purchasedProductId: purchasedProductId,
                },
            });
            const result = yield prix.products.delete({
                where: { productId: id },
            });
            return result;
        }));
        console.log(result);
        return result;
    }
    catch (error) {
        console.error("Transaction failed, rolled back:", error);
    }
    finally {
        yield prisma_1.prisma.$disconnect();
    }
});
exports.productService = {
    createProductService,
    getProductService,
    getProductWithCategory,
    getProductWithFlashSale,
    getProductWithId,
    updateProduct,
    updateImageProduct,
    deleteProduct,
    getProductWithVendorId,
};
