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
exports.vendorController = void 0;
const tryCatchAsynce_1 = require("../../../shared/tryCatchAsynce");
const vendor_service_1 = require("./vendor.service");
const createVendorController = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { userType, userId } = req.user;
    if (userType !== "VENDOR") {
        throw new Error("only vendor can create product");
    }
    const images = req === null || req === void 0 ? void 0 : req.files;
    const image = (_a = images === null || images === void 0 ? void 0 : images.images[0]) === null || _a === void 0 ? void 0 : _a.path;
    const result = yield vendor_service_1.vendorService.createVendor(req.body, image, userId);
    res.status(201).json({
        success: true,
        status: 201,
        message: "Vendor created successfully",
        data: result,
    });
}));
const getVendorController = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vendor_service_1.vendorService.getAllVendor();
    res.status(201).json({
        success: true,
        status: 201,
        message: "Vendor found successfully",
        data: result,
    });
}));
const getVendorWithController = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vendor_service_1.vendorService.getAllVendorWithId(req.params.id);
    res.status(201).json({
        success: true,
        status: 201,
        message: "Vendor id found successfully",
        data: result,
    });
}));
const getVendorWithUserIdController = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vendor_service_1.vendorService.getAllVendorWithUserId(req.params.id);
    res.status(201).json({
        success: true,
        status: 201,
        message: "Vendor id found with user-id successfully",
        data: result,
    });
}));
const updateVendorController = (0, tryCatchAsynce_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vendor_service_1.vendorService.updateVendor(req.params.id, req.body);
    res.status(201).json({
        success: true,
        status: 201,
        message: "Vendor updated successfully",
        data: result,
    });
}));
exports.vendorController = {
    createVendorController,
    getVendorController,
    getVendorWithController,
    getVendorWithUserIdController,
    updateVendorController,
};
