import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Rating,
  Popover,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import type { ReviewData } from "../types";
import { statusConfig } from "../constants";
import { truncateText } from "../utils";

interface Props {
  reviews: ReviewData[];
  loading: boolean;
  onRowClick: (review: ReviewData) => void;
  onUpdateStatus: (id: string, status: "approved" | "rejected") => void;
}

const ReviewsTable: React.FC<Props> = ({
  reviews,
  loading,
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

  const handleStatusChange = (newStatus: "approved" | "rejected") => {
    if (selectedReviewId) {
      onUpdateStatus(selectedReviewId, newStatus);
    }
    handleClose();
  };

  return (
    <>
      <Box sx={{
        overflow: "auto",
        minHeight: "600px",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Header Row */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "80px 1fr 150px 100px 1fr 100px",
            gap: 1,
            mb: 1,
            px: 1,
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#000" }}>
            Mã đánh giá
          </Typography>
          <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#000" }}>
            Tên sản phẩm
          </Typography>
          <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#000" }}>
            Tên khách
          </Typography>
          <Typography
            sx={{ fontSize: 15, fontWeight: 700, color: "#000", textAlign: "center" }}
          >
            Đánh giá
          </Typography>
          <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#000" }}>
            Nội dung
          </Typography>
          <Typography
            sx={{ fontSize: 15, fontWeight: 700, color: "#000", textAlign: "center" }}
          >
            Trạng thái
          </Typography>
        </Box>

        {/* Loading / Data Rows */}
        <Box sx={{ flex: 1, position: "relative" }}>  
        {loading ? (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <Paper
              key={review.id}
              onClick={() => onRowClick(review)}
              sx={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 150px 100px 1fr 100px",
                gap: 1,
                alignItems: "center",
                p: 2,
                mb: 1.5,
                borderRadius: "12px",
                cursor: "pointer",
                transition: "0.2s",
                backgroundColor: review.status === "rejected" ? "#f0f0f0" : "white",
                opacity: review.status === "rejected" ? 0.75 : 1,
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transform: "translateY(-2px)",
                },
              }}
              elevation={0}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#333",
                  whiteSpace: "normal",
                  overflowWrap: "break-word",
                }}
              >
                {review.review_id}
              </Typography>

              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#555",
                  whiteSpace: "normal",
                  overflowWrap: "break-word",
                }}
              >
                {review.product_name}
              </Typography>

              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#555",
                  whiteSpace: "normal",
                  overflowWrap: "break-word",
                }}
              >
                {review.username}
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Rating value={review.rating} readOnly size="small" />
              </Box>

              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#555",
                  whiteSpace: "normal",
                  overflowWrap: "break-word",
                }}
              >
                {truncateText(review.content, 30)}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={(e) => handleStatusClick(e, review.id)}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 600,
                    textAlign: "center",
                    px: 1,
                    py: 0.5,
                    borderRadius: "8px",
                    whiteSpace: "normal",
                    overflowWrap: "break-word",
                    bgcolor: (() => {
                      const c = statusConfig[review.status]?.color;
                      switch (c) {
                        case "warning":
                          return "#FFF8E1";
                        case "success":
                          return "#E8F5E9";
                        case "error":
                          return "#FFEBEE";
                        default:
                          return "#F5F5F5";
                      }
                    })(),
                    color: (() => {
                      const c = statusConfig[review.status]?.color;
                      switch (c) {
                        case "warning":
                          return "#FBC02D";
                        case "success":
                          return "#4CAF50";
                        case "error":
                          return "#F44336";
                        default:
                          return "#333";
                      }
                    })(),
                  }}
                >
                  {statusConfig[review.status]?.label || review.status}
                </Typography>
              </Box>
            </Paper>
          ))
        ) : (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography color="textSecondary">Không tìm thấy đánh giá</Typography>
          </Box>
        )}
        </Box>
      </Box>

      {/* Popover menu chọn trạng thái */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Box sx={{ minWidth: 160, py: 1 }}>
          <MenuItem onClick={() => handleStatusChange("approved")}>
            <ListItemIcon>
              <CheckCircleOutlineIcon fontSize="small" color="success" />
            </ListItemIcon>
            <ListItemText primary="Duyệt" />
          </MenuItem>

          <MenuItem onClick={() => handleStatusChange("rejected")}>
            <ListItemIcon>
              <VisibilityOffIcon fontSize="small" color="warning" />
            </ListItemIcon>
            <ListItemText primary="Ẩn" />
          </MenuItem>
        </Box>
      </Popover>
    </>
  );
};

export default ReviewsTable;