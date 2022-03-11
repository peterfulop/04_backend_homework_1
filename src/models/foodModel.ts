import { FoodEntry } from "../utils/interfaces/food.interfaces";

export let FOODS: FoodEntry[] = [
  {
    name: "Crustless Spinach Quiche",
    id: "20d22469-1614-4493-8d45-9f13e3977ed6",
    createdAt: new Date(Date.now()),
    details: {
      ["vegetable oil"]: { unit: "tablespoon", amount: 1 },
      ["onion"]: { unit: "piece", amount: 1 },
      ["chopped spinach"]: { unit: "ounce", amount: 10 },
      ["beaten egg"]: { unit: "piece", amount: 5 },
      ["shredded Muenster cheese"]: { unit: "cup", amount: 3 },
      ["salt"]: { unit: "tablespoon", amount: 0.25 },
      ["ground black pepper"]: { unit: "teaspone", amount: 0.125 },
    },
  },
  {
    name: "Good Old Fashioned Pancakes",
    id: "d5f5337b-926c-4b8a-8e46-a8268e2ef2b9",
    createdAt: new Date(Date.now()),
    details: {
      ["flour"]: { unit: "cup", amount: 1.5 },
      ["baking powder"]: { unit: "teaspoons", amount: 3.5 },
      ["salt"]: { unit: "tablespoon", amount: 1 },
      ["milk"]: { unit: "cup", amount: 1.25 },
      ["egg"]: { unit: "piece", amount: 1 },
      ["butter, melted"]: { unit: "tablespoon", amount: 3 },
    },
  },
  {
    name: "Quick Quiche",
    id: "7a9e6b85-b0b6-4f33-9a0c-2ae84c3ab033",
    createdAt: new Date(Date.now()),
    details: {
      ["slices bacon"]: { unit: "slice", amount: 8 },
      ["shredded Swiss cheese"]: { unit: "ounces", amount: 1 },
      ["butter, melted"]: { unit: "tablespoon", amount: 2 },
      ["beaten egg"]: { unit: "piece", amount: 4 },
      ["finely chopped onion"]: { unit: "cup", amount: 0.25 },
      ["salt"]: { unit: "tablespoon", amount: 1 },
      ["milk"]: { unit: "cup", amount: 0.5 },
    },
  },
  {
    name: "Almond Berry Smoothie",
    id: "758c02bc-0dc1-4156-b702-3b4a79f97ee1",
    createdAt: new Date(Date.now()),
    details: {
      ["frozen blueberries"]: { unit: "cup", amount: 1 },
      ["banana"]: { unit: "piece", amount: 1 },
      ["milk"]: { unit: "cup", amount: 1.25 },
      ["butter, almound"]: { unit: "tablespoon", amount: 1 },
      ["water"]: { unit: "cup", amount: 0.5 },
    },
  },
];
