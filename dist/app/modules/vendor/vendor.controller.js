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
    const result = yield vendor_service_1.vendorService.createVendor(req.body);
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
exports.vendorController = {
    createVendorController,
    getVendorController,
    getVendorWithController,
};
