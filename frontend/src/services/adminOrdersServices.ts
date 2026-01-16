import api from "./axios";
import type {
  OrderApiResponse,
  OrderData,
  OrderQueryParams,
  UpdateOrderPayload,
} from "../pages/Admin/Orders/types";

/**
 * GET /admin/orders
 */
export const getAdminOrders = async (
  params: OrderQueryParams
): Promise<OrderApiResponse> => {
  const res = await api.get("/admin/orders", { params });
  return res.data;
};

/**
 * GET /admin/orders/:id
 */
export const getAdminOrderDetail = async (
  id: string
): Promise<OrderData> => {
  const res = await api.get(`/admin/orders/${id}`);
  return res.data;
};

/**
 * PATCH /admin/orders/:id
 */
export const updateAdminOrder = async (
  id: string,
  payload: UpdateOrderPayload
): Promise<{ message: string; data: OrderData }> => {
  const res = await api.patch(`/admin/orders/${id}`, payload);
  return res.data;
};

export default {
  getAdminOrders,
  getAdminOrderDetail,
  updateAdminOrder,
};
