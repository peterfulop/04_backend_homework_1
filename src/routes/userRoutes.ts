import express from "express";
const router = express.Router();
import { login } from "../controllers/authControllers";

router.post("/login", login);

export default router;
