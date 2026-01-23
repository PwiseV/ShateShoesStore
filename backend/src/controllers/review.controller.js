import {
  getProductForReviewService,
  createReviewService,
  getReviewsByProductService,
} from "../services/review.service.js";
import { handleServiceError } from "../utils/errorHandler.js";

/**
 * GET /api/users/reviews/order-item/:orderItemId
 * Get info to write a review
 */
export const getProductForReview = async (req, res) => {
  try {
    const { orderItemId } = req.params;
    const userId = req.user._id;

    const reviewInfo = await getProductForReviewService(orderItemId, userId);

    res.status(200).json({
      success: true,
      data: reviewInfo,
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

/**
 * POST /api/users/reviews
 * Create a new review
 */
export const createReview = async (req, res) => {
  try {
    const userId = req.user._id;
    const reviewData = req.body;

    const newReview = await createReviewService(reviewData, userId);

    res.status(201).json({
      success: true,
      message: "Đánh giá thành công!",
      data: newReview,
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

/**
 * GET /api/users/reviews/product/:productId
 * Get all reviews for a product
 */
export const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await getReviewsByProductService(productId);

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};
