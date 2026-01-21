import express from "express";
import {
  getTrendingProducts,
  getLatestPosts,
  subscribeNewsletter,
  getBlogPostDetail,
  getBlogList,
} from "../controllers/blog.controller.js";

const router = express.Router();

router.get("/trending-products", getTrendingProducts);
router.get("/posts", getLatestPosts);
router.post("/newsletter/subscribe", subscribeNewsletter);
router.get("/posts/:id", getBlogPostDetail);
router.get("/list", getBlogList);
export default router;
