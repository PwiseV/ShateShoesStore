import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Rating,
} from "@mui/material";
import type { ReviewData } from "../types";
import { statusConfig } from "../constants";

interface Props {
  review: ReviewData | null;
  open: boolean;
  onClose: () => void;
  onStatusChange: (status: "pending" | "active" | "hidden") => void;
}

const ReviewDetailDialog: React.FC<Props> = ({
  review,
  open,
  onClose,
  onStatusChange,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<
    "pending" | "active" | "hidden"
  >(review?.status || "pending");

  React.useEffect(() => {
    if (review) {
      setSelectedStatus(review.status);
    }
  }, [review]);

  if (!review) return null;

  const handleSave = () => {
    onStatusChange(selectedStatus);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, fontSize: "18px" }}>
        Chi tiết đánh giá
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Review Code */}
          <Box>
            <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#999" }}>
              Mã đánh giá
            </Typography>
            <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
              {review.reviewId}
            </Typography>
          </Box>

          {/* Product Name */}
          <Box>
            <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#999" }}>
              Tên sản phẩm
            </Typography>
            <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
              {review.title}
            </Typography>
          </Box>

          {/* Customer Name */}
          <Box>
            <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#999" }}>
              Tên khách hàng
            </Typography>
            <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
              {review.username}
            </Typography>
          </Box>

          {/* Stars */}
          <Box>
            <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#999" }}>
              Số sao
            </Typography>
            <Rating value={review.rating} readOnly />
          </Box>

          {/* Review Content */}
          <Box>
            <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#999" }}>
              Nội dung đánh giá
            </Typography>
            <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
              {review.content}
            </Typography>
          </Box>

          {/* Status */}
          <Box>
            <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#999", mb: 1 }}>
              Trạng thái
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {Object.entries(statusConfig).map(([key, value]) => (
                <Button
                  key={key}
                  variant={selectedStatus === key ? "contained" : "outlined"}
                  size="small"
                  onClick={() => setSelectedStatus(key as "pending" | "active" | "hidden")}
                  sx={{
                    textTransform: "none",
                    borderColor: value.color === "warning" ? "#FBC02D" : value.color === "success" ? "#4CAF50" : "#F44336",
                    color: selectedStatus === key ? "#fff" : value.color === "warning" ? "#FBC02D" : value.color === "success" ? "#4CAF50" : "#F44336",
                    backgroundColor: selectedStatus === key ? (value.color === "warning" ? "#FBC02D" : value.color === "success" ? "#4CAF50" : "#F44336") : "transparent",
                  }}
                >
                  {value.label}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Created Date */}
          <Box>
            <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#999" }}>
              Ngày tạo
            </Typography>
            <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
              {new Date(review.createdAt).toLocaleDateString("vi-VN")}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Hủy
        </Button>
        <Button onClick={handleSave} variant="contained">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewDetailDialog;
