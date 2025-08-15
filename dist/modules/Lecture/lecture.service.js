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
exports.LectureService = void 0;
const lecture_model_1 = require("./lecture.model");
const mongoose_1 = require("mongoose");
const module_model_1 = require("../Module/module.model");
const createLecture = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newLecture = yield lecture_model_1.Lecture.create(Object.assign(Object.assign({}, payload), { moduleId: new mongoose_1.Types.ObjectId(payload.moduleId), courseId: new mongoose_1.Types.ObjectId(payload.courseId) }));
        const module = yield module_model_1.Module.findById(payload.moduleId);
        if (!module) {
            throw new Error('Module not found');
        }
        module.lectures.push(newLecture._id);
        yield module.save();
        return newLecture;
    }
    catch (error) {
        console.error(error);
        throw new Error('Error creating and associating lecture with module');
    }
});
const getLecturesByModule = (moduleId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield lecture_model_1.Lecture.find({ moduleId }).sort({ lectureNumber: 1 });
});
const getLectures = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lectures = yield lecture_model_1.Lecture.find(filters)
            .populate('courseId')
            .populate('moduleId')
            .sort({ lectureNumber: 1 });
        return lectures;
    }
    catch (err) {
        throw new Error('Error fetching lectures: ');
    }
});
const updateLecture = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield lecture_model_1.Lecture.findByIdAndUpdate(id, data, { new: true });
    return result;
});
const deleteLecture = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield lecture_model_1.Lecture.findByIdAndDelete(id);
});
exports.LectureService = {
    createLecture,
    getLecturesByModule,
    getLectures,
    updateLecture,
    deleteLecture,
};
