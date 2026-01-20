import express from "express";
import {
  getTrendingProducts,
  getLatestPosts,
  subscribeNewsletter,
  getBlogPostDetail,
} from "../controllers/blog.controller.js";

const router = express.Router();

router.get("/trending-products", getTrendingProducts);
router.get("/posts", getLatestPosts);
router.post("/newsletter/subscribe", subscribeNewsletter);
router.get("/posts/:id", getBlogPostDetail);

export default router;
