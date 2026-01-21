import api from "./axios"; // Giả định file cấu hình axios của bạn nằm ở đây
import type { CartItem, UpdateCartPayload } from "../pages/Customer/Cart/types";

// ===== CART ENDPOINTS =====

// 1. Lấy thông tin giỏ hàng
export const getCartItems = async (): Promise<CartItem[]> => {
  try {
    const response = await api.get("/users/cart");
    // Dựa trên mô tả response: { data: [...] }
    return response.data.data || response.data;
  } catch (error) {
    console.error("getCartItems error:", error);
    throw error;
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
