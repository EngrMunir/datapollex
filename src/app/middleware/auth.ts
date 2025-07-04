/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../../modules/User/user.interface";
import AppError from "../errors/AppError";
import status from "http-status";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../../modules/User/user.model";
import jwt from 'jsonwebtoken';
import { catchAsync } from "../utils/catchAsync";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('token from auth ', token)

    if (!token) {
      throw new AppError(status.UNAUTHORIZED, 'You are not authorized!');
    }

    let decoded;

    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;
    } catch (error) {
      
      throw new AppError(status.UNAUTHORIZED, 'Unauthorized');
    }

    const { role, email } = decoded;

    const user = await User.isUserExistByEmail(email);
    if (!user) {
      throw new AppError(status.NOT_FOUND, 'This user does not exist');
    }

    if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
      throw new AppError(status.UNAUTHORIZED, 'You are not authorized for this role!');
    }

    req.user = user;

    next();
  });
};


export default auth;