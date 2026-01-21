import api from "./axios";

// ==========================================
// 1. TYPE DEFINITIONS (Khớp với Backend Response)
// ==========================================

export interface Address {
  addressId: string; // Backend trả về string ObjectId
  street: string;
  ward: string;
  district: string;
  city: string;
  country: string;
  Address: string; // Backend trả về key "Address" (viết hoa chữ A)
  isDefault: boolean;
}

export interface UserProfile {
  userId: string;
  username: string;
  email: string;
  displayName: string; // Backend dùng displayName
  phone: string;
  role: "admin" | "customer";
  status: "active" | "blocked";
  avatar: string;
  orderCount: number;
  totalSpent: number;
  createdAt: string;
  addresses: Address[];
}

// Wrapper cho Response chuẩn của Backend
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// DTO gửi đi khi cập nhật Profile
export interface UpdateProfileDTO {
  username?: string;
  displayName?: string;
  phone?: string;
  avatar?: File | string;
}

// DTO gửi đi khi thao tác Address
export interface AddressDTO {
  street: string;
  ward: string;
  district: string;
  city: string;
  country: string;
  isDefault: boolean;
}

// ==========================================
// 2. SERVICES
// ==========================================

/**
 * GET /users/users/:userId
 * Lấy thông tin chi tiết user (bao gồm cả addresses)
 */
export const getUserProfile = async (
): Promise<UserProfile> => {
  // Gọi API
  const response = await api.get<ApiResponse<UserProfile>>(
    `/users/profile`,
  );
  // Trả về object UserProfile nằm trong data
  return response.data.data;
};

/**
 * PATCH /users/users/:userId
 * Cập nhật thông tin User (dùng FormData để upload ảnh)
 */
export const updateUserProfile = async (
  data: UpdateProfileDTO,
): Promise<UserProfile> => {
  const formData = new FormData();
  if (data.displayName) formData.append("displayName", data.displayName);
  if (data.phone) formData.append("phone", data.phone);
  if (data.username) formData.append("username", data.username);

  if (data.avatar && data.avatar instanceof File) {
    formData.append("avatar", data.avatar);
  }

  const response = await api.patch<ApiResponse<UserProfile>>(
    `/users/profile`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );

  // Backend có thể trả về user đã update hoặc chỉ message success.
  // Nếu trả về data user mới thì return, không thì component sẽ tự fetch lại.
  return response.data.data;
};

/**
 * POST /users/addresses
 * Thêm địa chỉ mới
 */
export const addUserAddress = async (data: AddressDTO): Promise<any> => {
  const response = await api.post("/users/addresses", data);
  return response.data;
};

/**
 * PATCH /users/addresses/:addressId
 * Cập nhật địa chỉ
 */
export const updateUserAddress = async (
  addressId: string,
  data: AddressDTO,
): Promise<any> => {
  const response = await api.patch(`/users/addresses/${addressId}`, data);
  return response.data;
};

/**
 * DELETE /users/addresses/:addressId
 * Xóa địa chỉ
 */
export const deleteUserAddress = async (addressId: string): Promise<any> => {
  const response = await api.delete(`/users/addresses/${addressId}`);
  return response.data;
};
