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
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Helper format tiền tệ (VND)
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

interface Props {
  open: boolean;
  onClose: () => void;
  categoryFilter: string;
  setCategoryFilter: (v: string) => void;
  priceRange: [number, number]; // [min, max]
  setPriceRange: (v: [number, number]) => void;
  onClear: () => void;
}

const ProductFiltersModal: React.FC<Props> = ({
  open,
  onClose,
  categoryFilter,
  setCategoryFilter,
  priceRange,
  setPriceRange,
  onClear,
}) => {
  const [expanded, setExpanded] = useState<string | false>("category"); // Mặc định mở tab Category
  const [tempCategory, setTempCategory] = useState<string>(
    categoryFilter || "All"
  );
  const [tempPrice, setTempPrice] = useState<[number, number]>(
    priceRange || [0, 10000000]
  );

  const handleChange = (panel: string) => (_: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Sync state khi mở modal
  useEffect(() => {
    if (open) {
      setTempCategory(categoryFilter || "All");
      setTempPrice(priceRange || [0, 10000000]);
    }
  }, [open, categoryFilter, priceRange]);

  const handleApply = () => {
    setCategoryFilter(tempCategory);
    setPriceRange(tempPrice);
    onClose();
  };

  const handleClear = () => {
    setTempCategory("All");
    setTempPrice([0, 10000000]);
    onClear();
    // Không đóng modal ngay để user thấy đã reset, hoặc đóng luôn tùy UX
    // onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
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
        Bộ lọc sản phẩm
        <Button
          onClick={onClose}
          sx={{ minWidth: "auto", p: 0, color: "#999" }}
        >
          <CloseIcon />
        </Button>
      </DialogTitle>

      <DialogContent dividers sx={{ p: "24px", bgcolor: "#f8f9fa" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* --- CATEGORY FILTER --- */}
          <Accordion
            expanded={expanded === "category"}
            onChange={handleChange("category")}
            sx={{
              borderRadius: "12px !important",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 600, color: "#34495e" }}>
                Danh mục
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl component="fieldset">
                <RadioGroup
                  value={tempCategory}
                  onChange={(e) => setTempCategory(e.target.value)}
                >
                  <FormControlLabel
                    value="All"
                    control={<Radio />}
                    label="Tất cả"
                  />
                  <FormControlLabel
                    value="Classic"
                    control={<Radio />}
                    label="Classic"
                  />
                  <FormControlLabel
                    value="New"
                    control={<Radio />}
                    label="New"
                  />
                  <FormControlLabel
                    value="Sale"
                    control={<Radio />}
                    label="Sale"
                  />
                  <FormControlLabel
                    value="Trending"
                    control={<Radio />}
                    label="Trending"
                  />
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          {/* --- PRICE RANGE FILTER --- */}
          <Accordion
            expanded={expanded === "price"}
            onChange={handleChange("price")}
            sx={{
              borderRadius: "12px !important",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 600, color: "#34495e" }}>
                Khoảng giá
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ px: 2, pt: 1 }}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#567C8D",
                    fontWeight: "bold",
                    textAlign: "center",
                    mb: 2,
                  }}
                >
                  {formatCurrency(tempPrice[0])} -{" "}
                  {formatCurrency(tempPrice[1])}
                </Typography>
                <Slider
                  value={tempPrice}
                  onChange={(_e, newValue) =>
                    setTempPrice(newValue as [number, number])
                  }
                  min={0}
                  max={10000000} // Max 10 triệu
                  step={100000} // Bước nhảy 100k
                  valueLabelDisplay="auto"
                  sx={{
                    color: "#567C8D",
                    "& .MuiSlider-thumb": { backgroundColor: "#567C8D" },
                    "& .MuiSlider-track": { backgroundColor: "#567C8D" },
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 1,
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    0đ
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    10.000.000đ+
                  </Typography>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
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
          }}
        >
          Áp dụng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductFiltersModal;
