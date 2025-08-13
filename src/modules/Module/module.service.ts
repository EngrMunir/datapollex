import { Module } from './module.model';
import { IModule } from './module.interface';
import { Types } from 'mongoose';
import { Course } from '../Course/course.model';

const createModule = async (payload: { courseId: string; title: string }) => {
  const existingModules = await Module.find({ courseId: payload.courseId });
  const moduleNumber = existingModules.length + 1;

  const result = await Module.create({
    courseId: new Types.ObjectId(payload.courseId),
    title: payload.title,
    moduleNumber,
  });
  // Step 2: Find the module by moduleId and add the new lecture ID to the `lectures` field
    const course = await Course.findById(payload.courseId);
    if (!course) {
      throw new Error('Course not found');
    }

    // Add the new lecture's ID to the module's `lectures` array
    course.modules.push(new Types.ObjectId(result._id));

    // Step 3: Save the updated module with the new lecture ID added
    await course.save();

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
