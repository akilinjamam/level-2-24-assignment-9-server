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
exports.productController = void 0;
const tryCatchAsynce_1 = require("../../../shared/tryCatchAsynce");
const products_service_1 = require("./products.service");
const createProduct = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { userType } = req.user;
    if (userType !== "VENDOR") {
        throw new Error("only vendor can create product");
    }
    const images = req === null || req === void 0 ? void 0 : req.files;
    const allImages = (_a = images === null || images === void 0 ? void 0 : images.images) === null || _a === void 0 ? void 0 : _a.map((image) => image === null || image === void 0 ? void 0 : image.path);
    const result = yield products_service_1.productService.createProductService(req.body, allImages);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Product created successfully",
        data: result,
    });
}));
const createManyProduct = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_service_1.productService.createMany(req.body);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Many Products created successfully",
        data: result,
    });
}));
const getProduct = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, from, to } = req.query;
    const result = yield products_service_1.productService.getProductService(category, from, to);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Product retrieved successfully",
        total: result === null || result === void 0 ? void 0 : result.totalData,
        data: result === null || result === void 0 ? void 0 : result.result,
    });
}));
const getProductWithCategory = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, from, to } = req.query;
    const result = yield products_service_1.productService.getProductWithCategory();
    res.status(200).json({
        success: true,
        status: 200,
        message: "Product retrieved successfully",
        data: result,
    });
}));
const getProductWithFlashSale = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, from, to } = req.query;
    const result = yield products_service_1.productService.getProductWithFlashSale();
    res.status(200).json({
        success: true,
        status: 200,
        message: "Product retrieved flash sales successfully",
        data: result,
    });
}));
const getProductWithId = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield products_service_1.productService.getProductWithId(id);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Product retrieved with id successfully",
        data: result,
    });
}));
const getProductWithVendorId = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield products_service_1.productService.getProductWithVendorId(id);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Product retrieved with vendor id successfully",
        data: result,
    });
}));
const updateProduct = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield products_service_1.productService.updateProduct(id, req === null || req === void 0 ? void 0 : req.body);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Product updated with id successfully",
        data: result,
    });
}));
const updateImgProduct = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const images = req === null || req === void 0 ? void 0 : req.files;
    const image = (_a = images === null || images === void 0 ? void 0 : images.images[0]) === null || _a === void 0 ? void 0 : _a.path;
    const { indexId } = req.body;
    const result = yield products_service_1.productService.updateImageProduct(id, image, indexId);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Product image updated with id successfully",
        data: result,
    });
}));
const deleteProduct = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield products_service_1.productService.deleteProduct(id);
    res.status(200).json({
        success: true,
        status: 200,
        message: "Product deleted successfully",
        data: result,
    });
}));
const getLastTenRecentVisitedProducts = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_service_1.productService.getLastTenRecentVisitedProducts();
    res.status(200).json({
        success: true,
        status: 200,
        message: "recent product retrieved successfully",
        data: result,
    });
}));
exports.productController = {
    createProduct,
    getProduct,
    getProductWithCategory,
    getProductWithFlashSale,
    getProductWithId,
    getProductWithVendorId,
    updateProduct,
    updateImgProduct,
    deleteProduct,
    createManyProduct,
    getLastTenRecentVisitedProducts,
};
