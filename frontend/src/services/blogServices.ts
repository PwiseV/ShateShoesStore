import api from "./axios";

/* ============================
   TYPES
============================ */

export interface Product {
  id: number | string;
  name: string;
  image: string;
  price?: number;
}

export interface BlogPost {
  id: number | string;
  title: string;
  summary: string;
  thumbnail: string;
  published_at: string;
}

export interface NewsletterResponse {
  message: string;
}

/* ============================
   BLOG APIS
============================ */

// Get Trending Products
export const getTrendingProducts = async (
  limit: number = 6,
): Promise<Product[]> => {
  try {
    const response = await api.get("/blog/trending-products", {
      params: { limit },
    });
    return response.data;
  } catch (error) {
    console.error("Get trending products error:", error);
    throw error;
  }
};

// Get Latest Blog Posts
export const getLatestPosts = async (
  limit: number = 4,
): Promise<BlogPost[]> => {
  try {
    const response = await api.get("/blog/posts", {
      params: { limit },
    });
    return response.data;
  } catch (error) {
    console.error("Get blog posts error:", error);
    throw error;
  }
};

// Subscribe Newsletter
export const subscribeNewsletter = async (
  email: string,
): Promise<NewsletterResponse> => {
  try {
    const response = await api.post("/blog/newsletter/subscribe", { email });
    return response.data;
  } catch (error) {
    console.error("Subscribe newsletter error:", error);
    throw error;
  }
};
