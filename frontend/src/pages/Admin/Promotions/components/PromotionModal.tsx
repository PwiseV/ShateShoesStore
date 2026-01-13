import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Typography,
  Grid,
  Select,
  MenuItem,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { Promotion } from "../types";
import { getStatusColor } from "../utils";

interface PromotionModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Partial<Promotion>) => void;
  initialData?: Promotion | null;
}

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#fff",
    "& fieldset": { borderColor: "#E0E0E0" },
    "&:hover fieldset": { borderColor: "#567C8D" },
    "&.Mui-focused fieldset": { borderColor: "#567C8D", borderWidth: "1px" },
  },
  "& .MuiInputBase-input": {
    padding: "12px 14px",
    fontSize: "15px",
    color: "#555",
  },
};

const labelStyle = {
  fontWeight: 700,
  fontSize: "15px",
  color: "#2C3E50",
  mb: 0.5,
  display: "block",
};

const PromotionModal: React.FC<PromotionModalProps> = ({
  open,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discountType: "percentage",
    quantity: 100,
    discountAmount: "",
    minOrderAmount: "",
    startDate: "",
    endDate: "",
    status: "inactive",
  });

  useEffect(() => {
    if (initialData && open) {
      console.log(initialData);
      setFormData({
        code: initialData.code,
        description: initialData.description || "",
        discountType: initialData.discountType,
        quantity: initialData.stock,
        discountAmount: initialData.discountAmount.toString(),
        minOrderAmount: initialData.minOrderAmount.toString(),
        startDate: initialData.startedAt.split("T")[0],
        endDate: initialData.expiredAt.split("T")[0],
        status: initialData.active,
      });
    } else if (!initialData && open) {
      setFormData({
        code: "",
        description: "",
        discountType: "percentage",
        quantity: 100,
        discountAmount: "",
        minOrderAmount: "",
        startDate: "",
        endDate: "",
        status: "active",
      });
    }
  }, [initialData, open]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.code) return;

    onSave({
      ...initialData,
      code: formData.code,
      description: formData.description,
      discountType: formData.discountType as any,
      discountAmount: Number(formData.discountAmount),
      minOrderAmount: Number(formData.minOrderAmount),
      startDate: formData.startDate,
      endDate: formData.endDate,
      totalQuantity: Number(formData.quantity),
      status: formData.status as any,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: "24px", padding: 2 } }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 800, color: "#2C3E50" }}>
          {initialData ? "Chỉnh sửa mã giảm giá" : "Tạo mã giảm giá"}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 16, top: 16, color: "#999" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Stack spacing={2.5}>
          <Box>
            <Typography sx={labelStyle}>Mã giảm giá</Typography>
            <TextField
              fullWidth
              placeholder="CODE123"
              value={formData.code}
              onChange={(e) => handleChange("code", e.target.value)}
              sx={inputStyle}
            />
          </Box>

          <Box>
            <Typography sx={labelStyle}>Mô tả</Typography>
            <TextField
              fullWidth
              placeholder="Mô tả..."
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              sx={inputStyle}
            />
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography sx={labelStyle}>Loại giảm giá</Typography>
              <Select
                fullWidth
                value={formData.discountType}
                onChange={(e) => handleChange("discountType", e.target.value)}
                sx={inputStyle}
              >
                <MenuItem value="percentage">Phần trăm</MenuItem>
                <MenuItem value="fixed">Số tiền cố định</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={labelStyle}>Số lượng phát hành</Typography>
              <TextField
                fullWidth
                type="number"
                value={formData.quantity}
                onChange={(e) => handleChange("quantity", e.target.value)}
                sx={inputStyle}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography sx={labelStyle}>Giá trị giảm</Typography>
              <TextField
                fullWidth
                placeholder="10"
                value={formData.discountAmount}
                onChange={(e) => handleChange("discountAmount", e.target.value)}
                sx={inputStyle}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography sx={labelStyle}>Đơn tối thiểu</Typography>
              <TextField
                fullWidth
                placeholder="0"
                value={formData.minOrderAmount}
                onChange={(e) => handleChange("minOrderAmount", e.target.value)}
                sx={inputStyle}
              />
            </Grid>
          </Grid>

          {/* CHỈ HIỂN THỊ KHI EDIT (CÓ INITIALDATA) */}
          {initialData && (
            <Box>
              <Typography sx={labelStyle}>Trạng thái hoạt động</Typography>
              <Select
                fullWidth
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
                sx={inputStyle}
              >
                <MenuItem value="active">
                  <Typography
                    sx={{ color: getStatusColor("active"), fontWeight: 600 }}
                  >
                    Hoạt động
                  </Typography>
                </MenuItem>

                <MenuItem value="inactive">
                  <Typography
                    sx={{ color: getStatusColor("inactive"), fontWeight: 600 }}
                  >
                    Tạm dừng
                  </Typography>
                </MenuItem>

                <MenuItem value="upcoming">
                  <Typography
                    sx={{ color: getStatusColor("upcoming"), fontWeight: 600 }}
                  >
                    Sắp diễn ra
                  </Typography>
                </MenuItem>

                <MenuItem value="expired">
                  <Typography
                    sx={{ color: getStatusColor("expired"), fontWeight: 600 }}
                  >
                    Hết hạn
                  </Typography>
                </MenuItem>
              </Select>
            </Box>
          )}

          <Box>
            <Typography sx={labelStyle}>Thời gian áp dụng</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  type="date"
                  fullWidth
                  value={formData.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  sx={inputStyle}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="date"
                  fullWidth
                  value={formData.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                  sx={inputStyle}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ pt: 2 }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                bgcolor: "#567C8D",
                width: "100%",
                py: 1.5,
                borderRadius: "12px",
                fontWeight: 700,
                fontSize: "16px",
                textTransform: "none",
                boxShadow: "0 4px 14px rgba(86, 124, 141, 0.4)",
                "&:hover": { bgcolor: "#456372" },
              }}
            >
              {initialData ? "Lưu thay đổi" : "Tạo mã ngay"}
            </Button>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default PromotionModal;
