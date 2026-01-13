import api from "./axios";
// Sửa đường dẫn này trỏ đến file type.ts chứa interface User, Address, OrderHistoryItem của bạn
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
  role?: string; // 'Admin' | 'Customer'
  status?: string; // 'active' | 'blocked'
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

// 2. Lấy chi tiết User (bao gồm lịch sử mua hàng & địa chỉ)
// GET /admin/users/:userId
export const getUserDetail = async (
  userId: number | string
): Promise<UserDetailResponse> => {
  try {
    const response = await api.get(`/admin/users/${userId}`);
    return response.data;
  } catch (error: any) {
    console.error("Get user detail error:", error);
    // Xử lý riêng lỗi 404 nếu cần
    if (error.response?.status === 404) {
      throw "Không tìm thấy người dùng (User not found)";
    }
    throw (
      error.response?.data?.message ||
      "Lỗi khi lấy thông tin chi tiết người dùng"
    );
  }
};

// 3. Cập nhật thông tin User (Full update)
// PUT /admin/users/:userId
export const updateUser = async (
  userId: number | string,
  updateData: UpdateUserBody
): Promise<any> => {
  try {
    const response = await api.put(`/admin/users/${userId}`, updateData);
    return response.data;
  } catch (error: any) {
    console.error("Update user error:", error);
    throw (
      error.response?.data?.message || "Lỗi khi cập nhật thông tin người dùng"
    );
  }
};

// 4. Cập nhật trạng thái User (Active/Blocked)
// PATCH /admin/users/:userId/status
export const updateUserStatus = async (
  userId: number | string,
  status: "active" | "blocked"
): Promise<any> => {
  try {
    const response = await api.patch(`/admin/users/${userId}/status`, {
      status,
    });
    return response.data;
  } catch (error: any) {
    console.error("Update user status error:", error);
    throw (
      error.response?.data?.message || "Lỗi khi cập nhật trạng thái người dùng"
    );
  }
};
