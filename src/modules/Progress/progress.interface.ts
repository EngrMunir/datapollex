import { Types } from 'mongoose';

export interface IUserProgress {
  _id?: string;
  userId: Types.ObjectId;
  lectureId: Types.ObjectId;
  completedAt?: Date;
}