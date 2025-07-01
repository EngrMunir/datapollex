"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressController = void 0;
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const progress_service_1 = require("./progress.service");
const catchAsync_1 = require("../../app/utils/catchAsync");
const markLectureComplete = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!req.user || !req.user._id) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const { lectureId } = req.body;
    const result = yield progress_service_1.ProgressService.markLectureComplete(userId, lectureId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Lecture marked as completed',
        data: result,
    });
}));
const getCompletedLectures = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!req.user || !req.user._id) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const lectureIds = req.body.lectureIds; // client sends all lectures from course
    const result = yield progress_service_1.ProgressService.getCompletedLecturesByCourse(userId, lectureIds);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Completed lectures fetched',
        data: result,
    });
}));
exports.ProgressController = {
    markLectureComplete,
    getCompletedLectures
};
