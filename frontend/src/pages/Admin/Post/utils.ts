// src/utils.ts
import type { Post } from "./types";

// Hàm format tiền tệ (giữ nguyên nếu bạn dùng cho chỗ khác)
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

// Hàm format ngày: dd-mm-yyyy
export const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Logic lấy danh sách tháng cho bộ lọc (Giữ nguyên logic cũ của bạn)
export const getAvailableMonths = (posts: Post[]): string[] => {
  const uniqueMonths = new Set<string>();
  const now = new Date();
  const currentMonthStr = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}`;
  uniqueMonths.add(currentMonthStr);

  posts.forEach((post) => {
    if (post.createdAt) {
      const date = new Date(post.createdAt);
      const monthStr = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      uniqueMonths.add(monthStr);
    }
  });

  return Array.from(uniqueMonths).sort().reverse();
};
