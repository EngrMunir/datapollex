import { Schema, model } from 'mongoose';

const courseSchema = new Schema(
  {
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

courseSchema.virtual('modules', {
  ref: 'Module',
  localField: '_id',
  foreignField: 'courseId',
});

courseSchema.set('toObject', { virtuals: true });
courseSchema.set('toJSON', { virtuals: true });


export const Course = model('Course', courseSchema);
