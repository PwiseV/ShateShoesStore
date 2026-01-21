import api from "./axios"; // Config axios của bạn

// ==========================================
// 1. TYPE DEFINITIONS
// ==========================================

export interface Address {
  id: number;
  content: string; // Chuỗi hiển thị: "123 Đường A,..."
  isDefault: boolean;
  // Các trường chi tiết để bind vào Modal
  street?: string;
  ward?: string;
  district?: string;
  city?: string;
  country?: string;
}

export interface UserProfile {
  username: string;
  name: string;
  email: string;
  phone: string;
  avatar: string; // URL ảnh
  addresses: Address[];
}

// Dữ liệu từ Form Cập nhật Profile
export interface UpdateProfileDTO {
  name: string;
  phone: string;
  avatar?: File | string; // Có thể là File mới hoặc URL cũ
}

// Dữ liệu từ Form Địa chỉ
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

// GET: Lấy thông tin user
export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await api.get("/user/profile");
  return response.data;
};

// PUT: Cập nhật Profile (Dùng FormData cho Avatar)
export const updateUserProfile = async (
  data: UpdateProfileDTO,
): Promise<UserProfile> => {
  const formData = new FormData();

  // Append các trường text
  formData.append("name", data.name);
  formData.append("phone", data.phone);

  // Chỉ append Avatar nếu người dùng có chọn file mới
  if (data.avatar && data.avatar instanceof File) {
    formData.append("avatar", data.avatar);
  }

  // Gửi request với Content-Type multipart/form-data
  const response = await api.put("/user/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// POST: Thêm địa chỉ
export const addUserAddress = async (data: AddressDTO): Promise<Address[]> => {
  const response = await api.post("/user/addresses", data);
  return response.data; // Trả về danh sách địa chỉ mới
};

// PUT: Cập nhật địa chỉ
export const updateUserAddress = async (
  id: number,
  data: AddressDTO,
): Promise<Address[]> => {
  const response = await api.put(`/user/addresses/${id}`, data);
  return response.data;
};

// DELETE: Xóa địa chỉ
export const deleteUserAddress = async (id: number): Promise<Address[]> => {
  const response = await api.delete(`/user/addresses/${id}`);
  return response.data;
};
