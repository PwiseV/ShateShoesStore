import api from "./axios";

/* ============================
   TYPES
============================ */

export interface BlogPostDetail {
  id: string | number;
  title: string;
  author: string; // UI cần hiển thị tác giả
  published_at: string;
  image: string; // Mapping từ blog_image_url
  content: string; // Chứa HTML
}

/* ============================
   BLOG POST APIS
============================ */

// Get Blog Post Detail by ID
export const getBlogPostById = async (id: string): Promise<BlogPostDetail> => {
  try {
    const response = await api.get(`/blog/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Get blog post detail error (ID: ${id}):`, error);
    throw error;
  }
};
