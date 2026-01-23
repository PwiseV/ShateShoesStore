import { useState, useCallback } from "react";
import type { ReviewData } from "../types";

interface UseReviewDetailReturn {
  selectedReview: ReviewData | null;
  detailModalOpen: boolean;
  handleOpenDetail: (review: ReviewData) => void;
  handleCloseDetail: () => void;
  handleUpdateStatus: (
    onUpdateStatus: (id: string, status: "pending" | "active" | "hidden") => void,
    status: "pending" | "active" | "hidden"
  ) => void;
}

export const useReviewDetail = (): UseReviewDetailReturn => {
  const [selectedReview, setSelectedReview] = useState<ReviewData | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const handleOpenDetail = useCallback((review: ReviewData) => {
    setSelectedReview(review);
    setDetailModalOpen(true);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setDetailModalOpen(false);
    setSelectedReview(null);
  }, []);

  const handleUpdateStatus = useCallback(
    (
      onUpdateStatus: (id: string, status: "pending" | "active" | "hidden") => void,
      status: "pending" | "active" | "hidden"
    ) => {
      if (selectedReview) {
        onUpdateStatus(selectedReview.reviewId, status);
        handleCloseDetail();
      }
    },
    [selectedReview, handleCloseDetail]
  );

  return {
    selectedReview,
    detailModalOpen,
    handleOpenDetail,
    handleCloseDetail,
    handleUpdateStatus,
  };
};
