import React from "react";
import { Box, Pagination } from "@mui/material";
import type { ReviewData } from "../types";
import ReviewsTable from "./ReviewsTable";
import ReviewDetailDialog from "./ReviewDetailDialog";
import { FilterBar } from "./FilterBar";
import { useReviewFilters } from "../hooks/useReviewFilters";
import { useReviewDetail } from "../hooks/useReviewDetail";

interface Props {
  reviews: ReviewData[];
  loading: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  currentPage: number;
  onPageChange: (_event: unknown, page: number) => void;
  totalPages: number;
  onApplyFilters: (status: string[], stars: number[]) => void;
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: "active" | "hidden") => void;
}

const MainContent: React.FC<Props> = ({
  reviews,
  loading,
  searchTerm,
  onSearchChange,
  currentPage,
  onPageChange,
  totalPages,
  onApplyFilters,
  onUpdateStatus,
}) => {
  const { selectedStatus, selectedStar, handleStatusChange, handleStarsChange } =
    useReviewFilters(onApplyFilters);
  const {
    selectedReview,
    detailModalOpen,
    handleOpenDetail,
    handleCloseDetail,
    handleUpdateStatus: handleDetailUpdateStatus,
  } = useReviewDetail();

  const handleUpdateStatusWrapper = (
    status: "active" | "hidden"
  ) => {
    handleDetailUpdateStatus(onUpdateStatus, status);
  };

  return (
    <>
      {/* Search + Filters */}
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
        selectedStar={selectedStar}
        onStarChange={handleStarsChange}
      />

      {/* Table */}
      <ReviewsTable
        reviews={reviews}
        loading={loading}
        onRowClick={handleOpenDetail}
        onUpdateStatus={onUpdateStatus}
      />

      <Box sx={{ display: "flex", justifyContent: "end", mt: 3, gap: 1 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => onPageChange(_, page)}
          shape="rounded"
          color="primary"
        />
      </Box>

      {/* Detail Dialog */}
      <ReviewDetailDialog
        review={selectedReview}
        open={detailModalOpen}
        onClose={handleCloseDetail}
        onStatusChange={handleUpdateStatusWrapper}
      />
    </>
  );
};

export default MainContent;