// src/services/adminPostServices.ts
import api from "./axios";
import type {
  Post,
  PostQueryParams,
  PostResponse,
} from "../pages/Admin/Post/types";

// ===== HELPER: Generate Slug =====
export const generateSlug = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

// ===== POST ENDPOINTS =====

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
  payload: any,
  file: File
): Promise<{ message: string; data: Post }> => {
  try {
    const formData = new FormData();

    // 1. Pack dữ liệu text
    Object.keys(payload).forEach((key) => {
      if (
        key !== "thumbnail" &&
        payload[key] !== undefined &&
        payload[key] !== null
      ) {
        formData.append(key, payload[key]);
      }
    });

    // 2. Tự động tạo slug nếu thiếu
    if (!payload.slug && payload.title) {
      formData.append("slug", generateSlug(payload.title));
    }

    // 3. Pack file ảnh (Bắt buộc)
    formData.append("thumbnail", file);

    // --- SỬA LỖI Ở ĐÂY: XÓA header Content-Type thủ công ---
    const response = await api.post("/admin/posts", formData);

    return response.data;
  } catch (error) {
    console.error("createPost error:", error);
    throw error;
  }
};

export const updatePost = async (
  id: string,
  payload: any,
  file?: File | null
): Promise<{ message: string; data: Post }> => {
  try {
    const formData = new FormData();

    // 1. Pack dữ liệu text
    Object.keys(payload).forEach((key) => {
      if (
        key !== "thumbnail" &&
        payload[key] !== undefined &&
        payload[key] !== null
      ) {
        formData.append(key, payload[key]);
      }
    });

    // 2. Cập nhật slug nếu tiêu đề thay đổi (tùy chọn)
    if (payload.title && !payload.slug) {
      formData.append("slug", generateSlug(payload.title));
    }

    // 3. Pack file ảnh nếu có thay đổi
    if (file) {
      formData.append("thumbnail", file);
    }

    // --- SỬA LỖI Ở ĐÂY: XÓA header Content-Type thủ công ---
    const response = await api.patch(`/admin/posts/${id}`, formData);

    return response.data;
  } catch (error) {
    console.error("updatePost error:", error);
    throw error;
  }
};

export const deletePost = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await api.delete(`/admin/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("deletePost error:", error);
    throw error;
  }
};

export const updatePostStatus = async (
  id: string,
  status: "active" | "hidden"
): Promise<{ message: string }> => {
  try {
    const formData = new FormData();
    formData.append("status", status);

    // --- SỬA LỖI Ở ĐÂY: XÓA header Content-Type thủ công ---
    const response = await api.patch(`/admin/posts/${id}`, formData);

    return response.data;
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
  generateSlug,
};
