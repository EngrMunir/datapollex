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
const toOid = (v) => {
    try {
        return v ? new mongoose_1.Types.ObjectId(String(v)) : undefined;
    }
    catch (_a) {
        return undefined;
    }
};
const createLecture = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newLecture = yield lecture_model_1.Lecture.create(Object.assign(Object.assign({}, payload), { moduleId: new mongoose_1.Types.ObjectId(payload.moduleId), courseId: new mongoose_1.Types.ObjectId(payload.courseId) }));
        // ✅ keep module.lectures in sync, avoid duplicates
        yield module_model_1.Module.updateOne({ _id: payload.moduleId }, { $addToSet: { lectures: newLecture._id } });
        return newLecture;
    }
    catch (error) {
        console.error(error);
        throw new Error('Error creating and associating lecture with module');
    }
});
const getLecturesByModule = (moduleId) => __awaiter(void 0, void 0, void 0, function* () {
    const m = toOid(moduleId);
    if (!m)
        throw new Error('Invalid moduleId');
    return lecture_model_1.Lecture.find({ moduleId: m })
        .populate('courseId') // full doc if you want; or ', "title"' if you prefer only title
        .populate('moduleId')
        .sort({ lectureNumber: 1 })
        .lean();
});
const getLectures = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // ✅ accept both courseId/moduleId (new) and course/module (legacy)
        const query = {};
        const c = toOid((_a = filters.courseId) !== null && _a !== void 0 ? _a : filters.course);
        const m = toOid((_b = filters.moduleId) !== null && _b !== void 0 ? _b : filters.module);
        if (c)
            query.courseId = c;
        if (m)
            query.moduleId = m;
        const lectures = yield lecture_model_1.Lecture.find(query)
            .populate('courseId') // keep as-is; your frontend handles populated objects
            .populate('moduleId')
            .sort({ lectureNumber: 1 })
            .lean();
        return lectures;
    }
    catch (err) {
        throw new Error('Error fetching lectures');
    }
});
const updateLecture = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield lecture_model_1.Lecture.findByIdAndUpdate(id, data, { new: true })
        .populate('courseId')
        .populate('moduleId')
        .lean();
    return result;
});
const deleteLecture = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // ✅ also detach from parent module to keep data consistent
    const deleted = yield lecture_model_1.Lecture.findByIdAndDelete(id).lean();
    if (deleted === null || deleted === void 0 ? void 0 : deleted.moduleId) {
        yield module_model_1.Module.updateOne({ _id: deleted.moduleId }, { $pull: { lectures: deleted._id } });
    }
    return deleted;
});
exports.LectureService = {
    createLecture,
    getLecturesByModule,
    getLectures,
    updateLecture,
    deleteLecture,
};
