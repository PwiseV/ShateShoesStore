import api from "./axios";

// 1. Định nghĩa Type chuẩn theo Backend Response
export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderItem = {
  orderItemId: string;
  quantity: number;
  price: number;
  variantId: string;
  size: string;
  color: string;
  productId: string;
  title: string;
  code: string;
  avatar: string;
};

export type Order = {
  orderId: string; // ID dùng để gọi API
  orderNumber: string; // Mã đơn hàng hiển thị (ORD-...)
  status: OrderStatus;
  total: number; // Tổng tiền
  name: string;
  phone: string;
  address: string; // Địa chỉ người nhận
  shippingFee: number;
  shippingDuration: number;
  fromAddress: string;
  paymentMethod: "COD" | "Banking";
  createdAt: string; // ISO Date
  arrivedAt: string; // ISO Date
  items: OrderItem[]; // Danh sách sản phẩm
};

export interface OrderListResponse {
  data: Order[];
}

/* ============================
   USER HISTORY APIS
============================ */

// GET LIST: /users/my-orders?status=...
export const getOrders = async (params: {
  status?: string; // status string từ query params
  search?: string; // (Nếu backend hỗ trợ search, giữ lại hoặc bỏ tùy backend)
}): Promise<OrderListResponse> => {
  try {
    const apiParams: any = {};
    if (params.status && params.status !== "all") {
      apiParams.status = params.status;
    }

    // Lưu ý: Endpoint là /users/my-orders
    const response = await api.get("/users/my-orders", { params: apiParams });
    return response.data; // Trả về { data: [...] }
  } catch (error) {
    console.error("Get orders list error:", error);
    throw error;
  }
};

// GET DETAIL: /users/my-orders/:id
export const getOrderById = async (id: string): Promise<Order> => {
  try {
    const response = await api.get(`/users/my-orders/${id}`);
    return response.data; // Trả về object Order trực tiếp
  } catch (error) {
    console.error(`Get order detail ${id} error:`, error);
    throw error;
  }
};

// CANCEL: PATCH /users/orders/:id
export const cancelOrder = async (
  id: string,
  reason?: string, // Backend không yêu cầu reason trong body ví dụ, nhưng giữ lại nếu cần mở rộng
): Promise<void> => {
  try {
    // Body chỉ cần status: "cancelled"
    await api.patch(`/users/orders/${id}`, {
      status: "cancelled",
    });
  } catch (error) {
    console.error(`Cancel order ${id} error:`, error);
    throw error;
  }
};

// RE-ORDER (Giữ nguyên hoặc cập nhật nếu có endpoint mới)
export const reOrder = async (id: string): Promise<void> => {
  try {
    // Ví dụ giả định, nếu backend chưa có thì giữ nguyên logic cũ hoặc gọi add-to-cart
    // await api.post(`/users/orders/${id}/reorder`);
    console.log("Reorder logic here for", id);
  } catch (error) {
    console.error(`Reorder ${id} error:`, error);
    throw error;
  }
};

// Helper tính toán số lượng (Vì API list không trả về count tổng quan)
// Bạn có thể phải tự tính ở frontend hoặc gọi API thống kê riêng nếu có
export const getOrderCounts = async () => {
  // Tạm thời trả về 0 hoặc fetch all để đếm (không khuyến khích nếu data lớn)
  return { all: 0, pending: 0, shipping: 0, delivered: 0, cancelled: 0 };
};
