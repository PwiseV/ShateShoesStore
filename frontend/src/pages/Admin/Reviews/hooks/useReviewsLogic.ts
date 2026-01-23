import { useState, useEffect } from "react";
import type { ReviewData } from "../types";
import { useToast } from "../../../../context/useToast.ts"; // Thêm toast như bạn muốn
import {
  getReviews,
  updateReviewStatus,
  deleteReview,
} from "../../../../services/adminReviewServices";

export const useReviewsLogic = () => {
  const { showToast } = useToast();
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(false);

  // Pagination & Filter States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const [searchTerm, setSearchTerm] = useState("");
  // Cần định nghĩa type rõ ràng và giá trị mặc định là null
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterStars, setFilterStars] = useState<number | null>(null);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage, // Đổi pageSize thành limit cho khớp với Backend của bạn
        keyword: searchTerm.trim() || undefined, // Đổi search thành keyword cho khớp Backend
        status: filterStatus || undefined,
        rating: filterStars || undefined, // Đổi stars thành rating cho khớp Backend
      };

      const response = await getReviews(params);

      // Lưu ý: khớp key data/formattedReviews tùy theo cách bạn trả về từ BE
      setReviews(response.data || response.formattedReviews);
      setTotalPages(response.pagination?.totalPages || Math.ceil((response.total || 0) / itemsPerPage));
    } catch (error: any) {
      const msg = error.response?.data?.message || "Không thể tải danh sách đánh giá";
      showToast(msg, "error");
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch dữ liệu
  useEffect(() => {
    fetchReviews();
  }, [currentPage, searchTerm, filterStatus, filterStars]);

  // Nhận giá trị đơn lẻ từ hook useReviewFilters đã sửa ở bước trước
  const handleApplyFilters = (status: string | null, stars: number | null) => {
    setFilterStatus(status);
    setFilterStars(stars);
    setCurrentPage(1);
  };

  const handleDeleteReview = async (id: string) => {
    try {
      await deleteReview(id);
      showToast("Xóa đánh giá thành công", "success");
      fetchReviews();
    } catch (error: any) {
      showToast(error.response?.data?.message || "Xóa thất bại", "error");
    }
  };

  const handleUpdateReviewStatus = async (id: string, status: string) => {
    try {
      await updateReviewStatus(id, status);
      setReviews((prev) =>
        prev.map((r) => (r.reviewId === id ? { ...r, status } : r))
      );
      showToast("Cập nhật trạng thái thành công", "success");
    } catch (error: any) {
      showToast(error.response?.data?.message || "Cập nhật thất bại", "error");
    }
  };

  const handlePageChange = (_: unknown, value: number) => {
    setCurrentPage(value);
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