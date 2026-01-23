import {
  getProductForReviewService,
  createReviewService,
  getReviewsByProductService,
} from "../services/review.service.js";

// Error messages mapping
const ERROR_MESSAGES = {
  ORDER_ITEM_NOT_FOUND: "Không tìm thấy sản phẩm trong đơn hàng",
  VARIANT_NOT_FOUND: "Sản phẩm biến thể không tồn tại",
  PRODUCT_NOT_FOUND: "Sản phẩm không tồn tại",
  REVIEW_ALREADY_EXISTS: "Bạn đã đánh giá sản phẩm này rồi!",
  INVALID_RATING: "Đánh giá phải từ 1 đến 5 sao",
  UNAUTHORIZED: "Bạn không có quyền thực hiện thao tác này",
};

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
    console.error("Error getProductForReview:", error);

    const message = ERROR_MESSAGES[error.message] || "Lỗi Server";
    const statusCode = error.message in ERROR_MESSAGES ? 404 : 500;

    res.status(statusCode).json({ message });
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
    console.error("Error createReview:", error);

    const message = ERROR_MESSAGES[error.message] || "Lỗi Server";
    const statusCode = error.message === "REVIEW_ALREADY_EXISTS" ? 400 : 500;

    res.status(statusCode).json({ message });
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
    console.error("Error getReviewsByProduct:", error);
    res.status(500).json({ message: "Lỗi Server" });
  }
};

