"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replayRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../../middleware/validateRequest");
const replay_validation_1 = require("./replay.validation");
const replay_controller_1 = require("./replay.controller");
const router = express_1.default.Router();
router.post("/create-replay", (0, validateRequest_1.validateRequest)(replay_validation_1.replayValidation.replayValidationSchema), replay_controller_1.replayController.createReplayController);
exports.replayRouter = router;
