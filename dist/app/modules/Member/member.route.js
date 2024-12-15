"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../../middleware/validateRequest");
const member_validation_1 = require("./member.validation");
const member_controller_1 = require("./member.controller");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.validateRequest)(member_validation_1.memberSchema.createMemberSchema), member_controller_1.memberController.createMember);
router.get("/", member_controller_1.memberController.getMember);
router.get("/:memberId", member_controller_1.memberController.getMemberByMemberId);
router.put("/:memberId", (0, validateRequest_1.validateRequest)(member_validation_1.memberSchema.updateMemberSchema), member_controller_1.memberController.updateMemberByMemberId);
router.delete("/:memberId", member_controller_1.memberController.deleteMemberByMemberId);
exports.memberRouter = router;
