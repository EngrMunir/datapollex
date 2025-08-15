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
exports.ModuleService = void 0;
const module_model_1 = require("./module.model");
const mongoose_1 = require("mongoose");
const course_model_1 = require("../Course/course.model");
const toOid = (id) => (0, mongoose_1.isValidObjectId)(id) ? new mongoose_1.Types.ObjectId(id) : undefined;
const createModule = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const courseOid = toOid(payload.courseId);
    if (!courseOid)
        throw new Error('Invalid courseId');
    // safer than .find().length in concurrent scenarios
    const count = yield module_model_1.Module.countDocuments({ courseId: courseOid });
    const moduleNumber = count + 1;
    const result = yield module_model_1.Module.create({
        courseId: courseOid,
        title: payload.title,
        moduleNumber,
    });
    // keep Course.modules synced; avoid duplicates
    yield course_model_1.Course.updateOne({ _id: courseOid }, { $addToSet: { modules: result._id } });
    return result;
});
const getModulesByCourse = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const c = toOid(courseId);
    if (!c)
        throw new Error('Invalid courseId');
    return module_model_1.Module.find({ courseId: c })
        .select('_id title courseId moduleNumber')
        .sort({ moduleNumber: 1 })
        .lean();
});
// UPDATED: supports /modules?courseId=<id> (server-side filtering)
const getAllModule = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    if (courseId) {
        const c = toOid(courseId);
        if (!c)
            throw new Error('Invalid courseId');
        filter.courseId = c;
    }
    return module_model_1.Module.find(filter)
        .select('_id title courseId moduleNumber')
        .sort({ moduleNumber: 1, createdAt: -1 })
        .lean();
});
const updateModule = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return module_model_1.Module.findByIdAndUpdate(id, data, { new: true })
        .select('_id title courseId moduleNumber')
        .lean();
});
const deleteModule = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // also detach from Course.modules to keep data consistent
    const deleted = yield module_model_1.Module.findByIdAndDelete(id).lean();
    if (deleted === null || deleted === void 0 ? void 0 : deleted.courseId) {
        yield course_model_1.Course.updateOne({ _id: deleted.courseId }, { $pull: { modules: deleted._id } });
    }
    return deleted;
});
exports.ModuleService = {
    createModule,
    getModulesByCourse,
    getAllModule,
    updateModule,
    deleteModule,
};
