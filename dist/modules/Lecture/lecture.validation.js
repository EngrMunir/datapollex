"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLectureValidation = void 0;
const zod_1 = require("zod");
exports.createLectureValidation = zod_1.z.object({
    body: zod_1.z.object({
        moduleId: zod_1.z.string({ required_error: 'Module ID is required' }),
        title: zod_1.z.string({ required_error: 'Title is required' }),
        videoUrl: zod_1.z.string({ required_error: 'Video URL is required' }),
        pdfNotes: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
