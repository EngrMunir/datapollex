"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enrollment = void 0;
// models/enrollment.model.ts
const mongoose_1 = require("mongoose");
const enrollmentSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    courseIds: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Course' }],
}, { timestamps: true });
exports.Enrollment = (0, mongoose_1.model)('Enrollment', enrollmentSchema);
