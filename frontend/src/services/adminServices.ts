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
    return response.data;
  } catch (error) {
    console.error("Get dashboard overview error:", error);
    throw error;
  }
};

// Get new customers today
export const getDashboardNewCustomers = async (): Promise<NewCustomer[]> => {
  try {
    const response = await api.get("/admin/dashboard/new-customer");
    return response.data;
  } catch (error) {
    console.error("Get new customers error:", error);
    throw error;
  }
};


// Get new product items today
export const getDashboardPopularProducts = async (): Promise<ProductItem[]> => {
  try {
    const response = await api.get("/admin/dashboard/products");
    return response.data;
  } catch (error) {
    console.error("Get popular products error:", error);
    throw error;
  }
};

// Get product views last 7 days
export const getDashboardProductViewsLast7Days = async (): Promise<DayData[]> => {
  try {
    const response = await api.get("/admin/dashboard/product-views");
    return response.data;
  } catch (error) {
    console.error("Get popular products error:", error);
    throw error;
  }
};

// Get Comments
export const getDashboardComments = async (): Promise<CommentItem[]> => {
  try {
    const response = await api.get("/admin/dashboard/comments");
    return response.data;
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
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items?: OrderItem[];
}

// Response type for paginated orders
export interface OrderResponse {
  data: OrderData[];
  total: number;
  page: number;
  pageSize: number;
}

// Fetch all admin orders
export const getAdminOrders = async (params: any): Promise<OrderResponse> => {
  try {
    //  params (page, keyword, status...) to BE
    const response = await api.get("/admin/orders", { params });
    return response.data; 
  } catch (error) {
    console.error("Get admin orders error:", error);
    throw error;
  }
};

// Update an order by id. Payload can be partial OrderData.
export const updateAdminOrder = async (id: string, payload: any): Promise<OrderData> => {
  try {
    const response = await api.patch(`/admin/orders/${id}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};