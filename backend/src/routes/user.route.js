import express from "express";
import {
  getUsers,
  getUser,
  updateUser,
  getUserProfile,
  updateUserProfile
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

// Những API users
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.patch("/users/:id", upload.single("avatar"), updateUser);
router.get("/profile",getUserProfile);
router.patch("/profile", upload.single("avatar"), updateUserProfile);
// router.delete("/users/:id");

export default router;
