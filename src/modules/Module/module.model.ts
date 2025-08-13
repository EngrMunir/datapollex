import { Schema, model } from 'mongoose';
import { IModule } from './module.interface';

const moduleSchema = new Schema<IModule>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    moduleNumber: { type: Number, required: true },
    lectures: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'Lecture'
    }]
  },
  { timestamps: true }
);

export const Module = model<IModule>('Module', moduleSchema);
