import { Document } from "mongodb";
import mongoose from "mongoose";

export interface UserEntryCreateOptions extends Document {
  _id?: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserLoginOptions extends Document {
  email: string;
  password: string;
}
