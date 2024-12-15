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
        const result = yield prisma.$transaction((prismaTrans) => __awaiter(void 0, void 0, void 0, function* () {
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
            const findPurchaseProductPrice = findPurchaseProduct === null || findPurchaseProduct === void 0 ? void 0 : findPurchaseProduct.price;
            const findPurchaseProductDiscount = findPurchaseProduct === null || findPurchaseProduct === void 0 ? void 0 : findPurchaseProduct.price;
            const updateQuantityDataForProducts = (findProduct === null || findProduct === void 0 ? void 0 : findProduct.quantity) - findPurchaseProductQunatity;
            let newStock;
            if (updateQuantityDataForProducts === 0) {
                newStock = false;
            }
            const newUpdatedDataForProduct = {
                quantity: updateQuantityDataForProducts,
                stock: newStock,
            };
            yield prismaTrans.products.update({
                where: {
                    productId: productId,
                },
                data: newUpdatedDataForProduct,
            });
            const newTotalPrice = findPurchaseProductPrice * findPurchaseProductQunatity -
                findPurchaseProductDiscount;
            const newPurchasedUpdatedData = {
                price: findPurchaseProductPrice,
                quantity: findPurchaseProductQunatity,
                totalPrice: newTotalPrice,
                discount: findPurchaseProductDiscount,
            };
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
exports.purchasedProductService = {
    successPayment,
    addToCart,
    createPayment,
};
