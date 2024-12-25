"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../../middleware/validateRequest");
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../../auth/auth"));
const router = express_1.default.Router();
router.post("/create-user", (0, validateRequest_1.validateRequest)(user_validation_1.userSchema.createUserValidationSchema), user_controller_1.userController.createUserController);
router.post("/create-user-login", (0, validateRequest_1.validateRequest)(user_validation_1.userSchema.createUserLoginValidationSchema), user_controller_1.userController.createUserLoginController);
router.post("/change-password", (0, auth_1.default)(), (0, validateRequest_1.validateRequest)(user_validation_1.userSchema.createChangePasswordValidationSchema), user_controller_1.userController.changePasswordController);
router.post("/sent-email", (0, validateRequest_1.validateRequest)(user_validation_1.userSchema.createResetPasswordValidationSchema), user_controller_1.userController.resetPasswordController);
router.post("/reset-password", (0, validateRequest_1.validateRequest)(user_validation_1.userSchema.resetPasswordValidationSchema), user_controller_1.userController.recoveryPasswordController);
exports.userRouter = router;
