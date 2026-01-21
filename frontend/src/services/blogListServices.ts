import api from "./axios";
import type { BlogPost } from "./blogServices"; // Tận dụng lại type bài viết đã có

/* ============================
   TYPES
============================ */

// Định nghĩa kiểu dữ liệu trả về cho danh sách có phân trang
export interface PaginatedBlogResponse {
  data: BlogPost[];
  total: number;
  currentPage: number;
  totalPages: number;
}

/* ============================
   BLOG LIST APIS
============================ */

// Hàm lấy danh sách bài viết (Hỗ trợ Search & Pagination)
export const getBlogList = async (
  page: number = 1,
  limit: number = 10,
  search: string = "",
): Promise<PaginatedBlogResponse> => {
  try {
    const response = await api.get("/blog/list", {
      params: { page, limit, search },
    });
    return response.data;
  } catch (error) {
    console.error("Get blog list error:", error);
    throw error;
  }
};
