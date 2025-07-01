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
exports.EnrollmentController = exports.enrollCourse = void 0;
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const enrollment_modal_1 = require("./enrollment.modal");
const catchAsync_1 = require("../../app/utils/catchAsync");
const enrollCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const { courseId } = req.body;
    let enrollment = yield enrollment_modal_1.Enrollment.findOne({ userId });
    if (enrollment) {
        // Check if course is already enrolled
        if (enrollment.courseIds.includes(courseId)) {
            return (0, sendResponse_1.default)(res, {
                statusCode: http_status_1.default.CONFLICT,
                success: false,
                message: 'Already enrolled in this course',
            });
        }
        // Add courseId to courseIds array
        enrollment.courseIds.push(courseId);
        yield enrollment.save();
    }
    else {
        // First time enrollment
        enrollment = yield enrollment_modal_1.Enrollment.create({ userId, courseIds: [courseId] });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Enrolled successfully',
        data: enrollment,
    });
});
exports.enrollCourse = enrollCourse;
const getMyEnrollments = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    // Fetch enrollment for the user and populate courseIds with full course data
    const enrollment = yield enrollment_modal_1.Enrollment.findOne({ userId })
        .populate({
        path: 'courseIds',
        populate: {
            path: 'modules',
            model: 'Module',
            populate: {
                path: 'lectures',
                model: 'Lecture'
            }
        }
    });
    // If no enrollment found, return empty list
    const enrolledCourses = (enrollment === null || enrollment === void 0 ? void 0 : enrollment.courseIds) || [];
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Enrolled courses fetched successfully',
        data: enrolledCourses,
    });
}));
exports.EnrollmentController = { enrollCourse: exports.enrollCourse, getMyEnrollments };
