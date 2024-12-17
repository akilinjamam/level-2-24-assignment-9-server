"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../../middleware/validateRequest");
const product_validation_1 = require("./product.validation");
const products_controller_1 = require("./products.controller");
const sendImgToCloudinary_1 = require("../../sendImgToCloudinary/sendImgToCloudinary");
const auth_1 = __importDefault(require("../../../auth/auth"));
const router = express_1.default.Router();
router.post("/create-product", (0, auth_1.default)(), sendImgToCloudinary_1.upload.fields([{ name: "images" }]), (req, _response, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.validateRequest)(product_validation_1.productSchema.createProductSchema), products_controller_1.productController.createProduct);
router.get("/", products_controller_1.productController.getProduct);
router.get("/get-with-category", products_controller_1.productController.getProductWithCategory);
router.get("/get-with-flashSale", products_controller_1.productController.getProductWithFlashSale);
router.get("/get-with-id/:id", products_controller_1.productController.getProductWithId);
router.get("/update-with-id/:id", products_controller_1.productController.updateProduct);
exports.productRouter = router;
