// src/pages/Admin/Reviews/hooks/useReviewsLogic.ts
import { useState, useEffect } from "react";
import type { ReviewData } from "../types";
import {
  getReviews,
  updateReviewStatus,
  deleteReview,
} from "../../../../services/fakeAdminReviewServices";

export const useReviewsLogic = () => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(false);

  // Pagination & Filter States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string[]>([]);
  const [filterStars, setFilterStars] = useState<number[]>([]);

  // Fetch Reviews
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        pageSize: itemsPerPage,
        search: searchTerm.trim() || undefined,
        status: filterStatus.length > 0 ? filterStatus : undefined,
        stars: filterStars.length > 0 ? filterStars : undefined,
      };

      const response = await getReviews(params);

      setReviews(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch khi dependencies thay đổi
  useEffect(() => {
    fetchReviews();
  }, [currentPage, searchTerm, filterStatus, filterStars]);

  // Handle Filters
  const handleApplyFilters = (status: string[], stars: number[]) => {
    setFilterStatus(status);
    setFilterStars(stars);
    setCurrentPage(1);
  };

  // Handle Delete
  const handleDeleteReview = async (id: string) => {
    try {
      await deleteReview(id);
      await fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  // Handle Update Status
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

  // Handle Page Change
  const handlePageChange = (_event: unknown, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    reviews,
    loading,
    searchTerm,
    setSearchTerm,
    currentPage,
    handlePageChange,
    totalPages,
    handleApplyFilters,
    handleDeleteReview,
    handleUpdateReviewStatus,
  };
};