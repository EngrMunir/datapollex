import { z } from 'zod';

export const createLectureValidation = z.object({
  body: z.object({
    moduleId: z.string({ required_error: 'Module ID is required' }),
    title: z.string({ required_error: 'Title is required' }),
    videoUrl: z.string({ required_error: 'Video URL is required' }),
    pdfNotes: z.array(z.string()).optional(),
  }),
});
