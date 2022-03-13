import { Document } from "mongodb";
import mongoose from "mongoose";

export interface UserCreateOptions extends Document {
  _id?: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserUpdateOptions extends Document {
  username?: string;
  email?: string;
}
