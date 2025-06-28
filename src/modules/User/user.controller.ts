import { Request, Response } from 'express';
import status from 'http-status';
import { UserServices } from './user.service';
import { catchAsync } from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUsersFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const email = req.user?.email;
  if (!email) throw new Error("User email is required");
  const result = await UserServices.getSingleUserFromDB(email);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User profile fetched successfully',
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  getMyProfile
};
