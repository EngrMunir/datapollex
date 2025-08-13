import { Types } from 'mongoose';

export interface ILecture {
  courseId: Types.ObjectId;
  moduleId: Types.ObjectId;
  title: string;
  lectureNumber: number; 
  videoUrl: string;
  pdfNotes: string[];
  createdAt?: Date;
  updatedAt?: Date;
}