import type { CreateOrderPayload, Order } from "../pages/Customer/Checkout/types";
import api from "./axios";

// ===== ORDER ENDPOINTS =====

/**
 * [POST] Đặt hàng
 */
export const createOrder = async (
  payload: CreateOrderPayload
): Promise<{ success: boolean; orderId: string; message: string }> => {
  try {
    const response = await api.post("/api/orders", payload);
    return response.data;
  } catch (error) {
    console.error("createOrder error:", error);
    throw error;
  }
};

/**
 * [GET] Danh sách đơn hàng của user
 */
export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await api.get("/api/orders");
    return response.data;
  } catch (error) {
    console.error("getOrders error:", error);
    throw error;
  }
};

/**
 * [GET] Chi tiết đơn hàng
 */
export const getOrderById = async (orderId: string): Promise<Order> => {
  try {
    const response = await api.get(`/api/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("getOrderById error:", error);
    throw error;
  }
};

export default {
  createOrder,
  getOrders,
  getOrderById,
};
