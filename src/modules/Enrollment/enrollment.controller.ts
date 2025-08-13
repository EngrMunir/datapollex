import { Request, Response } from 'express';
import sendResponse from '../../app/utils/sendResponse';
import status from 'http-status';
import { Enrollment } from './enrollment.modal';
import { catchAsync } from '../../app/utils/catchAsync';
import { Course } from '../Course/course.model';
import { Module } from '../Module/module.model';
import { Lecture } from '../Lecture/lecture.model';

export const enrollCourse = async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const { courseId } = req.body;

  let enrollment = await Enrollment.findOne({ userId });

  if (enrollment) {
    // Check if course is already enrolled
    if (enrollment.courseIds.includes(courseId)) {
      return sendResponse(res, {
        statusCode: status.CONFLICT,
        success: false,
        message: 'Already enrolled in this course',
      });
    }

    // Add courseId to courseIds array
    enrollment.courseIds.push(courseId);
    await enrollment.save();
  } else {
    // First time enrollment
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

  // Fetch enrollment for the user and populate courseIds with full course data including modules and lectures
  const enrolledCourse = await Enrollment.findOne({ userId })
  const enrolledCourseIds = enrolledCourse?.courseIds

  const result = await Course.find({_id: {$in: enrolledCourseIds}})
  
   sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Lecture deleted successfully',
      data: result,
    });        

});

export const EnrollmentController = { getMyEnrollments, enrollCourse };