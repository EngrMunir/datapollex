import { Module } from './module.model';
import { IModule } from './module.interface';
import { Types } from 'mongoose';

const createModule = async (payload: { courseId: string; title: string }) => {
  const existingModules = await Module.find({ courseId: payload.courseId });
  const moduleNumber = existingModules.length + 1;

  const result = await Module.create({
    courseId: new Types.ObjectId(payload.courseId),
    title: payload.title,
    moduleNumber,
  });

  return result;
};

const getModulesByCourse = async (courseId: string) => {
  return await Module.find({ courseId }).sort({ moduleNumber: 1 });
};

const updateModule = async (id: string, data: Partial<IModule>) => {
  return await Module.findByIdAndUpdate(id, data, { new: true });
};

const deleteModule = async (id: string) => {
  return await Module.findByIdAndDelete(id);
};

export const ModuleService = {
  createModule,
  getModulesByCourse,
  updateModule,
  deleteModule,
};
