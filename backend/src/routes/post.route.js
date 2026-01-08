import express from "express";
import { 
  getPosts, 
  getPostById,
  createPost, 
  updatePost, 
  updatePostStatus, 
  deletePost 
} from "../controllers/post.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

// admin routes for managing posts
router.get("/posts", getPosts);
router.get("/posts/:id", getPostById);
router.post("/posts", upload.single("thumbnail"), createPost); // Key thumbnail
router.patch("/posts/:id", upload.single("thumbnail"), updatePost);
router.patch("/posts/:id/status", updatePostStatus);
router.delete("/posts/:id", deletePost);

export default router;