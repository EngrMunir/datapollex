import { Course } from './course.model';
import { ICourse } from './course.interface';
import { Module } from '../Module/module.model';
import { Lecture } from '../Lecture/lecture.model';

const createCourse = async (data: ICourse) => {
  return await Course.create(data);
};

const getAllCourses = async () => {
  return await Course.find().sort({ createdAt: -1 });
};

const getSingleCourse = async (id: string) => {
  return await Course.findById(id);
};

const updateCourse = async (id: string, data: Partial<ICourse>) => {
  return await Course.findByIdAndUpdate(id, data, { new: true });
};

const deleteCourse = async (id: string) => {
  return await Course.findByIdAndDelete(id);
};


const getCourseDetailWithModules = async (courseId: string) => {
  const course = await Course.findById(courseId);
  if (!course) throw new Error('Course not found');

  const modules = await Module.find({ courseId }).sort({ moduleNumber: 1 });
  const moduleIds = modules.map((m) => m._id);

  const lectures = await Lecture.find({ moduleId: { $in: moduleIds } });

  // Group lectures by moduleId
  const moduleWithLectures = modules.map((mod) => ({
    ...mod.toObject(),
    lectures: lectures
      .filter((lec) => lec.moduleId.toString() === mod._id.toString())
      .sort((a, b) => a.createdAt?.getTime()! - b.createdAt?.getTime()!),
  }));

  return {
    ...course.toObject(),
    modules: moduleWithLectures,
  };
};


export const CourseService = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  getCourseDetailWithModules
};
