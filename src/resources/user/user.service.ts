import mongoose from "mongoose";
import { UserEntryCreateOptions, UserLoginOptions } from "./user.interface";
import User from "./user.model";

class UserService {
  public async loginUser(userlogin: UserLoginOptions): Promise<any> {}

  public async createUser(
    newUser: UserEntryCreateOptions
  ): Promise<UserEntryCreateOptions> {
    try {
      const user = await User.create(newUser);
      const current = await User.findById(user._id);
      return current;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  public async getUsers(): Promise<any[]> {
    try {
      const users = await User.find();
      return users;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getUser(id: string): Promise<any[]> {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async updateUser(
    id: string,
    userUpdate: UserLoginOptions
  ): Promise<any> {
    try {
      const user = await User.findByIdAndUpdate(id, userUpdate, {
        new: true,
        runValidators: true,
      });
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async deleteUser(id: string): Promise<any> {
    try {
      const user = await User.findByIdAndDelete(id);
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default UserService;
