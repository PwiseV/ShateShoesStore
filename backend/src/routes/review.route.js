import express from "express";
import {
  getReviewForm,
  submitReview,
} from "../controllers/review.controller.js";

const router = express.Router();

/**
 * GET data để render form đánh giá
 * URL: /api/users/reviews/order-item/:orderItemId
 */
router.get(
  "/reviews/order-item/:orderItemId",
  getReviewForm
);

/**
 * POST gửi đánh giá
 * URL: /api/users/reviews
 */
router.post(
  "/reviews",
  submitReview
);

export default router;
