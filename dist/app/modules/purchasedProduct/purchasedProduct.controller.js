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
exports.purchasedProductController = void 0;
const tryCatchAsynce_1 = require("../../../shared/tryCatchAsynce");
const purchasedProduct_paymentInitialization_1 = require("./purchasedProduct.paymentInitialization");
const purchasedProduct_service_1 = require("./purchasedProduct.service");
const uuid_1 = require("uuid");
const createPayment = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { productId, purchasedProductId } = req.body;
    const result = yield purchasedProduct_service_1.purchasedProductService.createPayment(req.body);
    const uniqueId = (0, uuid_1.v4)();
    const paymentInfodata = {
        tran_id: uniqueId,
        cus_name: "xyz",
        cus_email: "example@gmail.com",
        cus_add1: "chittagong",
        cus_city: "chittagong",
        cus_state: "chittagong",
        cus_country: "Bangladesh",
        cus_phone: "123456789",
        productId: productId,
        purchasedProductId: purchasedProductId,
        amount: "100",
    };
    const paymentUrl = yield (0, purchasedProduct_paymentInitialization_1.paymentInitialization)(paymentInfodata);
    console.log();
    res.status(200).json({
        success: true,
        status: 200,
        message: "payment done successfully",
        data: {
            url: (_a = paymentUrl === null || paymentUrl === void 0 ? void 0 : paymentUrl.data) === null || _a === void 0 ? void 0 : _a.payment_url,
            result: result,
        },
    });
}));
const successPayment = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, purchasedProductId } = req.query;
    console.log(productId, purchasedProductId);
    const result = yield purchasedProduct_service_1.purchasedProductService.successPayment(productId, purchasedProductId);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Product purchased successfully",
        data: "result",
    });
}));
const addToCart = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield purchasedProduct_service_1.purchasedProductService.addToCart(req.body);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Product added to cart successfully",
        data: result,
    });
}));
exports.purchasedProductController = {
    successPayment,
    addToCart,
    createPayment,
};
