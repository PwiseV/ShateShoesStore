import api from "./axios";

/* ============================
   TYPES
============================ */

export type ProductImage = {
  id: string;
  src: string;
  alt?: string;
};

// (Đã xóa ProductOption vì có vẻ không dùng đến, nếu cần thì giữ lại)

export type Rating = {
  value: number;
  count: number;
};

// (Đã xóa Type Review cũ và RelatedProduct vì không còn dùng trong object Product)

export type ProductColorVariant = {
  colorId: string;
  color: string;
  price: number;
  stock: number;
};

export type ProductSizeVariant = {
  sizeId: string;
  size: number;
  colors: ProductColorVariant[];
};

export type ParentCategory = {
  id: string;
  name: string;
  slug: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  parent?: ParentCategory;
};

// --- CẬP NHẬT TYPE PRODUCT CHÍNH ---
export type Product = {
  id: string;
  title: string;
  category: Category;
  description: string[];
  tag: string[];
  avatar: ProductImage[];
  rating: Rating;
  sizes: ProductSizeVariant[];
  // Đã xóa reviews và related để khớp với dữ liệu thực tế
};

/* ============================
   NEW TYPES (Các type mới thêm)
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
  productId: string;
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
   PRODUCT APIS
============================ */

// 1. GET PRODUCT DETAILS
// Endpoint: /users/products/:productid
export const getProductDetails = async (
  id: string,
  signal?: AbortSignal
): Promise<Product> => {
  try {
    // Bỏ encodeURIComponent -> URL gọn hơn
    const response = await api.get(`/users/products/${id}`, { signal });
    return response.data;
  } catch (error) {
    console.error("Get product details error:", error);
    throw error;
  }
};

// 2. GET PRODUCT REVIEWS
// Endpoint: /users/reviews/:productid
export const getProductReviews = async (
  productId: string,
  signal?: AbortSignal
): Promise<ProductReview[]> => {
  try {
    const response = await api.get(`/users/reviews/${productId}`, { signal });
    return response.data;
  } catch (error) {
    console.error("Get reviews error:", error);
    throw error;
  }
};

// 3. GET PROMOTION
// Endpoint: /users/promotions?productId=...
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

// 4. ADD TO CART
// Endpoint: /users/cart/item (POST)
export const addToCart = async (
  payload: AddToCartRequest
): Promise<AddToCartResponse> => {
  try {
    const response = await api.post(`/users/cart/item`, payload);
    return response.data;
  } catch (error: any) {
    console.error("Add to cart error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Lỗi kết nối đến server",
    };
  }
};

// 5. ADD TO WISHLIST
// Endpoint: /users/favorites (POST)
export const addToWishlist = async (
  productId: string
): Promise<WishlistResponse> => {
  try {
    const response = await api.post(`/users/favorites`, { productId });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Lỗi thêm yêu thích",
    };
  }
};

// 6. REMOVE FROM WISHLIST
// Endpoint: /users/favorites (DELETE)
export const removeFromWishlist = async (
  productId: string
): Promise<WishlistResponse> => {
  try {
    const response = await api.delete(`/users/favorites`, {
      data: { productId },
    });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Lỗi xóa yêu thích",
    };
  }
};
