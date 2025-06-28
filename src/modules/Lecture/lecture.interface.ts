import { Types } from 'mongoose';

export interface ILecture {
  _id?: string;
  moduleId: Types.ObjectId;
  title: string;
  videoUrl: string;
  pdfNotes: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
