"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentRoutes = void 0;
// routes/enrollment.route.ts
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../app/middleware/auth"));
const user_constant_1 = require("../User/user.constant");
const enrollment_controller_1 = require("./enrollment.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.user), enrollment_controller_1.EnrollmentController.enrollCourse);
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.user), enrollment_controller_1.EnrollmentController.getMyEnrollments);
router.get('/enrolledCourse', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), enrollment_controller_1.EnrollmentController.enrolledCourse);
exports.EnrollmentRoutes = router;
