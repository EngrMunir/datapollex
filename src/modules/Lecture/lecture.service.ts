import { Lecture } from './lecture.model';
import { ILecture } from './lecture.interface';
import { Types } from 'mongoose';
import { Module } from '../Module/module.model';

const toOid = (v: any): Types.ObjectId | undefined => {
  try {
    return v ? new Types.ObjectId(String(v)) : undefined;
  } catch {
    return undefined;
  }
};

const createLecture = async (payload: ILecture) => {
  try {
    const moduleOid = toOid((payload as any).moduleId);
    const courseOid = toOid((payload as any).courseId);

    if (!moduleOid || !courseOid) {
      throw new Error('courseId and moduleId are required and must be valid ObjectIds');
    }

    const newLecture = await Lecture.create({
      ...payload,
      moduleId: moduleOid,
      courseId: courseOid,
    });

    // Attach to module (avoid duplicates)
    await Module.updateOne(
      { _id: moduleOid },
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
    .populate('courseId', 'title') // {_id, title}
    .populate('moduleId', 'title')
    .sort({ lectureNumber: 1 })
    .lean();
};

/**
 * filters may contain:
 *  - courseId / moduleId (preferred), or
 *  - course / module (legacy)
 */
const getLectures = async (filters: any) => {
  try {
    const query: Record<string, any> = {};

    const c = toOid(filters.courseId ?? filters.course);
    const m = toOid(filters.moduleId ?? filters.module);
    if (c) query.courseId = c;
    if (m) query.moduleId = m;

    const lectures = await Lecture.find(query)
      .populate('courseId', 'title') // only title is needed by UI
      .populate('moduleId', 'title')
      .sort({ lectureNumber: 1 })
      .lean();

    return lectures;
  } catch (err) {
    throw new Error('Error fetching lectures');
  }
};

const updateLecture = async (id: string, data: Partial<ILecture>) => {
  return Lecture.findByIdAndUpdate(id, data, { new: true })
    .populate('courseId', 'title')
    .populate('moduleId', 'title')
    .lean();
};

const deleteLecture = async (id: string) => {
  // Also detach from parent module to keep data consistent
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
