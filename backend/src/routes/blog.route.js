import express from "express";
import {
  getTrendingProducts,
  getLatestPosts,
  subscribeNewsletter,
} from "../controllers/blog.controller.js";

const router = express.Router();

router.get("/trending-products", getTrendingProducts);
router.get("/posts", getLatestPosts);
router.post("/newsletter/subscribe", subscribeNewsletter);

export default router;
