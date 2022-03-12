import mongoose from "mongoose";
import { UserEntryCreateOptions } from "./user.interface";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "User must have a username"],
      unique: false,
    },
    email: {
      type: String,
      required: [true, "User must have an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please, provide a password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please, confirm your password"],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// UserSchema.methods.passwordValidator = function (this: UserEntryCreateOptions) {
//   return this.password === this.passwordConfirm;
// };

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = "";
  next();
});

const User = mongoose.model("User", UserSchema);
export default User;
