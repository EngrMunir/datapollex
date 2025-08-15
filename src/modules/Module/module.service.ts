import { Module } from './module.model';
import { IModule } from './module.interface';
import { Types, isValidObjectId } from 'mongoose';
import { Course } from '../Course/course.model';

const toOid = (id: string) =>
  isValidObjectId(id) ? new Types.ObjectId(id) : undefined;

const createModule = async (payload: { courseId: string; title: string }) => {
  const courseOid = toOid(payload.courseId);
  if (!courseOid) throw new Error('Invalid courseId');

  // safer than .find().length in concurrent scenarios
  const count = await Module.countDocuments({ courseId: courseOid });
  const moduleNumber = count + 1;

  const result = await Module.create({
    courseId: courseOid,
    title: payload.title,
    moduleNumber,
  });

  // keep Course.modules synced; avoid duplicates
  await Course.updateOne({ _id: courseOid }, { $addToSet: { modules: result._id } });

  return result;
};

const getModulesByCourse = async (courseId: string) => {
  const c = toOid(courseId);
  if (!c) throw new Error('Invalid courseId');

  return Module.find({ courseId: c })
    .select('_id title courseId moduleNumber')
    .sort({ moduleNumber: 1 })
    .lean();
};

// UPDATED: supports /modules?courseId=<id> (server-side filtering)
const getAllModule = async (courseId?: string) => {
  const filter: Record<string, any> = {};
  if (courseId) {
    const c = toOid(courseId);
    if (!c) throw new Error('Invalid courseId');
    filter.courseId = c;
  }

  return Module.find(filter)
    .select('_id title courseId moduleNumber')
    .sort({ moduleNumber: 1, createdAt: -1 })
    .lean();
};

const updateModule = async (id: string, data: Partial<IModule>) => {
  return Module.findByIdAndUpdate(id, data, { new: true })
    .select('_id title courseId moduleNumber')
    .lean();
};

const deleteModule = async (id: string) => {
  // also detach from Course.modules to keep data consistent
  const deleted = await Module.findByIdAndDelete(id).lean();
  if (deleted?.courseId) {
    await Course.updateOne(
      { _id: deleted.courseId },
      { $pull: { modules: deleted._id } }
    );
  }
  return deleted;
};

export const ModuleService = {
  createModule,
  getModulesByCourse,
  getAllModule,
  updateModule,
  deleteModule,
};
