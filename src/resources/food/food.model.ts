import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { Schema } from "mongoose";

const FoodSchema = new Schema(
  {
    id: {
      type: ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: [true, "A food must have a name!"],
      unique: true,
      trim: true,
    },
    details: {
      type: ObjectId,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const Food = mongoose.model("Food", FoodSchema);
export default Food;
