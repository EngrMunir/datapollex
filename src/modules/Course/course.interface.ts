import { Types } from "mongoose";

export interface ICourse {
  _id?: string;
  title: string;
  thumbnail: string;
  price: number;
  description: string;
  published?: boolean;
  modules: Types.ObjectId[];
}
