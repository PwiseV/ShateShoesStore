// src/services/fakeReviewService.ts
import type { ReviewData, ReviewQueryParams, ReviewResponse } from "../pages/Admin/Reviews/types";

let mockReviews: ReviewData[] = [
  {
    id: "1",
    reviewCode: "RV001",
    productId: "P1",
    productName: "Giày Ballet Nữ Đỏ",
    customerName: "Nguyễn Thị A",
    stars: 5,
    reviewContent: "Giày rất đẹp và thoải mái, giao hàng nhanh",
    status: "approved",
    createdAt: "2025-01-10",
  },
  {
    id: "2",
    reviewCode: "RV002",
    productId: "P2",
    productName: "Giày Sneaker Trắng",
    customerName: "Trần Văn B",
    stars: 4,
    reviewContent: "Chất lượng tốt nhưng kích cỡ hơi nhỏ",
    status: "pending",
    createdAt: "2025-01-09",
  },
  {
    id: "3",
    reviewCode: "RV003",
    productId: "P3",
    productName: "Giày Boots Nữ",
    customerName: "Lê Thị C",
    stars: 3,
    reviewContent: "Bình thường, có thể tìm thấy giày tốt hơn",
    status: "approved",
    createdAt: "2025-01-08",
  },
  {
    id: "4",
    reviewCode: "RV004",
    productId: "P1",
    productName: "Giày Ballet Nữ Đỏ",
    customerName: "Phạm Văn D",
    stars: 2,
    reviewContent: "Giày tệ, dễ tự tách rời",
    status: "rejected",
    createdAt: "2025-01-07",
  },
  // có thể thêm nhiều record hơn nếu cần test phân trang
];

const generateReviewCode = () => `RV${String(mockReviews.length + 1).padStart(3, "0")}`;

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getReviews = async (
  params: ReviewQueryParams
): Promise<ReviewResponse> => {
  await delay(600);

  let filtered = [...mockReviews];

  const { search, status, stars, page = 1, pageSize = 10 } = params;

  // Search
  if (search) {
    const lower = search.toLowerCase();
    filtered = filtered.filter(r =>
      r.productName.toLowerCase().includes(lower) ||
      r.customerName.toLowerCase().includes(lower) ||
      r.reviewCode.toLowerCase().includes(lower)
    );
  }

  // Filter status (array)
  if (status && status.length > 0) {
    filtered = filtered.filter(r => status.includes(r.status));
  }

  // Filter stars (array)
  if (stars && stars.length > 0) {
    filtered = filtered.filter(r => stars.includes(r.stars));
  }

  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  return {
    data: paginated,
    total: filtered.length,
    page,
    pageSize,
  };
};

export const updateReviewStatus = async (
  id: string,
  status: "pending" | "approved" | "rejected"
): Promise<ReviewData> => {
  await delay(400);
  const review = mockReviews.find(r => r.id === id);
  if (!review) throw new Error("Review not found");
  
  review.status = status;
  return { ...review };
};

export const deleteReview = async (id: string): Promise<{ message: string }> => {
  await delay(400);
  const index = mockReviews.findIndex(r => r.id === id);
  if (index === -1) throw new Error("Review not found");
  
  mockReviews.splice(index, 1);
  return { message: "Xóa thành công" };
};

export default {
  getReviews,
  updateReviewStatus,
  deleteReview,
};