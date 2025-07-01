// progress.model.ts
import mongoose, { Schema, model } from 'mongoose';
import { IUserProgress } from './progress.interface';

const progressSchema = new Schema<IUserProgress>({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  lectureId: { type: mongoose.Schema.Types.ObjectId, required: true },
  completedAt: { type: Date, default: Date.now },
});

export const UserProgress = model<IUserProgress>('UserProgress', progressSchema);
