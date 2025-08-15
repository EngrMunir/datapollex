import { Request, Response } from 'express';
import sendResponse from '../../app/utils/sendResponse';
import status from 'http-status';
import { Enrollment } from './enrollment.modal';
import { catchAsync } from '../../app/utils/catchAsync';
import { Course } from '../Course/course.model';

export const enrollCourse = async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const { courseId } = req.body;

  let enrollment = await Enrollment.findOne({ userId });

  if (enrollment) {
    
    if (enrollment.courseIds.includes(courseId)) {
      return sendResponse(res, {
        statusCode: status.CONFLICT,
        success: false,
        message: 'Already enrolled in this course',
      });
    }
    
    enrollment.courseIds.push(courseId);
    await enrollment.save();
  } else {
    
    enrollment = await Enrollment.create({ userId, courseIds: [courseId] });
  }

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Enrolled successfully',
    data: enrollment,
  });
};

const getMyEnrollments = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user._id;

  const enrolledCourse = await Enrollment.findOne({ userId })
  const enrolledCourseIds = enrolledCourse?.courseIds

  const result = await Course.find({_id: {$in: enrolledCourseIds}})
  
   sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'My enrolled course successfully',
      data: result,
    });        

});

const enrolledCourse = catchAsync(async (req: Request, res: Response) => {

  const enrolledCourse = await Enrollment.find()
  
   sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Enrolled course fetched successfully',
      data: enrolledCourse,
    });        

});

export const EnrollmentController = { getMyEnrollments, enrollCourse , enrolledCourse};