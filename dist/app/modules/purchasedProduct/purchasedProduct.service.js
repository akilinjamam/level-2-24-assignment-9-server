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
exports.purchasedProductService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createPayment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { purchasedProductId, productId, quantity, price, discount } = data;
    console.log(purchasedProductId, productId);
    const totalPrice = quantity * price - discount;
    const newPurchasedProductUpdatedData = {
        price,
        quantity,
        discount,
        totalPrice,
    };
    console.log(newPurchasedProductUpdatedData);
    try {
        const result = yield prisma.$transaction((prix) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield prix.purchasedProduct.update({
                where: {
                    purchasedProductId: purchasedProductId,
                },
                data: newPurchasedProductUpdatedData,
            });
            return result;
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
const successPayment = (productId, purchasedProductId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.$transaction((prismaTrans) => __awaiter(void 0, void 0, void 0, function* () {
            const findProduct = yield prismaTrans.products.findFirst({
                where: {
                    productId: productId,
                },
            });
            const findPurchaseProduct = (yield prismaTrans.purchasedProduct.findFirst({
                where: {
                    purchasedProductId: purchasedProductId,
                },
            }));
            if ((findPurchaseProduct === null || findPurchaseProduct === void 0 ? void 0 : findPurchaseProduct.quantity) >
                (findProduct === null || findProduct === void 0 ? void 0 : findProduct.quantity)) {
                throw new Error("purchased Quantity can not exceed total Stock Quantity");
            }
            const findPurchaseProductQunatity = findPurchaseProduct === null || findPurchaseProduct === void 0 ? void 0 : findPurchaseProduct.quantity;
            // const findPurchaseProductPrice = findPurchaseProduct?.price;
            // const findPurchaseProductDiscount = findPurchaseProduct?.price;
            const updateQuantityDataForProducts = (findProduct === null || findProduct === void 0 ? void 0 : findProduct.quantity) - findPurchaseProductQunatity;
            let newStock = true;
            if (updateQuantityDataForProducts === 0) {
                newStock = false;
            }
            const newUpdatedDataForProduct = {
                quantity: updateQuantityDataForProducts,
                stock: newStock,
                discount: findPurchaseProduct === null || findPurchaseProduct === void 0 ? void 0 : findPurchaseProduct.discount,
            };
            yield prismaTrans.products.update({
                where: {
                    productId: productId,
                },
                data: newUpdatedDataForProduct,
            });
            yield prismaTrans.purchasedProduct.update({
                where: {
                    purchasedProductId: purchasedProductId,
                },
                data: {
                    purchased: true,
                },
            });
        }));
    }
    catch (error) {
        console.error("Transaction failed, rolled back:", error);
    }
    finally {
        yield prisma.$disconnect();
    }
    return "";
});
const addToCart = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.purchasedProduct.create({
        data,
    });
    return result;
});
const getCartWithUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.purchasedProduct.findMany({
        where: {
            userId: id,
            purchased: false,
        },
    });
    return result;
});
const deleteCartWithId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.purchasedProduct.delete({
        where: {
            purchasedProductId: id,
        },
    });
    return result;
});
const getPurchasedHistory = (id, userType) => __awaiter(void 0, void 0, void 0, function* () {
    if (userType === "VENDOR") {
        const findVendorId = yield prisma.vendor.findFirst({
            where: {
                userId: id,
            },
        });
        if (!findVendorId) {
            throw new Error("Vendor not found");
        }
        const vendorId = findVendorId.vendorId;
        const result = yield prisma.purchasedProduct.findMany({
            where: {
                vendorId: vendorId,
                purchased: true,
            },
            include: {
                Review: {
                    include: {
                        Replay: true,
                    },
                },
            },
        });
        return result;
    }
    if (userType === "USER") {
        const result = yield prisma.purchasedProduct.findMany({
            where: {
                userId: id,
                purchased: true,
            },
            include: {
                Review: {
                    include: {
                        Replay: true,
                    },
                },
            },
        });
        return result;
    }
});
const replaceCart = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const findAllSameVendor = yield prisma.purchasedProduct.findMany({
        where: {
            userId: data.userId,
            purchased: false,
        },
    });
    const getAllProductIds = findAllSameVendor === null || findAllSameVendor === void 0 ? void 0 : findAllSameVendor.map((ids) => ids.purchasedProductId);
    try {
        const result = yield prisma.$transaction((prix) => __awaiter(void 0, void 0, void 0, function* () {
            yield prix.purchasedProduct.deleteMany({
                where: {
                    purchasedProductId: { in: getAllProductIds },
                },
            });
            const result = yield prix.purchasedProduct.create({
                data,
            });
            return result;
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
exports.purchasedProductService = {
    successPayment,
    addToCart,
    createPayment,
    getCartWithUserId,
    getPurchasedHistory,
    deleteCartWithId,
    replaceCart,
};
