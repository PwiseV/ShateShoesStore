import api from "./axios";
import { type Promotion } from "../pages/Admin/Promotions/types.js";

/* ============================
    PROMOTION APIS
============================ */

export const getPromotions = async (params?: any): Promise<{
  data: Promotion[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}> => {
  try {
    const response = await api.get("/admin/promotions", { params });
    return response.data;
  } catch (error: any) {
    console.error("Get promotions error:", error);
    throw error.response?.data?.message || "Lỗi khi tải danh sách khuyến mãi";
  }
};

export const createPromotion = async (promotionData: Partial<Promotion>): Promise<any> => {
  try {
    const response = await api.post("/admin/promotions", promotionData);
    return response.data;
  } catch (error: any) {
    console.error("Create promotion error:", error);
    throw error.response?.data?.message || "Lỗi khi tạo khuyến mãi";
  }
};

export const updatePromotion = async (id: string, updateData: Partial<Promotion>): Promise<any> => {
  try {
    const response = await api.put(`/admin/promotions/${id}`, updateData);
    return response.data;
  } catch (error: any) {
    console.error("Update promotion error:", error);
    throw error.response?.data?.message || "Lỗi khi cập nhật khuyến mãi";
  }
};

export const deletePromotion = async (id: string): Promise<any> => {
  try {
    const response = await api.delete(`/admin/promotions/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Delete promotion error:", error);
    throw error.response?.data?.message || "Lỗi khi xóa khuyến mãi";
  }
};