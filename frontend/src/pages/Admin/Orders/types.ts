// ================== ENUM / UNION TYPES ==================

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "COD" | "Banking";

// ================== ENTITIES ==================

export interface OrderItem {
  id: string;

  quantity: number;
  price: number;
  subtotal?: number;

  sku?: string;

  product?: {
    _id?: string;
    title?: string;
    image?: string;
  };

  variant?: {
    size?: string;
    color?: string;
  };
}

export interface OrderData {
  id: string;
  orderNumber: string;

  name: string;
  phone: string;
  address: string;
  email?: string;

  status: OrderStatus;
  paymentMethod: PaymentMethod;

  total: number;
  createdAt: string;

  items: OrderItem[];
}

// ================== PAGINATION ==================

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ================== API RESPONSES ==================

export interface OrderApiResponse {
  data: OrderData[];
  pagination: PaginationMeta;
}

// ================== QUERY PARAMS ==================

export interface OrderQueryParams {
  page?: number;
  limit?: number;
  keyword?: string;
  status?: OrderStatus;
  paymentMethod?: PaymentMethod;
  minTotal?: number;
  maxTotal?: number;
}

// ================== UPDATE PAYLOAD ==================

export interface UpdateOrderPayload {
  name?: string;
  phone?: string;
  address?: string;
  email?: string;
  status?: OrderStatus;
  paymentMethod?: PaymentMethod;
}
