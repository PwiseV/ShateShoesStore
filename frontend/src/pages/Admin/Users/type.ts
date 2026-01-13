// type.ts

export interface Address {
  address_id: number;
  name: string;
  phone: string;
  street: string;
  ward: string;
  district: string;
  city: string;
  country: string;
  user_id: number;
}

export interface User {
  userId: number;
  username: string;
  email: string;
  password?: string;
  displayName: string;
  phone: string;
  role: "Admin" | "Customer";
  avatar_image_url?: string;
  created_at?: string;
  updated_at?: string;
  addresses: Address[];
  status: "active" | "blocked";

  // Các field thống kê dùng cho UI (như trong hình)
  orderCount?: number;
  totalSpent?: number;
}

// Thêm Type cho Lịch sử mua hàng
export interface OrderHistoryItem {
  orderId: string;
  date: string;
  total: number;
  status: "Delivered" | "Shipping" | "Processing" | "Cancelled";
}
