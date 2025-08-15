"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const module_controller_1 = require("./module.controller");
const auth_1 = __importDefault(require("../../app/middleware/auth"));
const user_constant_1 = require("../User/user.constant");
const validateRequest_1 = __importDefault(require("../../app/middleware/validateRequest"));
const module_validation_1 = require("./module.validation");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(module_validation_1.createModuleValidation), module_controller_1.ModuleController.createModule);
router.get('/', module_controller_1.ModuleController.getAllModule);
router.get('/:courseId', module_controller_1.ModuleController.getModulesByCourse);
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), module_controller_1.ModuleController.updateModule);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), module_controller_1.ModuleController.deleteModule);
exports.ModuleRoutes = router;
