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
const auth_1 = __importDefault(require("../../../auth/auth"));
const sendImgToCloudinary_1 = require("../../sendImgToCloudinary/sendImgToCloudinary");
const router = express_1.default.Router();
router.post("/create-vendor", (0, auth_1.default)(), sendImgToCloudinary_1.upload.fields([{ name: "images" }]), (req, _response, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.validateRequest)(vendor_validation_1.vendorSchema.createvendorValidationSchema), vendor_controller_1.vendorController.createVendorController);
router.get("/", vendor_controller_1.vendorController.getVendorController);
router.get("/get-with-id/:id", vendor_controller_1.vendorController.getVendorWithController);
router.get("/get-with-user-id/:id", vendor_controller_1.vendorController.getVendorWithUserIdController);
router.patch("/update-vendor/:id", vendor_controller_1.vendorController.updateVendorController);
router.patch("/update-vendor-img/:id", (0, auth_1.default)(), sendImgToCloudinary_1.upload.fields([{ name: "images" }]), vendor_controller_1.vendorController.updateVendorImgController);
exports.vendorRouter = router;
