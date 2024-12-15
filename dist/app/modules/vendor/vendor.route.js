"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorRouter = void 0;
const validateRequest_1 = require("../../../middleware/validateRequest");
const vendor_controller_1 = require("./vendor.controller");
const express_1 = __importDefault(require("express"));
const vendor_validation_1 = require("./vendor.validation");
const router = express_1.default.Router();
router.post("/create-vendor", (0, validateRequest_1.validateRequest)(vendor_validation_1.vendorSchema.createvendorValidationSchema), vendor_controller_1.vendorController.createVendorController);
router.get("/", vendor_controller_1.vendorController.getVendorController);
exports.vendorRouter = router;
