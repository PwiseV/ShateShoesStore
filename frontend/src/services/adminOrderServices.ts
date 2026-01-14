import api from "./axios";
import type { OrderData, OrderItem } from "../pages/Admin/Orders/types";

// Định nghĩa kiểu dữ liệu trả về từ API phân trang của BE
export interface OrderResponse {
  data: OrderData[];
  total: number;
  page: number;
  pageSize: number;
}

// 1. Lấy danh sách đơn hàng (kèm lọc và phân trang)
export const getAdminOrders = async (params: any): Promise<OrderResponse> => {
  try {
    const response = await api.get("/admin/orders", { params });
    return response.data; // Trả về { data, total, page, pageSize }
  } catch (error) {
    console.error("Lấy danh sách đơn hàng thất bại:", error);
    throw error;
  }
};

// 2. Lấy chi tiết một đơn hàng (để hiện Modal có mảng items)
export const getOrderDetail = async (id: string): Promise<OrderData> => {
  try {
    const response = await api.get(`/admin/orders/${id}`);
    return response.data; // BE trả về object Order + mảng items đã populate
  } catch (error) {
    console.error("Lấy chi tiết đơn hàng thất bại:", error);
    throw error;
  }
};

// 3. Cập nhật đơn hàng (Status, thông tin khách...)
export const updateAdminOrder = async (
  id: string,
  payload: Partial<OrderData>
): Promise<{ message: string; data: OrderData }> => {
  try {
    const response = await api.patch(`/admin/orders/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error("Cập nhật đơn hàng thất bại:", error);
    throw error;
  }
};

// 4. Xóa đơn hàng
export const deleteAdminOrder = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await api.delete(`/admin/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error("Xóa đơn hàng thất bại:", error);
    throw error;
  }
};