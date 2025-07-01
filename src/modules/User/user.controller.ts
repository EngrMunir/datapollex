import { Request, Response } from "express";
import { catchAsync } from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import status from "http-status";
import { UserServices } from "./user.service";
import { User } from "./user.model";


const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'My profile retrieved successfully!',
    data: user,
  });
});


const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUsersFromDB();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const updateUserRole = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;
  const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true });
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User role updated successfully',
    data: updatedUser,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await User.findByIdAndDelete(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});

export const UserController = {
  getMyProfile,
  getAllUsers,
  updateUserRole,
  deleteUser
};