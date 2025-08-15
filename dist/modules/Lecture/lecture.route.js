"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LectureRoutes = void 0;
const express_1 = __importDefault(require("express"));
const lecture_controller_1 = require("./lecture.controller");
const auth_1 = __importDefault(require("../../app/middleware/auth"));
const user_constant_1 = require("../User/user.constant");
const validateRequest_1 = __importDefault(require("../../app/middleware/validateRequest"));
const lecture_validation_1 = require("./lecture.validation");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(lecture_validation_1.createLectureValidation), lecture_controller_1.LectureController.createLecture);
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), lecture_controller_1.LectureController.getLectures);
router.get('/:moduleId', lecture_controller_1.LectureController.getLecturesByModule);
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), lecture_controller_1.LectureController.updateLecture);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), lecture_controller_1.LectureController.deleteLecture);
exports.LectureRoutes = router;
