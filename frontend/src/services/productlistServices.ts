import api from "./axios";

/* ============================
   TYPES
============================ */

// 1. Cấu trúc danh mục con
export interface ChildCategory {
  id: string;
  name: string;
  slug: string;
}

// 2. Cấu trúc danh mục cha (Cấp 1) - chứa mảng con
export interface ParentCategory {
  id: string;
  name: string;
  slug: string;
  category: ChildCategory[]; // Backend trả về key là "category"
}

// 3. Cấu trúc Response của Product từ Backend
interface BackendProductItem {
  productId: string;
  title: string;
  avatar: string;
  category?: {
    categoryId: string;
    name: string;
    slug: string;
  };
  sizes: {
    colors: {
      price: number;
    }[];
  }[];
  rating?: number;
}

// 4. Cấu trúc Product dùng cho UI
export interface Product {
  id: string;
  name: string;
  priceVnd: number;
  rating: number;
  image: string;
  category?: {
    id?: string;
    name: string;
    slug: string;
  };
}

/* ============================
   API FUNCTIONS
============================ */

export const getAllProducts = async (params?: {
  category?: string;
  keyword?: string;
  page?: number;
  limit?: number;
}): Promise<Product[]> => {
  try {
    const response = await api.get("/users/products", { params });
    const data = response.data?.data || [];

    return (data as BackendProductItem[]).map((item) => ({
      id: item.productId,
      name: item.title,
      priceVnd: item.sizes?.[0]?.colors?.[0]?.price || 0,
      rating: item.rating || 5.0,
      image: item.avatar,
      category: {
        id: item.category?.categoryId,
        name: item.category?.name || "",
        slug: item.category?.slug || "",
      },
    }));
  } catch (error) {
    console.error("Get products error:", error);
    throw error;
  }
};

export const getAllCategories = async (): Promise<ParentCategory[]> => {
  try {
    const response = await api.get("/users/category/list");
    return response.data?.data || [];
  } catch (error) {
    console.error("Get categories error:", error);
    throw error;
  }
};
