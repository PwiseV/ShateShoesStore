import React from "react";
import { Box, Pagination } from "@mui/material";
import type { ReviewData } from "../types";
import ReviewsTable from "./ReviewsTable";
import ReviewDetailDialog from "./ReviewDetailDialog";
import { FilterBar } from "./FilterBar";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";
import { useReviewFilters } from "../hooks/useReviewFilters";
import { useReviewDetail } from "../hooks/useReviewDetail";
import { useConfirmDelete } from "../hooks/useConfirmDelete";

interface Props {
  reviews: ReviewData[];
  loading: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
  onApplyFilters: (status: string[], stars: number[]) => void;
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: "pending" | "approved" | "rejected") => void;
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
  onDelete,
  onUpdateStatus,
}) => {
  // Extract filter logic
  const { selectedStatus, selectedStar, handleStatusChange, handleStarsChange } =
    useReviewFilters(onApplyFilters);

  // Extract detail modal logic
  const {
    selectedReview,
    detailModalOpen,
    handleOpenDetail,
    handleCloseDetail,
    handleUpdateStatus: handleDetailUpdateStatus,
  } = useReviewDetail();

  // Extract delete confirmation logic
  const {
    confirmDialogOpen,
    isDeleting,
    openConfirmDialog,
    closeConfirmDialog,
    confirmDelete,
  } = useConfirmDelete();

  const handleUpdateStatusWrapper = (
    status: "pending" | "approved" | "rejected"
  ) => {
    handleDetailUpdateStatus(onUpdateStatus, status);
  };

  const handleDeleteClick = (id: string) => {
    openConfirmDialog(id);
  };

  const handleConfirmDelete = () => {
    confirmDelete(onDelete);
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
        onDelete={handleDeleteClick}
        onUpdateStatus={onUpdateStatus}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => onPageChange(page)}
          />
        </Box>
      )}

      {/* Detail Dialog */}
      <ReviewDetailDialog
        review={selectedReview}
        open={detailModalOpen}
        onClose={handleCloseDetail}
        onStatusChange={handleUpdateStatusWrapper}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDeleteDialog
        open={confirmDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={closeConfirmDialog}
        isLoading={isDeleting}
      />
    </>
  );
};

export default MainContent;