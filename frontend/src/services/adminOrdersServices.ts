// import api from "./axios";
// import type {
//   OrderApiResponse,
//   OrderData,
//   OrderQueryParams, // Hoặc GetOrdersParams tuỳ vào tên bạn đặt trong file types
//   UpdateOrderPayload,
// } from "../pages/Admin/Orders/types";

import {
  getAdminOrdersMock,
  updateAdminOrderMock,
} from "./fakeAdminOrdersServices";

// XUẤT RA DƯỚI TÊN CHÍNH (Để hook sử dụng)
export const getAdminOrders = getAdminOrdersMock;
export const updateAdminOrder = updateAdminOrderMock;

// ===== ORDER ENDPOINTS =====

/**
 * GET /admin/orders
 * Lấy danh sách đơn hàng có phân trang và lọc
 */
// export const getAdminOrders = async (
//   params: OrderQueryParams
// ): Promise<OrderApiResponse> => {
//   try {
//     const response = await api.get("/admin/orders", { params });
//     return response.data;
//   } catch (error) {
//     console.error("getAdminOrders error:", error);
//     throw error;
//   }
// };

// /**
//  * GET /admin/orders/:id
//  * Lấy chi tiết một đơn hàng cụ thể
//  */
// export const getAdminOrderDetail = async (id: string): Promise<OrderData> => {
//   try {
//     const response = await api.get(`/admin/orders/${id}`);
//     // Lưu ý: Nếu backend trả về { data: OrderData }, hãy sửa thành response.data.data
//     // Dựa trên pattern axios của bạn thì thường là response.data
//     return response.data;
//   } catch (error) {
//     console.error("getAdminOrderDetail error:", error);
//     throw error;
//   }
// };

// /**
//  * PATCH /admin/orders/:id
//  * Cập nhật thông tin đơn hàng (Info, Status)
//  * Lưu ý:
//  * - Backend sẽ chặn sửa items nếu status đã là delivered/cancelled.
//  * - Frontend gửi payload JSON. Nếu backend bắt buộc FormData, cần convert ở đây.
//  */
// export const updateAdminOrder = async (
//   id: string,
//   payload: UpdateOrderPayload
// ): Promise<{ message: string; data?: OrderData }> => {
//   try {
//     const response = await api.patch(`/admin/orders/${id}`, payload);
//     return response.data;
//   } catch (error) {
//     console.error("updateAdminOrder error:", error);
//     throw error;
//   }
// };

// // Export mặc định object chứa các hàm (tuỳ chọn theo style của bạn)
// export default {
//   getAdminOrders,
//   getAdminOrderDetail,
//   updateAdminOrder,
// };
