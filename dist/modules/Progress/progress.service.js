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
exports.ProgressService = void 0;
const progress_model_1 = require("./progress.model");
const markLectureComplete = (userId, lectureId) => __awaiter(void 0, void 0, void 0, function* () {
    const alreadyCompleted = yield progress_model_1.UserProgress.findOne({ userId, lectureId });
    if (alreadyCompleted)
        return alreadyCompleted;
    return yield progress_model_1.UserProgress.create({ userId, lectureId });
});
const getCompletedLecturesByCourse = (userId, lectureIds) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield progress_model_1.UserProgress.find({
        userId,
        lectureId: { $in: lectureIds },
    });
    return result.map(item => item.lectureId);
});
exports.ProgressService = {
    markLectureComplete,
    getCompletedLecturesByCourse,
};
