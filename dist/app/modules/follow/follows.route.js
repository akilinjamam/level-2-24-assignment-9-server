"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../../middleware/validateRequest");
const follows_validation_1 = require("./follows.validation");
const follows_controller_1 = require("./follows.controller");
const router = express_1.default.Router();
router.post("/create-follow", (0, validateRequest_1.validateRequest)(follows_validation_1.followSchema.createFollowValidationSchema), follows_controller_1.followController.createFollowController);
router.get("/", follows_controller_1.followController.getFollowController);
exports.followRouter = router;
