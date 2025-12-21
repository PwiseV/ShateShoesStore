import express from "express";
import { authMe } from "../controllers/userController.js";

const router = express.Router();

// Những API users
router.get("/me", authMe);

export default router;