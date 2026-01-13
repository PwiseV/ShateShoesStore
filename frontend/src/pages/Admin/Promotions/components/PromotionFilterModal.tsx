import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { PromotionFilterState } from "../types";

interface Props {
  open: boolean;
  onClose: () => void;
  currentFilters: PromotionFilterState;
  onApply: (filters: PromotionFilterState) => void;
  onClear: () => void;
}

const radioStyle = {
  color: "#B0B0C0",
  "&.Mui-checked": { color: "#567C8D" },
};

const labelStyle = {
  fontWeight: 700,
  fontSize: "14px",
  color: "#2C3E50",
  mb: 1,
};

const PromotionFilterModal: React.FC<Props> = ({
  open,
  onClose,
  currentFilters,
  onApply,
  onClear,
}) => {
  // State tạm thời để người dùng chọn trước khi bấm Apply
  const [tempFilters, setTempFilters] =
    useState<PromotionFilterState>(currentFilters);

  // Mỗi khi mở modal, sync dữ liệu từ cha vào state tạm
  useEffect(() => {
    if (open) {
      setTempFilters(currentFilters);
    }
  }, [open, currentFilters]);

  const handleChange = (field: keyof PromotionFilterState, value: string) => {
    setTempFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: "20px", p: 1 } }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          Bộ lọc hiển thị
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Thời gian */}
          <Box>
            <Typography sx={labelStyle}>Thời gian</Typography>
            <FormControl fullWidth>
              <RadioGroup
                row
                value={tempFilters.timeRange}
                onChange={(e) => handleChange("timeRange", e.target.value)}
              >
                <Grid container>
                  <Grid size={6}>
                    <FormControlLabel
                      value="All"
                      control={<Radio sx={radioStyle} />}
                      label="Tất cả"
                    />
                  </Grid>
                  <Grid size={6}>
                    <FormControlLabel
                      value="Newest"
                      control={<Radio sx={radioStyle} />}
                      label="Mới nhất"
                    />
                  </Grid>
                  <Grid size={6}>
                    <FormControlLabel
                      value="Oldest"
                      control={<Radio sx={radioStyle} />}
                      label="Cũ nhất"
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
          </Box>

          {/* Loại giảm giá */}
          <Box>
            <Typography sx={labelStyle}>Loại giảm giá</Typography>
            <FormControl fullWidth>
              <RadioGroup
                row
                value={tempFilters.discountType}
                onChange={(e) => handleChange("discountType", e.target.value)}
              >
                <Grid container>
                  <Grid size={6}>
                    <FormControlLabel
                      value="All"
                      control={<Radio sx={radioStyle} />}
                      label="Tất cả"
                    />
                  </Grid>
                  <Grid size={6}>
                    <FormControlLabel
                      value="percentage"
                      control={<Radio sx={radioStyle} />}
                      label="Phần trăm (%)"
                    />
                  </Grid>
                  <Grid size={6}>
                    <FormControlLabel
                      value="fixed"
                      control={<Radio sx={radioStyle} />}
                      label="Số tiền cố định"
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
          </Box>

          {/* Trạng thái */}
          <Box>
            <Typography sx={labelStyle}>Trạng thái</Typography>
            <FormControl fullWidth>
              <RadioGroup
                row
                value={tempFilters.status}
                onChange={(e) => handleChange("status", e.target.value)}
              >
                <Grid container>
                  <Grid size={6}>
                    <FormControlLabel
                      value="All"
                      control={<Radio sx={radioStyle} />}
                      label="Tất cả"
                    />
                  </Grid>
                  <Grid size={6}>
                    <FormControlLabel
                      value="Hoạt động"
                      control={
                        <Radio
                          sx={{
                            ...radioStyle,
                            "&.Mui-checked": { color: "#2ECC71" },
                          }}
                        />
                      }
                      label="Hoạt động"
                    />
                  </Grid>
                  <Grid size={6}>
                    <FormControlLabel
                      value="Tạm dừng"
                      control={
                        <Radio
                          sx={{
                            ...radioStyle,
                            "&.Mui-checked": { color: "#F1C40F" },
                          }}
                        />
                      }
                      label="Tạm dừng"
                    />
                  </Grid>
                  <Grid size={6}>
                    <FormControlLabel
                      value="Hết hạn"
                      control={
                        <Radio
                          sx={{
                            ...radioStyle,
                            "&.Mui-checked": { color: "#E74C3C" },
                          }}
                        />
                      }
                      label="Hết hạn"
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClear}
          variant="outlined"
          fullWidth
          sx={{
            borderRadius: "10px",
            color: "#5E5B86",
            borderColor: "#DCDCE6",
            py: 1,
          }}
        >
          Xóa bộ lọc
        </Button>
        <Button
          onClick={() => onApply(tempFilters)}
          variant="contained"
          fullWidth
          sx={{
            borderRadius: "10px",
            bgcolor: "#567C8D",
            py: 1,
            "&:hover": { bgcolor: "#456372" },
          }}
        >
          Áp dụng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PromotionFilterModal;
