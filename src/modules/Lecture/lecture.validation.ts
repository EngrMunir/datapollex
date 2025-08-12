import { z } from 'zod';

export const createLectureValidation = z.object({
  body: z.object({
    courseId: z.string({ required_error: 'Course ID is required' }),
    moduleId: z.string({ required_error: 'Module ID is required' }),
    lectureNumber: z.number({ required_error: 'Lecture Number is required' }),
    title: z.string({ required_error: 'Title is required' }),
    videoUrl: z.string({ required_error: 'Video URL is required' }),
    pdfNotes: z.array(z.string()).optional(),
  }),
});
