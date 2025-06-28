// progress.model.ts
import { Schema, model } from 'mongoose';

const progressSchema = new Schema<IUserProgress>({
  userId: { type: String, required: true },
  lectureId: { type: String, required: true },
  completedAt: { type: Date, default: Date.now },
});

export const UserProgress = model<IUserProgress>('UserProgress', progressSchema);
