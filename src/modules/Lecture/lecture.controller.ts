import { Request, Response } from 'express';
import status from 'http-status';
import { LectureService } from './lecture.service';
import sendResponse from '../../app/utils/sendResponse';
import { catchAsync } from '../../app/utils/catchAsync';

const createLecture = catchAsync(async (req: Request, res: Response) => {
    const result = await LectureService.createLecture(req.body);
    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: 'Lecture created successfully',
      data: result,
    });
  });
    const getLecturesByModule = catchAsync(async (req: Request, res: Response) => {
    const result = await LectureService.getLecturesByModule(req.params.moduleId);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Lectures fetched successfully',
      data: result,
    });
  });
   const updateLecture = catchAsync(async (req: Request, res: Response) => {
    const result = await LectureService.updateLecture(req.params.id, req.body);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Lecture updated successfully',
      data: result,
    });
  });

const deleteLecture = catchAsync(async (req: Request, res: Response) => {
    const result = await LectureService.deleteLecture(req.params.id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Lecture deleted successfully',
      data: result,
    });
  });
export const LectureController = {
 createLecture,
 getLecturesByModule,
 updateLecture,
 deleteLecture
};
