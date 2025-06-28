import { Request, Response } from 'express';
import status from 'http-status';
import { CourseService } from './course.service';
import { catchAsync } from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';

export const CourseController = {
  createCourse: catchAsync(async (req: Request, res: Response) => {
    const result = await CourseService.createCourse(req.body);
    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: 'Course created successfully',
      data: result,
    });
  }),

  getAllCourses: catchAsync(async (_req: Request, res: Response) => {
    const result = await CourseService.getAllCourses();
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Courses retrieved successfully',
      data: result,
    });
  }),

  getSingleCourse: catchAsync(async (req: Request, res: Response) => {
    const result = await CourseService.getSingleCourse(req.params.id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Course retrieved successfully',
      data: result,
    });
  }),

  updateCourse: catchAsync(async (req: Request, res: Response) => {
    const result = await CourseService.updateCourse(req.params.id, req.body);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Course updated successfully',
      data: result,
    });
  }),

  deleteCourse: catchAsync(async (req: Request, res: Response) => {
    const result = await CourseService.deleteCourse(req.params.id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Course deleted successfully',
      data: result,
    });
  }),
};
