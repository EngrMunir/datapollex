import { z } from 'zod';

export const createModuleValidation = z.object({
  body: z.object({
    courseId: z.string({ required_error: 'Course ID is required' }),
    title: z.string({ required_error: 'Title is required' }),
  }),
});
