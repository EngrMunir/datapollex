import { Lecture } from './lecture.model';
import { ILecture } from './lecture.interface';
import { Types } from 'mongoose';

const createLecture = async (payload: ILecture) => {
  return await Lecture.create({
    ...payload,
    moduleId: new Types.ObjectId(payload.moduleId),
  });
};

const getLecturesByModule = async (moduleId: string) => {
  return await Lecture.find({ moduleId }).sort({ createdAt: 1 });
};

const updateLecture = async (id: string, data: Partial<ILecture>) => {
  return await Lecture.findByIdAndUpdate(id, data, { new: true });
};

const deleteLecture = async (id: string) => {
  return await Lecture.findByIdAndDelete(id);
};

export const LectureService = {
  createLecture,
  getLecturesByModule,
  updateLecture,
  deleteLecture,
};
