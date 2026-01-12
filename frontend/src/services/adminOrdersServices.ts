import type {
  OrderApiResponse,
  OrderData,
  GetOrdersParams,
  UpdateOrderPayload,
} from "../pages/Admin/Orders/types"; // Đường dẫn tuỳ chỉnh

// const API_BASE_URL = "https://your-api.com/api";
// Thay đổi URL này cho đúng server thật của bạn

// Giả sử dùng Mock cho demo này, nếu dùng thật thì bỏ comment fetch bên dưới
import {
  getAdminOrdersMock,
  updateAdminOrderMock,
} from "./fakeAdminOrdersServices";

// --- REAL SERVICE IMPLEMENTATION (Dùng cái này khi kết nối Backend thật) ---

/*
const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json", // ✅ QUAN TRỌNG: Bắt buộc để Backend nhận dạng JSON
      // "Authorization": `Bearer ${token}` 
    },
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `Lỗi ${response.status}`);
  }

  return response.json();
};

export const getAdminOrders = async (params: GetOrdersParams): Promise<OrderApiResponse> => {
  const query = new URLSearchParams();
  if (params.page) query.append("page", params.page.toString());
  if (params.limit) query.append("limit", params.limit.toString());
  if (params.keyword) query.append("keyword", params.keyword);
  if (params.status) query.append("status", params.status);
  if (params.paymentMethod) query.append("paymentMethod", params.paymentMethod);
  if (params.minPrice) query.append("minPrice", params.minPrice.toString());
  if (params.maxPrice) query.append("maxPrice", params.maxPrice.toString());

  return request<OrderApiResponse>(`${API_BASE_URL}/admin/orders?${query.toString()}`);
};

export const updateAdminOrder = async (
  id: string,
  payload: UpdateOrderPayload
): Promise<{ message: string; data: OrderData }> => {
  return request<{ message: string; data: OrderData }>(
    `${API_BASE_URL}/admin/orders/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(payload), // ✅ Body phải là JSON string
    }
  );
};
*/

// --- MOCK EXPORT (Dùng cái này để chạy test UI ngay) ---
export const getAdminOrders = getAdminOrdersMock;
export const updateAdminOrder = updateAdminOrderMock;
