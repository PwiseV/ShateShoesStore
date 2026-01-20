import api from "./axios";
import type { CartItem } from "../pages/Costumer/Cart/types";

// ===== CART ENDPOINTS =====

/**
 * Lấy danh sách sản phẩm trong giỏ hàng của người dùng hiện tại
 */
export const getCartItems = async (): Promise<CartItem[]> => {
  try {
    const response = await api.get("/api/cart");
    return response.data; // giả sử backend trả về mảng CartItem[]
  } catch (error) {
    console.error("getCartItems error:", error);
    throw error;
  }
};

/**
 * Thêm một sản phẩm (variant) vào giỏ hàng
 * @param payload - Thông tin item cần thêm (productId, size, color, quantity,...)
 */
export const addToCart = async (payload: {
  productId: number;
  size: string;
  color: string;
  quantity: number;
}): Promise<CartItem> => {
  try {
    const response = await api.post("/api/cart", payload);
    return response.data; // trả về CartItem vừa thêm
  } catch (error) {
    console.error("addToCart error:", error);
    throw error;
  }
};

/**
 * Cập nhật số lượng của một item trong giỏ
 * @param itemId - ID của item trong giỏ
 * @param quantity - Số lượng mới
 */
export const updateCartItemQty = async (
  itemId: number | string,
  quantity: number
): Promise<CartItem> => {
  try {
    const response = await api.patch(`/api/cart/${itemId}`, { quantity });
    return response.data;
  } catch (error) {
    console.error("updateCartItemQty error:", error);
    throw error;
  }
};

/**
 * Xóa một item khỏi giỏ hàng
 * @param itemId - ID của item cần xóa
 */
export const removeCartItem = async (
  itemId: number | string
): Promise<{ message: string }> => {
  try {
    const response = await api.delete(`/api/cart/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("removeCartItem error:", error);
    throw error;
  }
};

/**
 * Áp dụng mã giảm giá cho giỏ hàng hiện tại
 * @param couponCode - Mã giảm giá người dùng nhập
 */
export const applyCoupon = async (
  couponCode: string
): Promise<{ success: boolean; discount: number; message: string }> => {
  try {
    const response = await api.post("/api/cart/apply-coupon", { couponCode });
    return response.data; // giả sử backend trả về { success, discount, message }
  } catch (error) {
    console.error("applyCoupon error:", error);
    throw error;
  }
};

/**
 * Xóa mã giảm giá đang áp dụng (nếu có)
 */
export const removeCoupon = async (): Promise<{ message: string }> => {
  try {
    const response = await api.delete("/api/cart/coupon");
    return response.data;
  } catch (error) {
    console.error("removeCoupon error:", error);
    throw error;
  }
};

/**
 * Đặt hàng từ giỏ hàng hiện tại
 * @param payload - Thông tin đơn hàng (địa chỉ, phương thức thanh toán, ghi chú,...)
 */
export const placeOrder = async (payload: {
  shippingAddress: string;
  paymentMethod: string;
  note?: string;
}): Promise<{ success: boolean; orderId: string; message: string }> => {
  try {
    const response = await api.post("/api/orders", payload);
    return response.data;
  } catch (error) {
    console.error("placeOrder error:", error);
    throw error;
  }
};

export default {
  getCartItems,
  addToCart,
  updateCartItemQty,
  removeCartItem,
  applyCoupon,
  removeCoupon,
  placeOrder,
};
