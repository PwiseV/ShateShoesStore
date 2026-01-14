import api from "./axios";

/* ============================
   TYPES
============================ */

// 1. Cấu trúc danh mục con
export interface ChildCategory {
  id: string;
  name: string;
}

// 2. Cấu trúc danh mục cha (Cấp 1) - chứa mảng con
export interface ParentCategory {
  id: string;
  name: string;
  category: ChildCategory[]; // Backend trả về key là "category"
}

// 3. Cấu trúc Response của Product từ Backend
interface BackendProductItem {
  id: string;
  title: string;
  avatar: string;
  // Backend trả về category dạng object (theo PDF)
  category?: {
    categoryId: string;
    name: string;
    slug: string;
  };
  // Cấu trúc giá lồng nhau
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
  // ĐÃ XÓA: sort?: string; (Vì Frontend tự xử lý sort)
}): Promise<Product[]> => {
  try {
    const response = await api.get("/users/products", { params });
    const data = response.data?.data || [];

    // Ánh xạ dữ liệu từ Backend -> UI
    return (data as BackendProductItem[]).map((item) => ({
      id: item.id,
      name: item.title,

      // Logic lấy giá từ cấu trúc sâu
      priceVnd: item.sizes?.[0]?.colors?.[0]?.price || 0,

      // Nếu API không trả rating, mặc định là 5
      rating: item.rating || 5.0,

      image: item.avatar,

      // Map category để UI lọc/hiển thị
      category: {
        id: item.category?.categoryId, // Map categoryId từ backend
        name: item.category?.name || "",
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
    // Trả về nguyên mảng data chứa cấu trúc cây
    return response.data?.data || [];
  } catch (error) {
    console.error("Get categories error:", error);
    throw error;
  }
};
