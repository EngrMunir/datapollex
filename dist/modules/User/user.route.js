"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../app/middleware/auth"));
const user_constant_1 = require("./user.constant");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
// router.get(
//   '/me',
//   auth(USER_ROLE.admin, USER_ROLE.user),
//   UserController.getMyProfile
// );
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.UserController.getAllUsers);
router.patch('/:id/role', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.UserController.updateUserRole);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.UserController.deleteUser);
exports.UserRoutes = router;
