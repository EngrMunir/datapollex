"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModuleValidation = void 0;
const zod_1 = require("zod");
exports.createModuleValidation = zod_1.z.object({
    body: zod_1.z.object({
        courseId: zod_1.z.string({ required_error: 'Course ID is required' }),
        title: zod_1.z.string({ required_error: 'Title is required' }),
    }),
});
