import { Course } from './course.model';
import { ICourse } from './course.interface';

const createCourse = async (data: ICourse) => {
  return await Course.create(data);
};

const getAllCourses = async () => {
  return await Course.find().sort({ createdAt: -1 });
};


const getSingleCourse = async (courseId: string) => {
  
  const course = await Course.findById(courseId)
    .populate({
      path: 'modules',
      populate: {
        path: 'lectures',
        model: 'Lecture',
      }
    })
    .exec();

  if (!course) {
    throw new Error('Course not found');
  }

  return course;
};

const updateCourse = async (id: string, data: Partial<ICourse>) => {
  return await Course.findByIdAndUpdate(id, data, { new: true });
};

const deleteCourse = async (id: string) => {
  return await Course.findByIdAndDelete(id);
};



export const CourseService = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
