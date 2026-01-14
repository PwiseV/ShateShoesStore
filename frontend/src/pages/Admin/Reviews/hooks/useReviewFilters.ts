import { useState, useCallback } from "react";

interface UseReviewFiltersReturn {
  selectedStatus: string | null;
  selectedStar: number | null;
  handleStatusChange: (value: string) => void;
  handleStarsChange: (value: string) => void;
}

export const useReviewFilters = (
  onApplyFilters: (status: string[], stars: number[]) => void
): UseReviewFiltersReturn => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedStar, setSelectedStar] = useState<number | null>(null);

  const handleStatusChange = useCallback(
    (value: string) => {
      const newStatus = value === "all" ? null : value;
      setSelectedStatus(newStatus);
      onApplyFilters(
        newStatus ? [newStatus] : [],
        selectedStar ? [selectedStar] : []
      );
    },
    [selectedStar, onApplyFilters]
  );

  const handleStarsChange = useCallback(
    (value: string) => {
      const numValue = value === "all" ? null : Number(value);
      setSelectedStar(numValue);
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
