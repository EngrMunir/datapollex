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
const createModule = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingModules = yield module_model_1.Module.find({ courseId: payload.courseId });
    const moduleNumber = existingModules.length + 1;
    const result = yield module_model_1.Module.create({
        courseId: new mongoose_1.Types.ObjectId(payload.courseId),
        title: payload.title,
        moduleNumber,
    });
    return result;
});
const getModulesByCourse = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield module_model_1.Module.find({ courseId }).sort({ moduleNumber: 1 });
});
const updateModule = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield module_model_1.Module.findByIdAndUpdate(id, data, { new: true });
});
const deleteModule = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield module_model_1.Module.findByIdAndDelete(id);
});
exports.ModuleService = {
    createModule,
    getModulesByCourse,
    updateModule,
    deleteModule,
};
