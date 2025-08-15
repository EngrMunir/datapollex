import { Lecture } from './lecture.model';
import { ILecture } from './lecture.interface';
import { Types } from 'mongoose';
import { Module } from '../Module/module.model';

const toOid = (v: any): Types.ObjectId | undefined => {
  try { return v ? new Types.ObjectId(String(v)) : undefined; } catch { return undefined; }
};

const createLecture = async (payload: ILecture) => {
  try {
    const newLecture = await Lecture.create({
      ...payload,                                       // ✅ videoUrl unchanged
      moduleId: new Types.ObjectId(payload.moduleId),
      courseId: new Types.ObjectId(payload.courseId),
    });

    // ✅ keep module.lectures in sync, avoid duplicates
    await Module.updateOne(
      { _id: payload.moduleId },
      { $addToSet: { lectures: newLecture._id } }
    );

    return newLecture;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating and associating lecture with module');
  }
};

const getLecturesByModule = async (moduleId: string) => {
  const m = toOid(moduleId);
  if (!m) throw new Error('Invalid moduleId');

  return Lecture.find({ moduleId: m })
    .populate('courseId')   // full doc if you want; or ', "title"' if you prefer only title
    .populate('moduleId')
    .sort({ lectureNumber: 1 })
    .lean();
};

const getLectures = async (filters: any) => {
  try {
    // ✅ accept both courseId/moduleId (new) and course/module (legacy)
    const query: Record<string, any> = {};
    const c = toOid(filters.courseId ?? filters.course);
    const m = toOid(filters.moduleId ?? filters.module);
    if (c) query.courseId = c;
    if (m) query.moduleId = m;

    const lectures = await Lecture.find(query)
      .populate('courseId')  // keep as-is; your frontend handles populated objects
      .populate('moduleId')
      .sort({ lectureNumber: 1 })
      .lean();

    return lectures;
  } catch (err: any) {
    throw new Error('Error fetching lectures');
  }
};

const updateLecture = async (id: string, data: Partial<ILecture>) => {
  const result = await Lecture.findByIdAndUpdate(id, data, { new: true })
    .populate('courseId')
    .populate('moduleId')
    .lean();
  return result;
};

const deleteLecture = async (id: string) => {
  // ✅ also detach from parent module to keep data consistent
  const deleted = await Lecture.findByIdAndDelete(id).lean();
  if (deleted?.moduleId) {
    await Module.updateOne(
      { _id: deleted.moduleId },
      { $pull: { lectures: deleted._id } }
    );
  }
  return deleted;
};

export const LectureService = {
  createLecture,
  getLecturesByModule,
  getLectures,
  updateLecture,
  deleteLecture,
};
