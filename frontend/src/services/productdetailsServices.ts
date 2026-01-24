import api from "./axios";

/* ============================
   1. TYPES KHỚP VỚI BACKEND
============================ */

export type BackendCategory = {
  categoryId: string;
  name: string;
  slug: string;
  parent?: {
    categoryId: string;
    name: string;
    slug: string;
  };
};

export type BackendColorVariant = {
  variantId: string;
  color: string;
  price: number;
  stock: number;
  avatar?: string | { url: string; publicId: string };
};

export type BackendSizeVariant = {
  sizeId: string;
  size: string; // Backend trả về "36" (String)
  colors: BackendColorVariant[];
};

// Đây là cấu trúc chính xác của Product từ Backend trả về
export type Product = {
  id: string;
  productId: string;
  title: string;
  description: string;
  avatar: string;
  category: BackendCategory;
  stock: number;
  isFavourite: boolean;
  sizes: BackendSizeVariant[];
  tags: string[];
  rating?: {
    value: number;
    count: number;
  };
};

/* ============================
   2. TYPES PHỤ (Review, Cart...)
============================ */
export type ProductReview = {
  reviewId: string;
  rating: number;
  content: string;
  createdAt: string;
  size: string;
  color: string;
  author: string;
};

export type DiscountType = "PERCENTAGE" | "FIXED_AMOUNT";

export type Promotion = {
  promotionId: string;
  code: string;
  description: string;
  longDescription?: string;
  discountType: DiscountType;
  discountAmount: number;
};

export type AddToCartRequest = {
  variantId: string;
  quantity: number;
};

export type AddToCartResponse = {
  success: boolean;
  message: string;
};

export type WishlistResponse = {
  success: boolean;
  message: string;
};

/* ============================
   3. API CALLS
============================ */

// GET PRODUCT DETAILS
export const getProductDetails = async (
  id: string,
  signal?: AbortSignal
): Promise<Product> => {
  try {
    const response = await api.get(`/users/products/${id}`, { signal });
    const data = response.data.data;
    return { ...data, tags: data.tag || [] };
  } catch (error) {
    console.error("Get product details error:", error);
    throw error;
  }
};

// GET REVIEWS
export const getProductReviews = async (
  productId: string,
  signal?: AbortSignal
): Promise<ProductReview[]> => {
  try {
    const response = await api.get(`/users/reviews/product/${productId}`, { signal });
    return response.data.data || [];
  } catch (error) {
    return []; // Trả mảng rỗng nếu lỗi
  }
};

// GET PROMOTION
export const getProductPromotion = async (
  productId: string,
  signal?: AbortSignal
): Promise<Promotion | null> => {
  try {
    const response = await api.get(`/users/promotions`, {
      params: { productId },
      signal,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

// ADD TO CART
export const addToCart = async (
  payload: AddToCartRequest
): Promise<AddToCartResponse> => {
  try {
    const response = await api.post(`/users/cart`, payload);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Lỗi server",
    };
  }
};

// WISHLIST APIs
export const addToWishlist = async (
  productId: string
): Promise<WishlistResponse> => {
  try {
    const response = await api.post(`/users/favorites`, { productId });
    return response.data;
  } catch (error: any) {
    return { success: false, message: "Lỗi thêm yêu thích" };
  }
};

export const removeFromWishlist = async (
  productId: string
): Promise<WishlistResponse> => {
  try {
    const response = await api.delete(`/users/favorites`, {
      data: { productId },
    });
    return response.data;
  } catch (error: any) {
    return { success: false, message: "Lỗi xóa yêu thích" };
  }
};
