import { Types } from 'mongoose';

export interface IModule {
  _id?: string;
  courseId: Types.ObjectId;
  title: string;
  moduleNumber: number;
  createdAt?: Date;
  updatedAt?: Date;
}
