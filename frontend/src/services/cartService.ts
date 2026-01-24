import api from "./axios"; // Giả định file cấu hình axios của bạn nằm ở đây
import type { CartItem, UpdateCartPayload } from "../pages/Customer/Cart/types";

// ===== CART ENDPOINTS =====

// 1. Lấy thông tin giỏ hàng
export const getCartItems = async (): Promise<CartItem[]> => {
  try {
    const response = await api.get("/users/cart");
    console.log("Cart API Response:", response.data); // Debug log
    
    // Dựa trên mô tả response: { data: [...] }
    const cartData = response.data.data || response.data;
    
    // Validate response
    if (!Array.isArray(cartData)) {
      console.error("Invalid cart data format:", cartData);
      return [];
    }
    
    return cartData;
  } catch (error: any) {
    console.error("getCartItems error:", error);
    // Trả về mảng rỗng thay vì throw error để tránh crash app
    if (error.response?.status === 401) {
      throw new Error("Vui lòng đăng nhập để xem giỏ hàng");
    }
    throw new Error(error.response?.data?.message || "Không thể tải giỏ hàng");
  }
};

// 2. Cập nhật số lượng hoặc variant
export const updateCartItem = async (
  id: string,
  payload: UpdateCartPayload
): Promise<{ message: string }> => {
  try {
    const response = await api.patch(`/users/cart/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error("updateCartItem error:", error);
    throw error;
  }
};

// 3. Xóa sản phẩm
export const removeCartItem = async (
  id: string
): Promise<{ message: string }> => {
  try {
    const response = await api.delete(`/users/cart/${id}`);
    return response.data;
  } catch (error) {
    console.error("deleteCartItem error:", error);
    throw error;
  }
};

export default {
  getCartItems,
  updateCartItem,
  removeCartItem,
};
