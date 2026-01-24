import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  CircularProgress,
  Rating,
  Popover,
  MenuItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { ReviewData } from "../types";
import { statusConfig } from "../constants";
import { truncateText } from "../utils";

// Định nghĩa Grid đồng nhất
const REVIEWS_GRID = "60px 1.5fr 1fr 120px 2fr 120px 60px";

interface Props {
  reviews: ReviewData[];
  loading: boolean;
  currentPage: number;
  pageSize: number;
  onRowClick: (review: ReviewData) => void;
  onUpdateStatus: (id: string, status: "active" | "hidden") => void;
}

const ReviewsTable: React.FC<Props> = ({
  reviews,
  loading,
  currentPage,
  pageSize,
  onRowClick,
  onUpdateStatus,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);

  const handleStatusClick = (e: React.MouseEvent<HTMLElement>, reviewId: string) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
    setSelectedReviewId(reviewId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedReviewId(null);
  };

  const handleStatusChange = (newStatus: "active" | "hidden") => {
    if (selectedReviewId) {
      onUpdateStatus(selectedReviewId, newStatus);
    }
    handleClose();
  };

  return (
    <>
      {/* Header - Theo đúng theme xanh Slate */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: REVIEWS_GRID,
          backgroundColor: "#567C8D",
          color: "white",
          py: 1.5,
          px: 2,
          borderRadius: "12px 12px 0 0",
          fontWeight: 600,
          fontSize: "0.8rem",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Box>#</Box>
        <Box textAlign="left">Sản phẩm</Box>
        <Box textAlign="left">Khách hàng</Box>
        <Box>Đánh giá</Box>
        <Box textAlign="left">Nội dung</Box>
        <Box>Trạng thái</Box>
        <Box>Sửa</Box>
      </Box>

      {/* Body - Dạng Stack spacing */}
      <Stack spacing={1.5} sx={{ mt: 1.5, minHeight: "400px" }}>
        {loading && <CircularProgress sx={{ alignSelf: "center", my: 4, color: "#567C8D" }} />}
        
        {!loading && reviews.length === 0 && (
          <Typography align="center" color="text.secondary" py={6}>
            Không tìm thấy đánh giá nào
          </Typography>
        )}

        {!loading &&
          reviews.map((review, index) => (
            <Box
              key={review.reviewId}
              onClick={() => onRowClick(review)}
              sx={{
                display: "grid",
                gridTemplateColumns: REVIEWS_GRID,
                backgroundColor: "white",
                py: 1.5,
                px: 2,
                borderRadius: "12px",
                alignItems: "center",
                textAlign: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                transition: "0.2s",
                cursor: "pointer",
                border: "1px solid transparent",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  borderColor: "#567C8D40",
                },
              }}
            >
              {/* STT */}
              <Typography color="#7f8c8d" fontSize="0.85rem">
                {index + 1 + (currentPage - 1) * pageSize}
              </Typography>

              {/* Tên sản phẩm */}
              <Typography
                fontWeight={600}
                textAlign="left"
                fontSize="0.85rem"
                color="#2C3E50"
                sx={{ pr: 1 }}
              >
                {truncateText(review.title || "Sản phẩm không tồn tại", 30)}
              </Typography>

              {/* Tên khách */}
              <Typography textAlign="left" color="#555" fontSize="0.85rem">
                {review.username || "Ẩn danh"}
              </Typography>

              {/* Rating */}
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Rating value={review.rating} readOnly size="small" sx={{ fontSize: "1rem" }} />
              </Box>

              {/* Nội dung */}
              <Typography textAlign="left" color="#7f8c8d" fontSize="0.85rem" sx={{ fontStyle: "italic" }}>
                "{truncateText(review.content, 40)}"
              </Typography>

              {/* Trạng thái - Badge style */}
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography
                  sx={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    px: 1.2,
                    py: 0.4,
                    borderRadius: "20px",
                    bgcolor: (() => {
                      const c = statusConfig[review.status]?.color;
                      if (c === "success") return "#E8F5E9";
                      if (c === "error") return "#FFEBEE";
                      return "#FFF8E1";
                    })(),
                    color: (() => {
                      const c = statusConfig[review.status]?.color;
                      if (c === "success") return "#2E7D32";
                      if (c === "error") return "#C62828";
                      return "#F9A825";
                    })(),
                  }}
                >
                  {statusConfig[review.status]?.label || review.status}
                </Typography>
              </Box>

              {/* Nút Action */}
              <Box>
                <IconButton
                  size="small"
                  onClick={(e) => handleStatusClick(e, review.reviewId)}
                  sx={{ color: "#567C8D" }}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          ))}
      </Stack>

      {/* Menu chọn trạng thái */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
            sx: { borderRadius: "10px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }
        }}
      >
        <Box sx={{ minWidth: 140, py: 0.5 }}>
          <MenuItem onClick={() => handleStatusChange("active")} sx={{ py: 1 }}>
            <ListItemIcon>
              <CheckCircleOutlineIcon fontSize="small" color="success" />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: "0.85rem" }} primary="Duyệt" />
          </MenuItem>

          <MenuItem onClick={() => handleStatusChange("hidden")} sx={{ py: 1 }}>
            <ListItemIcon>
              <VisibilityOffIcon fontSize="small" color="warning" />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: "0.85rem" }} primary="Ẩn" />
          </MenuItem>
        </Box>
      </Popover>
    </>
  );
};

export default ReviewsTable;