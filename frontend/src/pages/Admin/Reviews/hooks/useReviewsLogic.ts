// src/pages/Admin/Reviews/hooks/useReviewsLogic.ts
import { useState, useEffect } from "react";
import type { ReviewData } from "../types";
import {
  getReviews,
  updateReviewStatus,
  deleteReview,
} from "../../../../services/fakeAdminReviewServices"; // ← import fake service

export const useReviewsLogic = () => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string[]>([]);
  const [filterStars, setFilterStars] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        pageSize: itemsPerPage,
        search: searchTerm.trim() || undefined,
        status: filterStatus.length > 0 ? filterStatus : undefined,
        stars: filterStars.length > 0 ? filterStars : undefined,
        // productId: selectedProductId || undefined, // sau này thêm
      };

      const response = await getReviews(params);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchReviews();
}, [currentPage, searchTerm, filterStatus, filterStars]);

  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  const handleApplyFilters = (status: string[], stars: number[]) => {
    setFilterStatus(status);
    setFilterStars(stars);
    setCurrentPage(1);
  };

  const handleDeleteReview = async (id: string) => {
    try {
      await deleteReview(id);
      setReviews((prev) => prev.filter((review) => review.id !== id));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleUpdateReviewStatus = async (
    id: string,
    status: "pending" | "approved" | "rejected"
  ) => {
    try {
      await updateReviewStatus(id, status);
      setReviews((prev) =>
        prev.map((review) =>
          review.id === id ? { ...review, status } : review
        )
      );
    } catch (error) {
      console.error("Error updating review status:", error);
    }
  };

  return {
    reviews, // chỉ trả về danh sách đã phân trang
    loading,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalPages,
    handleApplyFilters,
    handleDeleteReview,
    handleUpdateReviewStatus,
  };
};