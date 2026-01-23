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
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: { borderRadius: "16px", p: 1 }
      }}
    >
      <DialogTitle sx={{ 
        fontWeight: 700, 
        fontSize: "1.25rem", 
        color: "#2C3E50",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        Chi tiết đánh giá
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          {/* Thông tin sản phẩm & Khách hàng */}
          <Box sx={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr", 
            gap: 2,
            bgcolor: "#F8F9FD",
            p: 2,
            borderRadius: "12px"
          }}>
            <Box>
              <Typography variant="caption" fontWeight={600} color="#7F8C8D" textTransform="uppercase">
                Khách hàng
              </Typography>
              <Typography variant="body2" fontWeight={600} color="#2C3E50">
                {review.username || "Khách ẩn danh"}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" fontWeight={600} color="#7F8C8D" textTransform="uppercase">
                Ngày tạo
              </Typography>
              <Typography variant="body2" fontWeight={600} color="#2C3E50">
                {new Date(review.createdAt).toLocaleDateString("vi-VN")}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="caption" fontWeight={600} color="#7F8C8D" textTransform="uppercase">
              Sản phẩm
            </Typography>
            <Typography variant="body1" fontWeight={600} color="#567C8D">
              {review.title}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" fontWeight={600} color="#7F8C8D" textTransform="uppercase" sx={{ mb: 0.5, display: "block" }}>
              Mức độ hài lòng
            </Typography>
            <Rating value={review.rating} readOnly size="medium" />
          </Box>

          <Box>
            <Typography variant="caption" fontWeight={600} color="#7F8C8D" textTransform="uppercase" sx={{ mb: 0.5, display: "block" }}>
              Nội dung phản hồi
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                p: 2, 
                bgcolor: "#fff", 
                border: "1px solid #E0E4EC", 
                borderRadius: "12px",
                fontStyle: "italic",
                lineHeight: 1.6
              }}
            >
              "{review.content}"
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" fontWeight={600} color="#7F8C8D" textTransform="uppercase" sx={{ mb: 1.5, display: "block" }}>
              Cập nhật trạng thái hiển thị
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5 }}>
              {Object.entries(statusConfig).map(([key, value]) => {
                const isActive = selectedStatus === key;
                const baseColor = value.color === "warning" ? "#FBC02D" : value.color === "success" ? "#4CAF50" : "#F44336";
                
                return (
                  <Button
                    key={key}
                    variant={isActive ? "contained" : "outlined"}
                    size="small"
                    onClick={() => setSelectedStatus(key as any)}
                    sx={{
                      flex: 1,
                      textTransform: "none",
                      borderRadius: "10px",
                      fontWeight: 600,
                      borderColor: isActive ? "transparent" : baseColor,
                      color: isActive ? "#fff" : baseColor,
                      backgroundColor: isActive ? baseColor : "transparent",
                      "&:hover": {
                        backgroundColor: isActive ? baseColor : `${baseColor}10`,
                        borderColor: baseColor,
                      },
                    }}
                  >
                    {value.label}
                  </Button>
                );
              })}
            </Box>
          </Box>
        </Stack>
      </DialogContent>

      <Divider sx={{ borderStyle: "dashed", my: 1 }} />

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button 
          onClick={onClose} 
          sx={{ color: "#7F8C8D", textTransform: "none", fontWeight: 600 }}
        >
          Đóng
        </Button>
        <Button 
          onClick={handleSave} 
          variant="contained"
          sx={{ 
            bgcolor: "#567C8D", 
            px: 4, 
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": { bgcolor: "#456371" }
          }}
        >
          Lưu thay đổi
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewDetailDialog;