import { useState, useCallback } from "react";

interface UseReviewFiltersReturn {
  selectedStatus: string | null;
  selectedStar: number | null;
  handleStatusChange: (value: string) => void;
  handleStarsChange: (value: string) => void;
}

export const useReviewFilters = (
  // Đã đổi tên tham số thành 'rating' cho khớp với Service
  onApplyFilters: (status: string[], rating: number[]) => void
): UseReviewFiltersReturn => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedStar, setSelectedStar] = useState<number | null>(null);

  const handleStatusChange = useCallback(
    (value: string) => {
      const newStatus = value === "all" ? null : value;
      setSelectedStatus(newStatus);

      // Gửi giá trị MỚI NHẤT của status và giá trị HIỆN TẠI của star
      onApplyFilters(
        newStatus ? [newStatus] : [],
        selectedStar ? [selectedStar] : []
      );
    },
    [selectedStar, onApplyFilters]
  );

  const handleStarsChange = useCallback(
    (value: string) => {
      // Chuyển string từ UI ("1") thành number (1)
      const numValue = value === "all" ? null : Number(value);
      setSelectedStar(numValue);

      // QUAN TRỌNG: Gửi numValue vừa tính toán, KHÔNG dùng selectedStar (vì state chưa kịp update)
      onApplyFilters(
        selectedStatus ? [selectedStatus] : [],
        numValue ? [numValue] : []
      );
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
