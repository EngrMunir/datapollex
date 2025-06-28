import { z } from 'zod';

export const createCourseValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    thumbnail: z.string({ required_error: 'Thumbnail is required' }),
    price: z.number({ required_error: 'Price is required' }),
    description: z.string({ required_error: 'Description is required' }),
  }),
});
