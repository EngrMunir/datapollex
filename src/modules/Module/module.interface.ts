import { Types } from 'mongoose';

export interface IModule {
  _id?: string;
  courseId: Types.ObjectId;
  title: string;
  moduleNumber: number;
  lectures: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
 