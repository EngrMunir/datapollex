"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lecture = void 0;
const mongoose_1 = require("mongoose");
const lectureSchema = new mongoose_1.Schema({
    moduleId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Module', required: true },
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    pdfNotes: { type: [String], default: [] },
}, { timestamps: true });
exports.Lecture = (0, mongoose_1.model)('Lecture', lectureSchema);
