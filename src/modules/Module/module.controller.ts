import { Request, Response } from 'express';
import status from 'http-status';
import { isValidObjectId } from 'mongoose';
import { ModuleService } from './module.service';
import sendResponse from '../../app/utils/sendResponse';
import { catchAsync } from '../../app/utils/catchAsync';

const createModule = catchAsync(async (req: Request, res: Response) => {
  const result = await ModuleService.createModule(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Module created successfully',
    data: result,
  });
});

const getModulesByCourse = catchAsync(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  if (!isValidObjectId(courseId)) {
    return sendResponse(res, {
      statusCode: status.BAD_REQUEST,
      success: false,
      message: 'Invalid courseId',
      data: null,
    });
  }
  const result = await ModuleService.getModulesByCourse(courseId);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Modules fetched successfully',
    data: result,
  });
});

// UPDATED: supports GET /modules?courseId=<id>
const getAllModule = catchAsync(async (req: Request, res: Response) => {
  const { courseId } = req.query as { courseId?: string };

  if (courseId && !isValidObjectId(courseId)) {
    return sendResponse(res, {
      statusCode: status.BAD_REQUEST,
      success: false,
      message: 'Invalid courseId',
      data: null,
    });
  }

  const result = await ModuleService.getAllModule(courseId);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Modules fetched successfully',
    data: result,
  });
});

const updateModule = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ModuleService.updateModule(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Module updated successfully',
    data: result,
  });
});

const deleteModule = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ModuleService.deleteModule(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Module deleted successfully',
    data: result,
  });
});

export const ModuleController = {
  createModule,
  getModulesByCourse,
  getAllModule,
  updateModule,
  deleteModule,
};
