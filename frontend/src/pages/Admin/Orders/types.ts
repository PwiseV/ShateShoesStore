// --- Entities ---
export interface OrderItem {
  id: string;
  productName: string;
  sku: string;
  quantity: number;
  price: number;
  total: number;
}

export interface OrderData {
  id: string;
  orderNumber: string;
  name: string;
  email?: string;
  phone: string;
  address: string;
  createdAt: string;
  total: number;
  paymentMethod: "COD" | "Banking" | "Credit card" | "Paypal";
  status:
    | "waitting_approval"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  items: OrderItem[];
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface OrderApiResponse {
  data: OrderData[];
  pagination: PaginationMeta;
}

// --- Request DTOs (Data Transfer Objects) ---

// Params cho GET
export interface GetOrdersParams {
  page?: number;
  limit?: number;
  keyword?: string;
  status?: string;
  paymentMethod?: string;
  minPrice?: number;
  maxPrice?: number;
}

// Body cho PATCH (Chuẩn JSON)
export interface UpdateOrderPayload {
  name?: string;
  phone?: string;
  address?: string;
  status?: string;
  paymentMethod?: string;
  items?: {
    id: string;
    sku: string;
    quantity: number;
  }[];
}
