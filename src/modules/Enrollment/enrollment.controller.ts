// controller/enrollment.controller.ts
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

  // Fetch enrollment for the user and populate courseIds with full course data
  const enrolledData = await Enrollment.findOne({ userId });

   if (!enrolledData) {
    return sendResponse(res, {
      statusCode: status.NOT_FOUND,
      success: false,
      message: 'No enrollments found for this user',
      data: [],
    });
  }
  
   const courseIds = enrolledData.courseIds;
  
   const courses = await Course.find({ _id: { $in: courseIds } });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Enrolled courses fetched successfully',
    data: courses,
  })
});

export const EnrollmentController = { enrollCourse, getMyEnrollments };
