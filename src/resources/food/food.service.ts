import Food from "../food/food.model";
import { FoodEntry, FoodEntryDetails } from "../food/food.interface";
import mongoose from "mongoose";

class FoodService {
  public async createFood(
    name: string,
    details: FoodEntryDetails
  ): Promise<FoodEntry> {
    try {
      const food = await Food.create({ name, details });
      return food;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async updateFood(
    id: string,
    name: string,
    details: FoodEntryDetails
  ): Promise<FoodEntry> {
    try {
      const food = await Food.findByIdAndUpdate(
        id,
        { name, details },
        {
          new: true,
          runValidators: true,
        }
      );
      return food;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async deleteFood(id: string): Promise<FoodEntry> {
    try {
      const food = await Food.findByIdAndDelete(id);
      return food;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getFoods(): Promise<any[]> {
    try {
      const foods = await Food.find();
      return foods;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getFood(id: string): Promise<any[]> {
    try {
      const food = await Food.findById(id);
      return food;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default FoodService;
