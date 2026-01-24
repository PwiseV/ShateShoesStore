import api from "./axios";

/* ============================
   TYPES
============================ */

type StockState = "in stock" | "low stock" | "out of stock";

export interface OverviewResponse {
  sumCustomers: number;
  balanceAmount: string;
  customerTrend: number;
  balanceTrend: number;
}

export interface NewCustomer {
  id: string;
  username: string;
  email: string;
  avatar?: string | undefined;
  
}

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  status: StockState;
  avatar?: string | undefined;
}

export interface DayData {
  day: string;
  views: number;
}

export interface CommentItem {
  id: string;
  username: string;
  content: string;
  time: string;
  avatar?: string | undefined;
}

/* ============================
   DASHBOARD APIS
============================ */

// Get dashboard overview
export const getDashboardOverview = async (): Promise<OverviewResponse> => {
  try {
    const response = await api.get("/admin/dashboard/overview");
    console.log("data: ", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Get dashboard overview error:", error);
    throw error;
  }
};

// Get new customers today
export const getDashboardNewCustomers = async (): Promise<NewCustomer[]> => {
  try {
    const response = await api.get("/admin/dashboard/new-customers");
    return response.data.data;
  } catch (error) {
    console.error("Get new customers error:", error);
    throw error;
  }
};


// Get new product items today
export const getDashboardPopularProducts = async (): Promise<ProductItem[]> => {
  try {
    const response = await api.get("/admin/dashboard/popular-products");
    return response.data.data;
  } catch (error) {
    console.error("Get popular products error:", error);
    throw error;
  }
};

// Get product views last 7 days
export const getDashboardProductViewsLast7Days = async (): Promise<DayData[]> => {
  try {
    const response = await api.get("/admin/dashboard/order-views");
    return response.data.data;
  } catch (error) {
    console.error("Get popular products error:", error);
    throw error;
  }
};

// Get Comments
export const getDashboardComments = async (): Promise<CommentItem[]> => {
  try {
    const response = await api.get("/admin/dashboard/new-comments");
    return response.data.data;
  } catch (error) {
    console.error("Get comments error:", error);
    throw error;
  }
};

/* ============================
   ORDERS APIS
============================ */

export interface OrderItem {
  id: string;
  productName: string;
  sku?: string;
  quantity: number;
  price: number;
  total: number;
}

export interface OrderData {
  id: string;
  orderNumber: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  total: number;
  paymentMethod: string;
  status: string;
  items?: OrderItem[];
}

// Fetch all admin orders
export const getAdminOrders = async (): Promise<OrderData[]> => {
  try {
    const response = await api.get("/admin/orders");
    return response.data;
  } catch (error) {
    console.error("Get admin orders error:", error);
    throw error;
  }
};

// Update an order by id. Payload can be partial OrderData.
export const updateAdminOrder = async (
  id: string,
  payload: Partial<OrderData>
): Promise<OrderData> => {
  try {
    const response = await api.put(`/admin/orders/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error("Update admin order error:", error);
    throw error;
  }
};