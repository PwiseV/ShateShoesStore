export interface Address {
  address_id: number;
  name?: string; // Tên người nhận tại địa chỉ này
  phone?: string;
  street: string;
  ward: string;
  district: string;
  city: string;
  country: string;
  user_id: number;
}

// Item trong lịch sử mua hàng
export interface OrderHistoryItem {
  orderId: string;
  date: string;
  total: number;
  status: "Delivered" | "Shipping" | "Processing" | "Cancelled";
}

export interface User {
  userId: number;
  username: string;
  email: string;
  displayName: string;
  phone: string;
  role: "Admin" | "Customer";
  status: "active" | "blocked";
  orderCount?: number;
  totalSpent?: number;
  avatar_image_url?: string;
  created_at?: string;
  addresses: Address[]; // Danh sách địa chỉ
  orderItem?: OrderHistoryItem[]; // Lịch sử mua hàng
}
