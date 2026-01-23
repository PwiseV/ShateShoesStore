import type {
  ReviewProductInfo,
  ReviewSubmitDTO,
} from "./reviewProductServices";

// --- DỮ LIỆU MOCK ---
const MOCK_REVIEW_INFO: ReviewProductInfo = {
  orderItemId: "order_item_999",
  productId: "product_123",
  productTitle: "Giày Sneaker Xanh Cổ Điển (MIRA MARY)",
  productImage:
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  color: "Xanh dương",
  size: "37",
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// --- CÁC HÀM GIẢ LẬP ---

/**
 * GET /users/reviews/order-item/:orderItemId
 */
export const getProductForReview = async (
  orderItemId: string,
): Promise<ReviewProductInfo> => {
  await delay(1000);
  console.log(`[FakeAPI] Fetching info for OrderItem: ${orderItemId}`);

  // Trả về mock data, gán lại orderItemId cho khớp
  return { ...MOCK_REVIEW_INFO, orderItemId };
};

/**
 * POST /users/reviews
 */
export const submitReview = async (data: ReviewSubmitDTO): Promise<any> => {
  await delay(1500);
  console.log("[FakeAPI] Review Submitted Body:", data);

  return {
    success: true,
    message: "Gửi đánh giá thành công!",
    data: {
      reviewId: "new_review_" + Date.now(),
    },
  };
};
