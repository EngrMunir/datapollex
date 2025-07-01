"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const user_constant_1 = require("../User/user.constant");
const auth_1 = __importDefault(require("../../app/middleware/auth"));
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../app/middleware/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const router = (0, express_1.Router)();
router.post('/logout', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.user), auth_controller_1.AuthControllers.logoutUser);
router.post('/register', (0, validateRequest_1.default)(auth_validation_1.AuthValidations.registerUserValidationSchema), auth_controller_1.AuthControllers.registerUser);
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidations.loginValidationSchema), auth_controller_1.AuthControllers.loginUser);
router.post('/refresh-token', (0, validateRequest_1.default)(auth_validation_1.AuthValidations.refreshTokenValidationSchema), auth_controller_1.AuthControllers.refreshToken);
exports.AuthRoutes = router;
