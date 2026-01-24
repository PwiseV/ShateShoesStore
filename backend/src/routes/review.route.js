
import express from "express";
import {
    getProductForReview,
    createReview,
    getReviewsByProduct,
    getAllReviews,
    updateReviewStatus
} from "../controllers/review.controller.js";

const router = express.Router();

// IMPORTANT: More specific routes must come BEFORE general routes
// Get info to review (Protected by parent route)
router.get("/reviews/order-item/:orderItemId", getProductForReview);

// Get reviews for a product
router.get("/reviews/product/:productId", getReviewsByProduct);

// Get all reviews (admin)
router.get("/reviews", getAllReviews);

// Submit review (Protected)
router.post("/reviews", createReview);

// Update review status (admin)
router.patch("/reviews/:reviewId", updateReviewStatus);

export default router;
