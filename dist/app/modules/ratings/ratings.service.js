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
exports.ratingService = void 0;
const client_1 = require("@prisma/client");
const prism = new client_1.PrismaClient();
const createRating = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const findPurchseProduct = yield prism.rating.findFirst({
        where: {
            purchasedProductId: data.purchasedProductId,
        },
    });
    let result;
    if (!findPurchseProduct) {
        result = yield prism.rating.create({
            data: data,
        });
    }
    if (findPurchseProduct) {
        const find = findPurchseProduct.ratingId;
        result = yield prism.rating.update({
            where: {
                ratingId: find,
            },
            data: {
                rating: data.rating,
            },
        });
    }
    return result;
});
exports.ratingService = {
    createRating,
};
