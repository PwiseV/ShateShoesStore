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

export interface ProductResponse {
  products: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const getAllProducts = async (params?: {
  category?: string;
  keyword?: string;
  page?: number;
  limit?: number;
  sort?: string;
}): Promise<ProductResponse> => {
  try {
    const response = await api.get("/guest/products", { params });

    // Lấy data và pagination từ response backend
    const rawData = response.data?.data || [];
    const pagination = response.data?.pagination || {
      total: 0,
      page: 1,
      limit: 6,
      totalPages: 1,
    };

    // Map dữ liệu sang cấu trúc Product của frontend
    const mappedProducts = (rawData as any[]).map((item) => ({
      id: item.productId,
      name: item.title,
      priceVnd: item.min_price || item.sizes?.[0]?.colors?.[0]?.price || 0,
      rating: item.rating || 5.0,
      image: item.avatar,
      category: {
        id: item.category?.categoryId,
        name: item.category?.name || "",
        slug: item.category?.slug || "",
      },
    }));

    return {
      products: mappedProducts,
      pagination: pagination,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      products: [],
      pagination: { total: 0, page: 1, limit: 6, totalPages: 1 },
    };
  }
};

export const getAllCategories = async (): Promise<ParentCategory[]> => {
  try {
    const response = await api.get("/guest/category/list");
    return response.data?.data || [];
  } catch (error) {
    console.error("Get categories error:", error);
    throw error;
  }
};
