
import express from "express";
import {
    getProductForReview,
    createReview,
    getReviewsByProduct,
    getAllReviews,
    updateReviewStatus
} from "../controllers/review.controller.js";

const router = express.Router();

// Get info to review (Protected by parent route)
router.get("/reviews/order-item/:orderItemId", getProductForReview);
router.get("/reviews", getAllReviews);
router.patch("/reviews/:reviewId", updateReviewStatus);
// Submit review (Protected)
router.post("/reviews", createReview);

// Get reviews for a product (Can be public, but if parent is protected, it's protected)
// Note: Route path will be /api/users/reviews/product/:productId
// Or if we mount at /api/users, it is users/reviews...
router.get("/reviews/product/:productId", getReviewsByProduct);

export default router;
