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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Định nghĩa đúng kiểu dữ liệu Filter
export interface UserFilterParams {
  role: string;
  status: string;
  sortMoney: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  currentFilters: UserFilterParams;
  onApply: (filters: UserFilterParams) => void;
  onClear: () => void;
}

const UserFiltersModal: React.FC<Props> = ({
  open,
  onClose,
  currentFilters,
  onApply,
  onClear,
}) => {
  const [localFilters, setLocalFilters] =
    useState<UserFilterParams>(currentFilters);

  useEffect(() => {
    if (open) {
      setLocalFilters(currentFilters);
    }
  }, [open, currentFilters]);

  const handleChange = (field: keyof UserFilterParams, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleClear = () => {
    onClear();
    onClose();
  };

  // Helper render Accordion
  const renderFilterSection = (
    title: string,
    field: keyof UserFilterParams,
    options: { label: string; value: string }[]
  ) => (
    <Accordion
      defaultExpanded
      sx={{
        borderRadius: "12px !important",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        "&:before": { display: "none" },
        mb: 2,
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ fontWeight: 600, color: "#34495e" }}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl component="fieldset">
          <RadioGroup
            value={localFilters[field]}
            onChange={(e) => handleChange(field, e.target.value)}
          >
            {options.map((opt) => (
              <FormControlLabel
                key={opt.value}
                value={opt.value}
                control={
                  <Radio
                    sx={{
                      color: "#567C8D",
                      "&.Mui-checked": { color: "#567C8D" },
                    }}
                  />
                }
                label={opt.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: "12px" } }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 600,
          fontSize: "18px",
          color: "#2C3E50",
        }}
      >
        Bộ lọc người dùng
        <IconButton onClick={onClose} size="small" sx={{ color: "#999" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: "16px", bgcolor: "#f8f9fa" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {/* 1. Vai trò (Khớp value với Mock Data) */}
          {renderFilterSection("Vai trò", "role", [
            { label: "Tất cả", value: "All" },
            { label: "Khách hàng", value: "Customer" },
            { label: "Quản trị viên", value: "Admin" },
          ])}

          {/* 2. Trạng thái */}
          {renderFilterSection("Trạng thái", "status", [
            { label: "Tất cả", value: "All" },
            { label: "Khả dụng (Active)", value: "active" },
            { label: "Bị chặn (Blocked)", value: "blocked" },
          ])}

          {/* 3. Tổng chi tiêu */}
          {renderFilterSection("Sắp xếp chi tiêu", "sortMoney", [
            { label: "Mặc định", value: "default" },
            { label: "Cao đến thấp", value: "high-low" },
            { label: "Thấp đến cao", value: "low-high" },
          ])}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: "16px", gap: "12px" }}>
        <Button
          onClick={handleClear}
          variant="outlined"
          sx={{
            textTransform: "none",
            color: "#666",
            borderColor: "#ddd",
            borderRadius: "8px",
            flex: 1,
            fontWeight: 600,
          }}
        >
          Xóa bộ lọc
        </Button>
        <Button
          onClick={handleApply}
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: "#567C8D",
            "&:hover": { backgroundColor: "#456372" },
            borderRadius: "8px",
            flex: 1,
            fontWeight: 600,
          }}
        >
          Áp dụng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserFiltersModal;
