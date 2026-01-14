import express from "express";
import { getUsers, getUser } from "../controllers/user.controller.js";

const router = express.Router();

// Những API users
router.get("/users", getUsers);
router.get("/users/:id", getUser);
// router.patch("/users/:id");
// router.delete("/users/:id");



export default router;