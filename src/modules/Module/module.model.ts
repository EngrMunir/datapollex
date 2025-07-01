import { Schema, model } from 'mongoose';
import { IModule } from './module.interface';

const moduleSchema = new Schema<IModule>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    moduleNumber: { type: Number, required: true },
  },
  { timestamps: true }
);
moduleSchema.virtual('lectures', {
  ref: 'Lecture',
  localField: '_id',
  foreignField: 'moduleId',
});

moduleSchema.set('toObject', { virtuals: true });
moduleSchema.set('toJSON', { virtuals: true });

export const Module = model<IModule>('Module', moduleSchema);
