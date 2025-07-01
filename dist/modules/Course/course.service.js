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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const course_model_1 = require("./course.model");
const module_model_1 = require("../Module/module.model");
const lecture_model_1 = require("../Lecture/lecture.model");
const createCourse = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield course_model_1.Course.create(data);
});
const getAllCourses = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield course_model_1.Course.find().sort({ createdAt: -1 });
});
const getSingleCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield course_model_1.Course.findById(id);
});
const updateCourse = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield course_model_1.Course.findByIdAndUpdate(id, data, { new: true });
});
const deleteCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield course_model_1.Course.findByIdAndDelete(id);
});
const getCourseDetailWithModules = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.Course.findById(courseId);
    if (!course)
        throw new Error('Course not found');
    const modules = yield module_model_1.Module.find({ courseId }).sort({ moduleNumber: 1 });
    const moduleIds = modules.map((m) => m._id);
    const lectures = yield lecture_model_1.Lecture.find({ moduleId: { $in: moduleIds } });
    // Group lectures by moduleId
    const moduleWithLectures = modules.map((mod) => (Object.assign(Object.assign({}, mod.toObject()), { lectures: lectures
            .filter((lec) => lec.moduleId.toString() === mod._id.toString())
            .sort((a, b) => { var _a, _b; return ((_a = a.createdAt) === null || _a === void 0 ? void 0 : _a.getTime()) - ((_b = b.createdAt) === null || _b === void 0 ? void 0 : _b.getTime()); }) })));
    return Object.assign(Object.assign({}, course.toObject()), { modules: moduleWithLectures });
});
exports.CourseService = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    updateCourse,
    deleteCourse,
    getCourseDetailWithModules
};
