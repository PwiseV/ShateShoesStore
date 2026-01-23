// src/services/reviewService.ts
import api from "./axios";
import type { ReviewData, ReviewQueryParams, ReviewResponse } from "../pages/Admin/Reviews/types"; // điều chỉnh path nếu cần

// ===== REVIEW ENDPOINTS =====

export const getReviews = async (
  params: ReviewQueryParams
): Promise<ReviewResponse> => {
  try {
    const response = await api.get("/admin/reviews", { params });
    return response.data;
  } catch (error) {
    console.error("getReviews error:", error);
    throw error;
  }
};

export const updateReviewStatus = async (
  id: string,
  status: "pending" | "approved" | "rejected"
): Promise<ReviewData> => {
  try {
    const response = await api.patch(`/admin/reviews/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error("updateReviewStatus error:", error);
    throw error;
  }
};

export const deleteReview = async (
  id: string
): Promise<{ message: string }> => {
  try {
    const response = await api.delete(`/admin/reviews/${id}`);
    return response.data;
  } catch (error) {
    console.error("deleteReview error:", error);
    throw error;
  }
};

export default {
  getReviews,
  updateReviewStatus,
  deleteReview,
};