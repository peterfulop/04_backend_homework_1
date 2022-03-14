import { NextFunction, Response } from "express";
import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A food must have a name!"],
      trim: true,
    },
    details: {
      type: Object,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Food = mongoose.model("Food", FoodSchema);
export default Food;
