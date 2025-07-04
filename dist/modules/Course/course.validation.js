"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourseValidation = void 0;
const zod_1 = require("zod");
exports.createCourseValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is required' }),
        thumbnail: zod_1.z.string({ required_error: 'Thumbnail is required' }),
        price: zod_1.z.number({ required_error: 'Price is required' }),
        description: zod_1.z.string({ required_error: 'Description is required' }),
    }),
});
