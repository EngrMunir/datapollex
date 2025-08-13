import { Lecture } from './lecture.model';
import { ILecture } from './lecture.interface';
import { Types } from 'mongoose';
import { Module } from '../Module/module.model';

// Create a new lecture and associate it with a module, and update the module's `lectures` array
const createLecture = async (payload: ILecture) => {
  try {
    // Step 1: Create the new lecture and associate it with the module using moduleId
    const newLecture = await Lecture.create({
      ...payload,
      moduleId: new Types.ObjectId(payload.moduleId), // Convert moduleId to ObjectId
      courseId: new Types.ObjectId(payload.courseId),  // Convert courseId to ObjectId
    });

    // Step 2: Find the module by moduleId and add the new lecture ID to the `lectures` field
    const module = await Module.findById(payload.moduleId);
    if (!module) {
      throw new Error('Module not found');
    }

    // Add the new lecture's ID to the module's `lectures` array
    module.lectures.push(newLecture._id);

    // Step 3: Save the updated module with the new lecture ID added
    await module.save();

    return newLecture; // Return the created lecture
  } catch (error) {
    console.error(error);
    throw new Error('Error creating and associating lecture with module');
  }
};

const getLecturesByModule = async (moduleId: string) => {
  return await Lecture.find({ moduleId }).sort({ lectureNumber: 1 });
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
