import { Request, Response } from 'express';
import status from 'http-status';
import { CourseService } from './course.service';
import { catchAsync } from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { Course } from './course.model';
import { Module } from '../Module/module.model';

const createCourse = catchAsync(async (req: Request, res: Response) => {
    const result = await CourseService.createCourse(req.body);
    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: 'Course created successfully',
      data: result,
    });
  });

  const getAllCourses = catchAsync(async (_req: Request, res: Response) => {
    const result = await CourseService.getAllCourses();
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Courses retrieved successfully',
      data: result,
    });
  });

  const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
    const result = await CourseService.getSingleCourse(req.params.id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Course retrieved successfully',
      data: result,
    });
  });

  const updateCourse = catchAsync(async (req: Request, res: Response) => {
    const result = await CourseService.updateCourse(req.params.id, req.body);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Course updated successfully',
      data: result,
    });
  });

  const deleteCourse = catchAsync(async (req: Request, res: Response) => {
    const result = await CourseService.deleteCourse(req.params.id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Course deleted successfully',
      data: result,
    });
  });

// Get course details along with modules and lectures
const getCourseDetails = async (req: Request, res: Response) => {
  const { courseId } = req.params;  // Get courseId from request params

  try {
    // Fetch the course details by courseId
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Fetch all modules related to this courseId and populate lectures
    const modules = await Module.find({ courseId })
      .populate('lectures')  // Populate lectures for each module
      .exec();

      console.log('modules',modules)

    // Return the course details along with populated modules and lectures
    return res.status(200).json({
      data: {
        _id: course._id,
        title: course.title,
        description: course.description,
        thumbnail: course.thumbnail,
        price: course.price,
        modules: modules,  // This will include the populated lectures
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching course details' });
  }
};



export const CourseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  getCourseDetails
};
