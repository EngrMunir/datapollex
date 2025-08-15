import { Request, Response } from 'express';
import status from 'http-status';
import { Types, isValidObjectId } from 'mongoose';
import { LectureService } from './lecture.service';
import sendResponse from '../../app/utils/sendResponse';
import { catchAsync } from '../../app/utils/catchAsync';

const toOid = (id?: string) =>
  id && isValidObjectId(id) ? new Types.ObjectId(id) : undefined;

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
  const m = toOid(req.params.moduleId);
  if (!m) {
    return sendResponse(res, {
      statusCode: status.BAD_REQUEST,
      success: false,
      message: 'Invalid moduleId',
      data: null,
    });
  }

  const result = await LectureService.getLectures({ module: m });
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Lectures fetched successfully',
    data: result,
  });
});

const getLectures = catchAsync(async (req: Request, res: Response) => {
  // Prefer courseId/moduleId; fall back to course/module for compatibility
  const { courseId, moduleId, course, module } = req.query as {
    courseId?: string;
    moduleId?: string;
    course?: string;   // legacy
    module?: string;   // legacy
  };

  const c = toOid(courseId ?? course);
  const m = toOid(moduleId ?? module);

  if ((courseId ?? course) && !c) {
    return sendResponse(res, {
      statusCode: status.BAD_REQUEST,
      success: false,
      message: 'Invalid courseId',
      data: null,
    });
  }
  if ((moduleId ?? module) && !m) {
    return sendResponse(res, {
      statusCode: status.BAD_REQUEST,
      success: false,
      message: 'Invalid moduleId',
      data: null,
    });
  }

  const filters: Record<string, any> = {};
  if (c) filters.course = c;
  if (m) filters.module = m;

  // Service will handle populate/sort
  const result = await LectureService.getLectures(filters);

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
  getLectures,
  updateLecture,
  deleteLecture,
};
