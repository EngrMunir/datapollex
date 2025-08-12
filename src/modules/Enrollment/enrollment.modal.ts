// models/enrollment.model.ts
import { Schema, model } from 'mongoose';

const enrollmentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    courseIds: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  },
  { timestamps: true }
);

export const Enrollment = model('Enrollment', enrollmentSchema);
