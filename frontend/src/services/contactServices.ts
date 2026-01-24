import api from "./axios";

// ==========================================
// 1. TYPE DEFINITIONS
// ==========================================

export interface ContactDTO {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
}

export interface ContactResponse extends ContactDTO {
  _id: string;
  status: "new" | "processing" | "replied" | "closed";
  createdAt: string;
  updatedAt: string;
}

// Wrapper cho Response chuẩn của Backend
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ==========================================
// 2. SERVICES
// ==========================================


export const submitContact = async (
  data: ContactDTO
): Promise<ApiResponse<ContactResponse>> => {
  const response = await api.post<ApiResponse<ContactResponse>>(
    "users/contact",
    data
  );
  return response.data;
};

export const getAllContacts = async (): Promise<ContactResponse[]> => {
  const response = await api.get<ApiResponse<ContactResponse[]>>("users/contact");
  return response.data.data;
};
