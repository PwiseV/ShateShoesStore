// src/services/fakeReviewService.ts
import type { ReviewData, ReviewQueryParams, ReviewResponse } from "../pages/Admin/Reviews/types";

let mockReviews: ReviewData[] = [
  {
    id: "1",
    review_id: 1,
    product_id: 1,
    product_name: "Giày Ballet Nữ Đỏ",
    user_id: 1,
    username: "Nguyễn Thị A",
    rating: 5,
    title: "Tuyệt vời!",
    content: "Giày rất đẹp và thoải mái khi mang. Rất hài lòng với sản phẩm này.",
    order_item_id: 101,
    status: "approved",
    created_at: new Date("2025-01-10"),
  },
  {
    id: "2",
    review_id: 2,
    product_id: 2,
    product_name: "Giày Thể Thao Nam Xanh",
    user_id: 2,
    username: "Trần Văn B",
    rating: 4,
    title: "Rất tốt",
    content: "Chất lượng giày tốt, chỉ có màu sắc hơi khác so với hình.",
    order_item_id: 102,
    status: "pending",
    created_at: new Date("2025-02-15"),
  },
  {
    id: "3",
    review_id: 3,
    product_id: 3,
    product_name: "Giày Lười Da Nâu",
    user_id: 3,
    username: "Lê Thị C",
    rating: 2,
    title: "Không hài lòng",
    content: "Giày không vừa chân và chất liệu không như mong đợi.",
    order_item_id: 103,
    status: "rejected",
    created_at: new Date("2025-03-20"),
  },
  {
    id: "4",
    review_id: 4,
    product_id: 4,
    product_name: "Giày Cao Gót Đen",
    user_id: 4,
    username: "Phạm Văn D",
    rating: 3,
    title: "Bình thường",
    content: "Giày ổn nhưng không có gì đặc biệt.",
    order_item_id: 104,
    status: "approved",
    created_at: new Date("2025-04-25"),
  },
  {
    id: "5",
    review_id: 5,
    product_id: 5,
    product_name: "Giày Sandal Nữ Hồng",
    user_id: 5,
    username: "Hoàng Thị E",
    rating: 5,
    title: "Yêu thích!",
    content: "Rất thích đôi giày này, rất phù hợp cho mùa hè.",
    order_item_id: 105,
    status: "approved",
    created_at: new Date("2025-05-30"),
  },
  {
    id: "6",
    review_id: 6,
    product_id: 6,
    product_name: "Giày Boots Nam Nâu",
    user_id: 6,
    username: "Đỗ Văn F",
    rating: 4,
    title: "Tốt",
    content: "Giày đẹp và bền, chỉ hơi nặng một chút.",
    order_item_id: 106,
    status: "pending",
    created_at: new Date("2025-06-05"),
  },
  {
    id: "7",
    review_id: 7,
    product_id: 7,
    product_name: "Giày Thể Thao Nữ Trắng",
    user_id: 7,
    username: "Vũ Thị G",
    rating: 1,
    title: "Rất tệ",
    content: "Giày bị hỏng sau một tuần sử dụng.",
    order_item_id: 107,
    status: "rejected",
    created_at: new Date("2025-07-10"),
  },
  {
    id: "8",
    review_id: 8,
    product_id: 8,
    product_name: "Giày Lười Nam Đen",
    user_id: 8,
    username: "Trịnh Văn H",
    rating: 3,
    title: "Ổn",
    content: "Giày dùng được nhưng không xuất sắc.",
    order_item_id: 108,
    status: "approved",
    created_at: new Date("2025-08-15"),
  },
  {
    id: "9",
    review_id: 9,
    product_id: 9,
    product_name: "Giày Cao Gót Đỏ",
    user_id: 9,
    username: "Ngô Thị I",
    rating: 4,
    title: "Rất đẹp",
    content: "Giày rất đẹp và phù hợp với nhiều trang phục.",
    order_item_id: 109,
    status: "pending",
    created_at: new Date("2025-09-20"),
  },
  {
    id: "10",
    review_id: 10,
    product_id: 10,
    product_name: "Giày Sandal Nam Xám",
    user_id: 10,
    username: "Bùi Văn K",
    rating: 2,
    title: "Không tốt",
    content: "Giày không thoải mái khi đi lâu.",
    order_item_id: 110,
    status: "rejected",
    created_at: new Date("2025-10-25"),
  },
  {
    id: "11",
    review_id: 11,
    product_id: 11,
    product_name: "Giày Thể Thao Trẻ Em",
    user_id: 11,
    username: "Phan Thị L",
    rating: 5,
    title: "Tuyệt vời cho bé",
    content: "Giày rất phù hợp và bền cho con tôi.",
    order_item_id: 111,
    status: "approved",
    created_at: new Date("2025-11-30"),
  },
  {
    id: "12",
    review_id: 12,
    product_id: 12,
    product_name: "Giày Lười Nữ Xanh",
    user_id: 12,
    username: "Trần Văn M",
    rating: 4,
    title: "Rất tốt",
    content: "Giày đẹp và dễ phối đồ.",
    order_item_id: 112,
    status: "pending",
    created_at: new Date("2025-12-05"),
  }
];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Đổi tên hàm nếu cần để giống: getAdminReviewsMock
export const getReviews = (
  params: ReviewQueryParams
): Promise<ReviewResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...mockReviews];

      // 1. Filter search (keyword)
      if (params.search) {
        const kw = params.search.toLowerCase();
        filtered = filtered.filter(
          (r) =>
            r.review_id.toString().includes(kw) ||                    // thay reviewCode → review_id
            r.product_name.toLowerCase().includes(kw) ||              // productName → product_name
            r.username.toLowerCase().includes(kw)                         // customerName → user
        );
      }

      // 2. Filter status (single hoặc multiple tùy hook)
      if (params.status && params.status.length > 0) {
        filtered = filtered.filter((r) => params.status!.includes(r.status));
      }

      // 3. Filter stars
      if (params.rating && params.rating.length > 0) {
        filtered = filtered.filter((r) => params.rating!.includes(r.rating));  // rating thay vì stars
      }

      // Pagination
      const page = params.page || 1;
      const limit = params.pageSize || 10; // dùng pageSize để giống limit trong Orders
      const total = filtered.length;
      const totalPages = Math.ceil(total / limit);
      const start = (page - 1) * limit;
      const data = filtered.slice(start, start + limit);

      resolve({
        data,                          // danh sách reviews đã phân trang
        pagination: {
          total,                       // tổng số record sau filter
          page,                        // trang hiện tại
          limit,                       // số item/trang
          totalPages,                  // tổng số trang
        },
      });
    }, 600); // delay giống Orders
  });
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