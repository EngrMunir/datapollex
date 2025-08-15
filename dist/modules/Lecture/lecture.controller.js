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
exports.LectureController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const lecture_service_1 = require("./lecture.service");
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const catchAsync_1 = require("../../app/utils/catchAsync");
const createLecture = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield lecture_service_1.LectureService.createLecture(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Lecture created successfully',
        data: result,
    });
}));
const getLecturesByModule = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield lecture_service_1.LectureService.getLecturesByModule(req.params.moduleId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Lectures fetched successfully',
        data: result,
    });
}));
const getLectures = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { course, module } = req.query;
    const filters = {};
    if (course)
        filters.course = course;
    if (module)
        filters.module = module;
    const result = yield lecture_service_1.LectureService.getLectures(filters);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Lectures fetched successfully',
        data: result,
    });
}));
const updateLecture = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield lecture_service_1.LectureService.updateLecture(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Lecture updated successfully',
        data: result,
    });
}));
const deleteLecture = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield lecture_service_1.LectureService.deleteLecture(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Lecture deleted successfully',
        data: result,
    });
}));
exports.LectureController = {
    createLecture,
    getLecturesByModule,
    getLectures,
    updateLecture,
    deleteLecture,
};
