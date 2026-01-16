// 1. Address Type
export interface Address {
  addressId: string; // ID là string (VD: "6969109c...")
  isDefault: boolean; // true/false
  street: string;
  ward: string;
  district: string;
  city: string;
  country: string;
  Address?: string; // Chuỗi địa chỉ đầy đủ từ BE trả về
}

// 2. Order History Item
// Dựa trên mô tả User Detail: "orderItem"
export interface OrderHistoryItem {
  orderId: string;
  date: string;
  total: number;
  status: "Delivered" | "Shipping" | "Processing" | "Cancelled";
}

// 3. User Type
export interface User {
  userId: string;
  username: string;
  email: string;
  displayName: string;
  phone: string;
  role: "admin" | "customer";
  status: "active" | "blocked";

  avatar: string;
  createdAt: string;

  orderCount: number;
  totalSpent: number;

  addresses: Address[];

  // Field này có thể có khi gọi API chi tiết user
  orderItem?: OrderHistoryItem[];
}

// 4. API Response Wrappers

// Response cho GET /admin/users (Danh sách)
export interface GetUsersResponse {
  success: boolean;
  message: string;
  data: User[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Response cho GET /admin/users/:userId (Chi tiết)
// Theo mẫu, BE trả về object User trực tiếp hoặc bọc trong data,
// nhưng thường ta dùng chung Interface User cho data chi tiết.
export type UserDetailResponse = User;

// --- FORM / REQUEST TYPES ---

// Params khi gọi API Get Users
export interface GetUsersParams {
  page?: number;
  limit?: number;
  keyword?: string;
  role?: string;
  status?: string;
  order?: "asc" | "desc";
}

// Body khi gọi API Update User (PATCH)
export interface UpdateUserBody {
  email?: string;
  displayName?: string;
  phone?: string;
  role?: string;
  status?: string;
  addresses?: Address[];
}
