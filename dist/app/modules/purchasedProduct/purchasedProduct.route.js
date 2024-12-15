"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchasedProductRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../../middleware/validateRequest");
const purchasedProduct_validation_1 = require("./purchasedProduct.validation");
const purchasedProduct_controller_1 = require("./purchasedProduct.controller");
const router = express_1.default.Router();
router.post("/create-payment", purchasedProduct_controller_1.purchasedProductController.createPayment);
router.post("/success-payment", purchasedProduct_controller_1.purchasedProductController.successPayment);
router.post("/add-to-cart", (0, validateRequest_1.validateRequest)(purchasedProduct_validation_1.purchasedProductSchema.createPurchasedProductSchema), purchasedProduct_controller_1.purchasedProductController.addToCart);
exports.purchasedProductRouter = router;
