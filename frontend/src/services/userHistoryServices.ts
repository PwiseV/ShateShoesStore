import api from "./axios"; // Giả định bạn dùng chung file axios với admin

/* ============================
   TYPES (Định nghĩa Type tại đây làm gốc)
============================ */

export type OrderStatus = "pending" | "shipping" | "delivered" | "cancelled";

export type OrderProduct = {
  id: string;
  name: string;
  variant: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
};

export type Order = {
  id: string;
  status: OrderStatus;
  statusLabel: string;
  totalAmount: number;
  shippingFee: number;
  paymentMethod: string;
  date: string;
  dates: {
    shipped?: string;
    delivered?: string;
    expected?: string;
  };
  deliveryDuration?: string;
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
  };
  products: OrderProduct[];
};

export interface OrderListResponse {
  data: Order[];
  total: number;
  totalPages: number;
}

export interface OrderCounts {
  all: number;
  pending: number;
  shipping: number;
  delivered: number;
  cancelled: number;
}

/* ============================
   USER HISTORY APIS
============================ */

// Get orders list
export const getOrders = async (params: {
  page?: number;
  limit?: number;
  status?: OrderStatus | "all";
  search?: string;
}): Promise<OrderListResponse> => {
  try {
    const apiParams = {
      page: params.page || 1,
      limit: params.limit || 10,
      status: params.status === "all" ? undefined : params.status,
      search: params.search,
    };

    const response = await api.get("/users/orders", { params: apiParams });
    return {
      data: response.data.data,
      total: response.data.pagination.total,
      totalPages: response.data.pagination.totalPages,
    };
  } catch (error) {
    console.error("Get orders list error:", error);
    throw error;
  }
};

// Get single order detail
export const getOrderById = async (id: string): Promise<Order> => {
  try {
    const response = await api.get(`/users/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Get order detail ${id} error:`, error);
    throw error;
  }
};

export const cancelOrder = async (
  id: string,
  reason?: string,
): Promise<void> => {
  try {
    await api.patch(`/users/orders/${id}/cancel`, { reason });
  } catch (error) {
    console.error(`Cancel order ${id} error:`, error);
    throw error;
  }
};

export const reOrder = async (id: string): Promise<void> => {
  try {
    await api.post(`/users/orders/${id}/reorder`);
  } catch (error) {
    console.error(`Re-order ${id} error:`, error);
    throw error;
  }
};

export const getOrderCounts = async (): Promise<OrderCounts> => {
  try {
    const response = await api.get("/users/orders/counts");
    return response.data;
  } catch (error) {
    console.error("Get order counts error:", error);
    throw error;
  }
};
