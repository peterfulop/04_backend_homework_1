import { Document } from "mongodb";

export type FoodEntryDetails = Record<string, { unit: string; amount: number }>;

export type FoodEntryCreateOptions = {
  name: string;
  details?: FoodEntryDetails;
};

export type FoodEntryUpdateOptions = Partial<FoodEntryCreateOptions>;

export interface FoodEntry extends Document {
  name: string;
  details?: FoodEntryDetails;
}
