import { Request, Response } from 'express';
import sendResponse from '../../app/utils/sendResponse';
import status from 'http-status';
import { ProgressService } from './progress.service';
import { catchAsync } from '../../app/utils/catchAsync';

const markLectureComplete = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { lectureId } = req.body;
    const result = await ProgressService.markLectureComplete(userId, lectureId);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Lecture marked as completed',
      data: result,
    });
  });
  
const getCompletedLectures = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const lectureIds = req.body.lectureIds as string[]; // client sends all lectures from course

    const result = await ProgressService.getCompletedLecturesByCourse(userId, lectureIds);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Completed lectures fetched',
      data: result,
    });
  });
export const ProgressController = {
 markLectureComplete,
 getCompletedLectures  
};
