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