import api from "./axios";

// ==========================================
// 1. TYPE DEFINITIONS
// ==========================================

// Thông tin trả về khi GET order-item
export interface ReviewProductInfo {
  orderItemId: string;
  productId: string;
  productTitle: string;
  productImage: string;
  color: string;
  size: string;
}

// DTO gửi đi khi Submit Review
export interface ReviewSubmitDTO {
  orderItemId: string;
  productId: string;
  rating: number;
  content: string;
  color?: string;
  size?: string;
}

// Wrapper Response chuẩn
interface ApiResponse<T> {
  success: boolean; // Hoặc check status code
  message?: string;
  data: T;
}

// ==========================================
// 2. SERVICES
// ==========================================

/**
 * GET /users/reviews/order-item/:orderItemId
 * Lấy thông tin cần thiết để hiện lên trang đánh giá
 */
export const getProductForReview = async (
  orderItemId: string,
): Promise<ReviewProductInfo> => {
  const response = await api.get<ApiResponse<ReviewProductInfo>>(
    `/users/reviews/order-item/${orderItemId}`,
  );
  return response.data.data;
};

/**
 * POST /users/reviews
 * Submit review
 */
export const submitReview = async (data: ReviewSubmitDTO): Promise<any> => {
  const response = await api.post<ApiResponse<any>>("/users/reviews", data);
  return response.data;
};

/**
 * GET /users/reviews/product/:productId
 * Get list of reviews for a product
 */
export const getReviewsByProduct = async (
  productId: string
): Promise<any[]> => {
  const response = await api.get<ApiResponse<any[]>>(
    `/users/reviews/product/${productId}`
  );
  return response.data.data;
};
