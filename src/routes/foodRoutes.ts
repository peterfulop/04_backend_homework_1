import express from "express";
const router = express.Router();
import {
  getFoods,
  getFood,
  createFood,
  deleteFood,
  updateFood,
} from "../controllers/foodControllers";

import { protect } from "../controllers/authControllers";

router.get("/", protect, getFoods);
router.get("/:id", protect, getFood);

router.post("/", protect, createFood);

router.put("/:id", protect, updateFood);
router.delete("/:id", protect, deleteFood);

export default router;
