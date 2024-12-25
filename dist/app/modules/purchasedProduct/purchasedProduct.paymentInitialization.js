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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentInitialization = void 0;
const axios_1 = __importDefault(require("axios"));
const paymentInitialization = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = "https://sandbox.aamarpay.com/jsonpost.php";
        const result = yield axios_1.default.post(url, {
            store_id: "aamarpaytest",
            tran_id: data.tran_id,
            success_url: `https://level-2-24-assignment-9-server.vercel.app/api/purchaseProducts/success-payment?productId=${data === null || data === void 0 ? void 0 : data.productId}&purchasedProductId=${data === null || data === void 0 ? void 0 : data.purchasedProductId}`,
            fail_url: `https://level-2-24-assignment-6-server.vercel.app/api/payment/failed-payment`,
            cancel_url: `https://level-2-24-assignment-6-server.vercel.app/api/payment/failed-payment`,
            amount: data === null || data === void 0 ? void 0 : data.amount,
            currency: "BDT",
            signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
            desc: "Merchant Registration Payment",
            cus_name: data.cus_name,
            cus_email: data.cus_email,
            cus_add1: data.cus_add1,
            cus_add2: "Mohakhali DOHS",
            cus_city: data.cus_city,
            cus_state: data.cus_state,
            cus_postcode: "1206",
            cus_country: data.cus_country,
            cus_phone: data.cus_phone,
            type: "json",
        });
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
exports.paymentInitialization = paymentInitialization;
