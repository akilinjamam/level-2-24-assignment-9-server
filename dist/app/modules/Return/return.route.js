"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../../middleware/validateRequest");
const return_validation_1 = require("./return.validation");
const return_controller_1 = require("./return.controller");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.validateRequest)(return_validation_1.returnSchema.createReturnSchema), return_controller_1.returnController.createReturn);
exports.returnRouter = router;
