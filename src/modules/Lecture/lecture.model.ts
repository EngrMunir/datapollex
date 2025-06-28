import { Schema, model } from 'mongoose';
import { ILecture } from './lecture.interface';

const lectureSchema = new Schema<ILecture>(
  {
    moduleId: { type: Schema.Types.ObjectId, ref: 'Module', required: true },
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    pdfNotes: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Lecture = model<ILecture>('Lecture', lectureSchema);
