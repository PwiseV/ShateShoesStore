import api from "./axios";

export interface FavouriteProduct {
  favouriteId: string;
  productId: string;
  code: string;
  title: string;
  description: string;
  tag: string[];
  slug: string;
  avatar: string;
  category: {
    categoryId: string;
    name: string;
    slug: string;
    parent?: {
      categoryId: string;
      name: string;
      slug: string;
    };
  };
  stock: number;
  rating: number;
  min_price: number;
  sizes: Array<{
    size: string;
    colors: Array<{
      variantId: string;
      color: string;
      price: number;
      stock: number;
      avatar: string | null;
    }>;
  }>;
}

export interface GetFavouriteResponse {
  message: string;
  data: FavouriteProduct[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// [MỚI] Định nghĩa response cho hành động xóa
export interface RemoveFavouriteResponse {
  message: string;
  data: any;
}

/* ============================
   REAL API SERVICES
============================ */

export const getFavouriteList = async (
  page: number = 1,
  limit: number = 6,
): Promise<GetFavouriteResponse> => {
  try {
    const response = await api.get("/users/favorites", {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching favourites:", error);
    throw error;
  }
};

export const addToFavourite = async (productId: string): Promise<void> => {
  try {
    await api.post("/users/favorites", { productId });
  } catch (error) {
    console.error("Error adding to favourites:", error);
    throw error;
  }
};

// [CẬP NHẬT] Hàm xóa trả về RemoveFavouriteResponse thay vì void
export const removeFromFavourite = async (
  productId: string,
): Promise<RemoveFavouriteResponse> => {
  try {
    const response = await api.delete("/users/favorites", {
      data: { productId },
    });
    return response.data; // Trả về { message: "...", data: {...} }
  } catch (error) {
    console.error("Error removing from favourites:", error);
    throw error;
  }
};
