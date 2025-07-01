/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

type Role = 'user' | 'admin';

export interface TUser {
  _id?: string,
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserModel extends Model<TUser> {
  isUserExistByEmail(email: string): Promise<TUser | null>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

}

export type TUserRole = keyof typeof USER_ROLE;
