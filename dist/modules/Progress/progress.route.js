"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../app/middleware/auth"));
const progress_controller_1 = require("./progress.controller");
const router = express_1.default.Router();
router.post('/complete', (0, auth_1.default)(), progress_controller_1.ProgressController.markLectureComplete);
router.post('/list', (0, auth_1.default)(), progress_controller_1.ProgressController.getCompletedLectures);
exports.ProgressRoutes = router;
