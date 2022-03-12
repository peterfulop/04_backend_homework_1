// import { randomUUID } from "crypto";
// import { RequestHandler } from "express";

// import {
//   FoodEntry,
//   FoodEntryDetails,
//   FoodEntryUpdateOptions,
// } from "../utils/interfaces/food.interfaces";

// export const getFoods: RequestHandler = (req, res, next) => {
//   try {
//     res.status(200).json({
//       status: "success",
//       results: FOODS.length,
//       data: FOODS,
//     });
//   } catch (e) {
//     res.status(500).json({
//       error: "internal server error",
//     });
//   }
// };

// export const getFood: RequestHandler = (req, res, next) => {
//   try {
//     const { id } = req.params as { id: string };
//     const selectedFood = FOODS.find((food) => food.id === id);
//     if (!selectedFood) {
//       return res.status(404).json({
//         error: "not found",
//       });
//     }
//     res.status(200).json({
//       status: "success",
//       data: selectedFood,
//     });
//   } catch (e) {
//     res.status(500).json({
//       error: "internal server error",
//     });
//   }
// };

// export const createFood: RequestHandler = (req, res, next) => {
//   try {
//     const { name, details } = req.body as {
//       name: string;
//       details: FoodEntryDetails;
//     };
//     if (!name) throw Error();

//     const newFood: FoodEntry = {
//       name,
//       createdAt: new Date(Date.now()),
//       id: randomUUID(),
//     };

//     if (details) {
//       let isValid = isFoodDetailsObjectValid(details);
//       if (!isValid) {
//         throw Error();
//       } else {
//         newFood.details = details;
//       }
//     }

//     FOODS.push(newFood);
//     res.status(201).json({
//       status: "success",
//       data: newFood,
//     });
//   } catch (e) {
//     res.status(500).json({
//       error: "internal server error",
//     });
//   }
// };

// export const updateFood: RequestHandler = (req, res, next) => {
//   try {
//     const { id } = req.params as { id: string };
//     const { name, details } = req.body as {
//       name: string;
//       details: FoodEntryDetails;
//     };
//     const selectedFood = FOODS.find((food) => food.id === id);
//     if (!selectedFood) {
//       return res.status(404).json({
//         error: "not found",
//       });
//     }

//     let isValid = isFoodDetailsObjectValid(details);
//     if (!name || !isValid) throw Error();

//     const updatedFood: FoodEntryUpdateOptions = selectedFood;
//     updatedFood.name = name;
//     updatedFood.details = details;

//     res.status(202).json({
//       status: "success",
//       data: updatedFood,
//     });
//   } catch (e) {
//     res.status(500).json({
//       error: "internal server error",
//     });
//   }
// };

// export const deleteFood: RequestHandler = (req, res, next) => {
//   try {
//     const { id } = req.params as { id: string };
//     const selectedFood = FOODS.find((food) => food.id === id);
//     if (!selectedFood) {
//       return res.status(404).json({
//         error: "not found",
//       });
//     }
//     const selectedIndex = FOODS.indexOf(selectedFood);
//     FOODS.splice(selectedIndex, 1);

//     res.status(204).json({
//       status: "success",
//     });
//   } catch (e) {
//     res.status(500).json({
//       error: "internal server error",
//     });
//   }
// };

// const isFoodDetailsObjectValid = (obj: object): boolean => {
//   if (Array.isArray(obj) || Object.keys(obj).length === 0) return false;
//   for (const d of Object.values(obj)) {
//     if (!d.unit || !d.amount) return false;
//   }
//   return true;
// };
