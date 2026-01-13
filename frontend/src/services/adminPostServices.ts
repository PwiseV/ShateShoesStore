// services/adminPostServices.ts
import api from "./axios";

// ===== 1. TYPE DEFINITIONS =====

export interface Post {
  id: number;
  title: string;
  slug: string; // <-- Thêm trường Slug
  category: string;
  thumbnail?: string;
  content: string;
  author: string;
  status: "active" | "hidden";
  createdAt: string;
}

export interface PostQueryParams {
  page: number;
  pageSize: number;
  keyword?: string;
  category?: string;
  month?: string;
  status?: "active" | "hidden";
}

export interface PostResponse {
  data: Post[];
  total: number;
  page: number;
  pageSize: number;
}

// ===== 2. UTILITY: HÀM TẠO SLUG TIẾNG VIỆT =====

/**
 * Hàm chuyển đổi tiêu đề thành slug
 * VD: "10 cách phối đồ mùa đông" -> "10-cach-phoi-do-mua-dong"
 */
export const generateSlug = (text: string): string => {
  return text
    .toString() // Chuyển thành chuỗi
    .toLowerCase() // Chuyển về chữ thường
    .normalize("NFD") // Chuẩn hóa chuỗi Unicode (tách dấu ra khỏi chữ cái)
    .replace(/[\u0300-\u036f]/g, "") // Xóa các dấu thanh (huyền, sắc, hỏi...)
    .replace(/[đĐ]/g, "d") // Xử lý chữ đ/Đ riêng biệt
    .replace(/\s+/g, "-") // Thay khoảng trắng bằng dấu gạch ngang
    .replace(/[^\w\-]+/g, "") // Xóa hết các ký tự đặc biệt (chỉ giữ lại chữ, số, gạch ngang)
    .replace(/\-\-+/g, "-") // Xóa các dấu gạch ngang liên tiếp (vừa- -vừa -> vừa-vừa)
    .replace(/^-+/, "") // Xóa gạch ngang ở đầu chuỗi
    .replace(/-+$/, ""); // Xóa gạch ngang ở cuối chuỗi
};

// ===== 3. POST ENDPOINTS =====

export const getPosts = async (
  params: PostQueryParams
): Promise<PostResponse> => {
  try {
    const response = await api.get("/admin/posts", { params });
    return response.data;
  } catch (error) {
    console.error("getPosts error:", error);
    throw error;
  }
};

export const createPost = async (
  // Payload nhận vào chưa có id, createdAt
  // Slug có thể truyền vào hoặc tự sinh bên trong (tùy logic bạn muốn)
  payload: Omit<Post, "id" | "createdAt" | "slug"> & { slug?: string }
): Promise<Post> => {
  try {
    // Nếu payload chưa có slug thì tự tạo từ title
    const finalPayload = {
      ...payload,
      slug: payload.slug || generateSlug(payload.title),
    };

    const response = await api.post("/admin/posts", finalPayload);
    return response.data;
  } catch (error) {
    console.error("createPost error:", error);
    throw error;
  }
};

export const updatePost = async (
  id: number,
  patch: Partial<Post>
): Promise<Post> => {
  try {
    // Logic phụ: Nếu người dùng sửa Title mà muốn Slug đổi theo
    // thì ở Frontend cần gọi hàm generateSlug rồi truyền vào patch.
    // Hoặc xử lý tại đây:
    const finalPatch = { ...patch };
    if (finalPatch.title && !finalPatch.slug) {
      // Tùy chọn: Tự động cập nhật slug khi sửa title (nếu cần)
      // finalPatch.slug = generateSlug(finalPatch.title);
    }

    const response = await api.patch(`/admin/posts/${id}`, finalPatch);
    return response.data;
  } catch (error) {
    console.error("updatePost error:", error);
    throw error;
  }
};

export const deletePost = async (id: number): Promise<{ message: string }> => {
  try {
    const response = await api.delete(`/admin/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("deletePost error:", error);
    throw error;
  }
};

export const updatePostStatus = async (
  id: number,
  status: "active" | "hidden"
): Promise<Post> => {
  try {
    return await updatePost(id, { status });
  } catch (error) {
    console.error("updatePostStatus error:", error);
    throw error;
  }
};

export default {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  updatePostStatus,
  generateSlug, // Export hàm này để dùng ở Frontend nếu cần (ví dụ: hiển thị preview link)
};
