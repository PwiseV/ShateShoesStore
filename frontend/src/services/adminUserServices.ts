import api from "./axios";
import type {
  User,
  Address,
  OrderHistoryItem,
} from "../pages/Admin/Users/type";

/* ============================
    TYPES DEFINITION
============================ */

export interface GetUsersParams {
  page?: number;
  limit?: number;
  keyword?: string;
  role?: "Admin" | "Customer";
  status?: "active" | "blocked";
  order?: "asc" | "desc";
}

// Kiểu dữ liệu trả về chi tiết User (bao gồm thêm addresses và orderItem)
export interface UserDetailResponse extends User {
  addresses: Address[];
  orderItem: OrderHistoryItem[];
}

// Kiểu dữ liệu body khi update User
export interface UpdateUserBody {
  email?: string;
  displayName?: string;
  phone?: string;
  role?: string;
  status?: string;
  addresses?: Address[];
}

/* ============================
    ADMIN USER MANAGEMENT APIS
============================ */

// 1. Lấy danh sách Users (Phân trang, Lọc, Tìm kiếm)
// GET /admin/users
export const getUsers = async (
  params?: GetUsersParams
): Promise<{
  data: User[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}> => {
  try {
    const response = await api.get("/admin/users", { params });
    return response.data;
  } catch (error: any) {
    console.error("Get users error:", error);
    throw error.response?.data?.message || "Lỗi khi tải danh sách người dùng";
  }
};


// 3. Cập nhật thông tin User (Full update)
// PUT /admin/users/:userId
export const updateUser = async (
  userId: number | string,
  updateData: UpdateUserBody
): Promise<any> => {
  try {
    const response = await api.patch(`/admin/users/${userId}`, updateData);
    return response.data;
  } catch (error: any) {
    console.error("Update user error:", error);
    throw (
      error.response?.data?.message || "Lỗi khi cập nhật thông tin người dùng"
    );
  }
};