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
  CircularProgress,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getAllCategories } from "../../../../services/adminProductServices";

interface Props {
  open: boolean;
  onClose: () => void;
  categoryFilter: string;
  setCategoryFilter: (v: string) => void;
  onClear: () => void;
}

const ProductFiltersModal: React.FC<Props> = ({
  open,
  onClose,
  categoryFilter,
  setCategoryFilter,
  onClear,
}) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [tempCategory, setTempCategory] = useState<string>(categoryFilter || "All");

  // 1. Fetch danh mục từ Backend khi mở Modal
  useEffect(() => {
    const fetchCats = async () => {
      setLoading(true);
      try {
        const res = await getAllCategories();
        // Kiểm tra cấu trúc data trả về (thường là res.data hoặc res trực tiếp)
        setCategories(res.data || res);
      } catch (error) {
        console.error("Lỗi lấy danh mục:", error);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchCats();
      setTempCategory(categoryFilter || "All");
    }
  }, [open, categoryFilter]);

  const handleApply = () => {
    setCategoryFilter(tempCategory);
    onClose();
  };

  const handleClear = () => {
    setTempCategory("All");
    onClear();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs" // Thu nhỏ lại vì không còn slider giá
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
        <IconButton onClick={onClose} size="small" sx={{ color: "#999" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: "16px", bgcolor: "#f8f9fa" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Accordion
            expanded={true} // Luôn mở vì chỉ còn 1 mục
            sx={{
              borderRadius: "12px !important",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 600, color: "#34495e" }}>
                Danh mục sản phẩm
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                  <CircularProgress size={24} sx={{ color: "#567C8D" }} />
                </Box>
              ) : (
                <FormControl component="fieldset">
                  <RadioGroup
                    value={tempCategory}
                    onChange={(e) => setTempCategory(e.target.value)}
                  >
                    <FormControlLabel
                      value="All"
                      control={<Radio sx={{ color: "#567C8D", "&.Mui-checked": { color: "#567C8D" } }} />}
                      label="Tất cả danh mục"
                    />
                    {categories.map((cat) => (
                      <FormControlLabel
                        key={cat._id || cat.id || cat.name}
                        value={cat.name}
                        control={<Radio sx={{ color: "#567C8D", "&.Mui-checked": { color: "#567C8D" } }} />}
                        label={cat.name}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
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

export default ProductFiltersModal;