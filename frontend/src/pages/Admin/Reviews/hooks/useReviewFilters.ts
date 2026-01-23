import { useState, useCallback } from "react";

interface UseReviewFiltersReturn {
  selectedStatus: string | null;
  selectedStar: number | null;
  handleStatusChange: (value: string) => void;
  handleStarsChange: (value: string) => void;
}

export const useReviewFilters = (
  // 1. Sửa kiểu dữ liệu ở tham số hàm callback: từ string[] -> string | null
  onApplyFilters: (status: string | null, rating: number | null) => void
): UseReviewFiltersReturn => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedStar, setSelectedStar] = useState<number | null>(null);

  const handleStatusChange = useCallback(
    (value: string) => {
      const newStatus = value === "all" ? null : value;
      setSelectedStatus(newStatus);
      // 2. Truyền trực tiếp giá trị, không bọc trong dấu []
      onApplyFilters(newStatus, selectedStar);
    },
    [selectedStar, onApplyFilters]
  );

  const handleStarsChange = useCallback(
    (value: string) => {
      const numValue = value === "all" ? null : Number(value);
      setSelectedStar(numValue);
      // 3. Truyền trực tiếp giá trị, không bọc trong dấu []
      onApplyFilters(selectedStatus, numValue);
    },
    [selectedStatus, onApplyFilters]
  );

  return {
    selectedStatus,
    selectedStar,
    handleStatusChange,
    handleStarsChange,
  };
};