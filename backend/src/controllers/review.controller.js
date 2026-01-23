import * as reviewService from "../services/review.service.js";
import { handleServiceError } from "../utils/errorHandler.js";

// GET /api/users/reviews/order-item/:orderItemId
// Get info to write a review
export const getProductForReview = async (req, res) => {
  try {
    const { orderItemId } = req.params;

    const reviewInfo = await reviewService.getProductForReviewService(orderItemId);

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

    const newReview = await reviewService.createReviewService(reviewData, userId);

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

    const reviews = await reviewService.getReviewsByProductService(productId);

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const getAllReviews = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const status = req.query.status;
        const rating =  req.query.rating;
        const keyword = req.query.keyword;
        const { formattedReviews, total } = await reviewService.getAllReviewsService(page, limit, status, rating, keyword);

        return res.status(200).json({
            success: true,
            message: "Lấy danh sách đánh giá thành công",
            data: formattedReviews,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error("Lỗi trong getAllReviews:", error);
        return res.status(500).json({
            success: false,
            message: "Đã xảy ra lỗi khi lấy danh sách đánh giá",
            error: error.message
        });
    }
};

export const updateReviewStatus = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { status } = req.body;

        if (!["active", "hidden"].includes(status)) {
            return res.status(400).json({ success: false, message: "Trạng thái không hợp lệ" });
        }

        const data = await reviewService.updateReviewStatusService(reviewId, status);
        
        return data 
            ? res.status(200).json({ success: true, message: "Cập nhật thành công", data })
            : res.status(404).json({ success: false, message: "Không tìm thấy đánh giá" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi hệ thống", error: error.message });
    }
};