import api from "./axios";

/* ============================
   TYPES
============================ */
// Cấu trúc response từ Backend (Theo PDF)
interface BackendProductItem {
  id: string;
  title: string;
  avatar: string;
  // Cấu trúc lồng nhau trong PDF
  sizes: {
    colors: {
      price: number;
    }[];
  }[];
  // Backend chưa có rating, ta sẽ handle null
  rating?: number;
}

export interface Product {
  id: string;
  name: string;
  priceVnd: number;
  rating: number;
  image: string;
}

export type Category = string;

/* ============================
   API FUNCTIONS
============================ */

export const getAllProducts = async (params?: {
  category?: string;
  keyword?: string;
  page?: number;
  limit?: number;
  // Backend chưa hỗ trợ sort, nhưng ta cứ truyền lên, nếu BE update thì tự chạy
  sort?: string;
}): Promise<Product[]> => {
  try {
    const response = await api.get("/users/products", { params });
    const data = response.data?.data || [];

    // Ánh xạ dữ liệu
    return (data as BackendProductItem[]).map((item) => ({
      id: item.id,
      name: item.title,
      // Logic lấy giá từ cấu trúc sâu
      priceVnd: item.sizes?.[0]?.colors?.[0]?.price || 0,
      // Nếu API không trả rating, mặc định là 5
      rating: item.rating || 5.0,
      image: item.avatar,
    }));
  } catch (error) {
    console.error("Get products error:", error);
    throw error;
  }
};

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get("/users/category");
    const data = response.data?.data || [];
    // Lấy trường 'name' từ object category
    return data.map((cat: any) => cat.name);
  } catch (error) {
    console.error("Get categories error:", error);
    throw error;
  }
};
