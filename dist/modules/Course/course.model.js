"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = require("mongoose");
const courseSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
}, { timestamps: true });
courseSchema.virtual('modules', {
    ref: 'Module',
    localField: '_id',
    foreignField: 'courseId',
});
courseSchema.set('toObject', { virtuals: true });
courseSchema.set('toJSON', { virtuals: true });
exports.Course = (0, mongoose_1.model)('Course', courseSchema);
