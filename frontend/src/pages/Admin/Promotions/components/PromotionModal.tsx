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
import type { Promotion, PromotionStatus } from "../types";

interface PromotionModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Partial<Promotion>) => void;
  initialData?: Promotion | null;
}

// Style chung cho Input
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
  // Thêm trường status vào state
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discountType: "percentage",
    quantity: 10,
    discountValue: "",
    minOrderValue: "",
    startDate: "",
    endDate: "",
    status: "Hoạt động", // Mặc định là Hoạt động
  });

  // Load dữ liệu khi mở Modal (Edit mode)
  useEffect(() => {
    if (initialData && open) {
      setFormData({
        code: initialData.code,
        description: initialData.description || "",
        discountType: initialData.discountType,
        quantity: initialData.totalQuantity,
        discountValue: initialData.discountValue.toString(),
        minOrderValue: initialData.minOrderValue.toString(),
        startDate: initialData.startDate,
        endDate: initialData.endDate,
        status: initialData.status, // Load status cũ lên
      });
    } else if (!initialData && open) {
      // Reset form khi tạo mới
      setFormData({
        code: "",
        description: "",
        discountType: "percentage",
        quantity: 100,
        discountValue: "",
        minOrderValue: "",
        startDate: "",
        endDate: "",
        status: "Hoạt động",
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
      discountValue: Number(formData.discountValue),
      minOrderValue: Number(formData.minOrderValue),
      startDate: formData.startDate,
      endDate: formData.endDate,
      totalQuantity: Number(formData.quantity),
      remainingQuantity: Number(formData.quantity), // Reset sl còn lại = tổng sl (hoặc giữ nguyên tùy logic)
      status: formData.status as PromotionStatus, // Lưu status người dùng chọn
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
          {/* Mã giảm giá */}
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

          {/* Mô tả */}
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

          {/* Grid 1: Loại giảm & Số lượng */}
          <Grid container spacing={2}>
            <Grid size={6}>
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
            <Grid size={6}>
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

          {/* Grid 2: Giá trị giảm & Đơn tối thiểu */}
          <Grid container spacing={2}>
            <Grid size={6}>
              <Typography sx={labelStyle}>Giá trị giảm</Typography>
              <TextField
                fullWidth
                placeholder="10"
                value={formData.discountValue}
                onChange={(e) => handleChange("discountValue", e.target.value)}
                sx={inputStyle}
              />
            </Grid>
            <Grid size={6}>
              <Typography sx={labelStyle}>Đơn tối thiểu</Typography>
              <TextField
                fullWidth
                placeholder="0"
                value={formData.minOrderValue}
                onChange={(e) => handleChange("minOrderValue", e.target.value)}
                sx={inputStyle}
              />
            </Grid>
          </Grid>

          {/* [UPDATE] Grid 3: Thời gian & Trạng thái */}
          {/* Tôi gộp Trạng thái vào chung với phần Thời gian hoặc tách riêng */}
          <Box>
            <Typography sx={labelStyle}>Trạng thái hoạt động</Typography>
            <Select
              fullWidth
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              sx={inputStyle}
            >
              <MenuItem value="Hoạt động">
                <Box
                  component="span"
                  sx={{ color: "#2ECC71", fontWeight: 600 }}
                >
                  Hoạt động
                </Box>
              </MenuItem>
              <MenuItem value="Tạm dừng">
                <Box
                  component="span"
                  sx={{ color: "#F1C40F", fontWeight: 600 }}
                >
                  Tạm dừng
                </Box>
              </MenuItem>
              <MenuItem value="Hết hạn">
                <Box
                  component="span"
                  sx={{ color: "#E74C3C", fontWeight: 600 }}
                >
                  Hết hạn
                </Box>
              </MenuItem>
            </Select>
          </Box>

          <Box>
            <Typography sx={labelStyle}>Thời gian áp dụng</Typography>
            <Grid container spacing={2}>
              <Grid size={6}>
                <TextField
                  type="date"
                  fullWidth
                  value={formData.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  sx={inputStyle}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  type="date"
                  fullWidth
                  value={formData.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                  sx={inputStyle}
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
