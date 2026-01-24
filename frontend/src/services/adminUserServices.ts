import api from "./axios";
import type {
  User,
  GetUsersParams,
  GetUsersResponse,
  UpdateUserBody,
} from "../pages/Admin/Users/types";

// ===== USER ENDPOINTS =====

// 1. Lấy danh sách Users (Phân trang, Lọc, Tìm kiếm)
// GET /admin/users
export const getUsers = async (
  params: GetUsersParams
): Promise<GetUsersResponse> => {
  try {
    const response = await api.get("/admin/users", { params });
    return response.data;
  } catch (error) {
    console.error("getUsers error:", error);
    throw error;
  }
};

// 3. Cập nhật thông tin User
// PATCH /admin/users/:userId
export const updateUser = async (
  userId: string,
  updateData: UpdateUserBody
): Promise<User> => {
  try {
    const response = await api.patch(`/admin/users/${userId}`, updateData);
    return response.data;
  } catch (error) {
    console.error("updateUser error:", error);
    throw error;
  }
};

// Export lẻ từng hàm và export default object
export default {
  getUsers,
  updateUser,
};
