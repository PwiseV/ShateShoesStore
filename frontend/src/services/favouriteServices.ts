import api from "./axios";

// 1. Định nghĩa Type dựa trên Frontend cần (Mapped từ ERD)
export interface FavouriteProduct {
  id: string;
  name: string;
  priceVnd: number;
  image: string;
  rating: number;
}

// 2. Định nghĩa Response trả về từ Server
export interface PaginatedFavouriteResponse {
  data: FavouriteProduct[];
  total: number;
  currentPage: number;
  totalPages: number;
}

/* ============================
   REAL API SERVICES
============================ */

export const getFavouriteList = async (
  page: number = 1,
  limit: number = 6,
): Promise<PaginatedFavouriteResponse> => {
  try {
    const response = await api.get("/user/favourites", {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching favourites:", error);
    throw error;
  }
};

export const addToFavourite = async (
  productId: string | number,
): Promise<void> => {
  try {
    await api.post("/user/favourites", { productId });
  } catch (error) {
    console.error("Error adding to favourites:", error);
    throw error;
  }
};

export const removeFromFavourite = async (
  productId: string | number,
): Promise<void> => {
  try {
    await api.delete(`/user/favourites/${productId}`);
  } catch (error) {
    console.error("Error removing from favourites:", error);
    throw error;
  }
};
