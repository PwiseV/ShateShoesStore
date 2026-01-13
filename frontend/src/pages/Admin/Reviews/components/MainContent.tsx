import React, { useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
} from "@mui/material";
import type { ReviewData } from "../types";
import ReviewsTable from "./ReviewsTable";
import ReviewDetailDialog from "./ReviewDetailDialog";

interface Props {
  reviews: ReviewData[];
  loading: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
  onApplyFilters: (status: string[], stars: number[]) => void; // vẫn giữ prop này
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
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedStar, setSelectedStar] = useState<number | null>(null);

  // Cập nhật hàm handle
  const handleStatusChange = (event: any) => {
    const value = event.target.value as string;
    setSelectedStatus(value === "all" ? null : value);
    onApplyFilters(
      value === "all" ? [] : [value],
      selectedStar ? [selectedStar] : []
    );
  };

  const handleStarsChange = (event: any) => {
    const value = event.target.value as string; // vì value có thể là "all" hoặc số dưới dạng string
    const numValue = value === "all" ? null : Number(value);
    setSelectedStar(numValue);
    onApplyFilters(
      selectedStatus ? [selectedStatus] : [],
      numValue ? [numValue] : []
    );
  };

  const [selectedReview, setSelectedReview] = useState<ReviewData | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const handleOpenDetail = (review: ReviewData) => {
    setSelectedReview(review);
    setDetailModalOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailModalOpen(false);
    setSelectedReview(null);
  };

  const handleUpdateStatus = (status: "pending" | "approved" | "rejected") => {
    if (selectedReview) {
      onUpdateStatus(selectedReview.id, status);
      handleCloseDetail();
    }
  };

  return (
    <>
      {/* Search + Filters Dropdown */}
      <Box sx={{ display: "flex", gap: 1.5, mb: 2, flexWrap: "wrap" }}>
        <TextField
          placeholder="Tìm kiếm tên sản phẩm, tên khách hàng, mã đánh giá..."
          size="small"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{
            flex: 1,
            minWidth: "300px",
            "& .MuiOutlinedInput-root": { borderRadius: "8px" },
          }}
        />

        {/* Dropdown Status */}
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Trạng thái</InputLabel>
          <Select
            value={selectedStatus || "all"}  // hiển thị "all" khi null
            onChange={handleStatusChange}
            label="Trạng thái"
            sx={{ borderRadius: "8px" }}
          >
            <MenuItem value="all" sx={{ fontStyle: "italic" }}>
              Tất cả trạng thái
            </MenuItem>
            <MenuItem value="pending">Chờ duyệt</MenuItem>
            <MenuItem value="approved">Đã duyệt</MenuItem>
            <MenuItem value="rejected">Ẩn</MenuItem>
          </Select>
        </FormControl>

        {/* Dropdown Số sao - single select */}
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Số sao</InputLabel>
          <Select
            value={selectedStar ?? "all"}  // hiển thị "all" khi null
            onChange={handleStarsChange}
            label="Số sao"
            sx={{ borderRadius: "8px" }}
          >
            <MenuItem value="all" sx={{ fontStyle: "italic" }}>
              Tất cả sao
            </MenuItem>
            {[1, 2, 3, 4, 5].map((star) => (
              <MenuItem key={star} value={star}>
                {star} sao
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <ReviewsTable
        reviews={reviews}
        loading={loading}
        onRowClick={handleOpenDetail}
        onDelete={onDelete}
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

      <ReviewDetailDialog
        review={selectedReview}
        open={detailModalOpen}
        onClose={handleCloseDetail}
        onStatusChange={handleUpdateStatus}
      />
    </>
  );
};

export default MainContent;