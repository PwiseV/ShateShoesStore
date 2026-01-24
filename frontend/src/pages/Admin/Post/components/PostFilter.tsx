import React, { useState, useEffect } from "react";
import {
  Paper,
  Box,
  TextField,
  InputAdornment,
  Button,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Grid,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";

// --- Constants ---
// Đảm bảo các giá trị này KHỚP CHÍNH XÁC với database hoặc logic backend của bạn
const POST_CATEGORIES = ["All", "Phối đồ", "Xu hướng", "Review"];

// --- Types ---
interface PostFilterProps {
  keyword: string;
  setKeyword: (val: string) => void;
  filterCategory: string;
  setFilterCategory: (val: string) => void;
  onFilter: () => void; // Trigger gọi API (Chỉ dùng cho nút Search keyword)
  onReset: () => void;
}

// --- Styles ---
const styles = {
  barPaper: {
    p: 2,
    mb: 3,
    borderRadius: "16px",
    display: "flex",
    gap: 2,
    alignItems: "center",
    justifyContent: "space-between",
    bgcolor: "#fff",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.03)",
  },
  searchInput: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      bgcolor: "#F8F9FD",
      "& fieldset": { border: "none" },
      "&.Mui-focused fieldset": { border: "1px solid #567C8D" },
    },
  },
  filterBtn: {
    borderRadius: "12px",
    textTransform: "none",
    borderColor: "#DCDCE6",
    color: "#5E5B86",
    fontWeight: 600,
    height: 40,
    "&:hover": {
      borderColor: "#567C8D",
      color: "#567C8D",
      bgcolor: "#EDF6F9",
    },
  },
  labelStyle: {
    fontWeight: 700,
    fontSize: "14px",
    color: "#2C3E50",
    mb: 1,
  },
  radioStyle: {
    color: "#B0B0C0",
    "&.Mui-checked": { color: "#567C8D" },
  },
  applyBtn: {
    borderRadius: "10px",
    bgcolor: "#567C8D",
    py: 1,
    "&:hover": { bgcolor: "#456372" },
    textTransform: "none",
  },
  clearBtn: {
    borderRadius: "10px",
    color: "#5E5B86",
    borderColor: "#DCDCE6",
    py: 1,
    textTransform: "none",
  },
};

// --- Sub-Component: Modal Bộ Lọc ---
interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  initialCategory: string;
  onApply: (category: string) => void;
  onClear: () => void;
}

const PostFilterModal: React.FC<FilterModalProps> = ({
  open,
  onClose,
  initialCategory,
  onApply,
  onClear,
}) => {
  // State tạm thời để thao tác trong modal
  // FIX: Nếu initialCategory là rỗng, gán mặc định là "All" để Radio hiển thị đúng
  const [tempCategory, setTempCategory] = useState(initialCategory || "All");

  // Sync state khi mở modal
  useEffect(() => {
    if (open) {
      setTempCategory(initialCategory || "All");
    }
  }, [open, initialCategory]);

  const handleApply = () => {
    onApply(tempCategory);
    onClose();
  };

  const handleClear = () => {
    setTempCategory("All");
    onClear();
    onClose();
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
        <Typography variant="h6" fontWeight={700} color="#2C3E50">
          Bộ lọc bài viết
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
          <Box>
            <Typography sx={styles.labelStyle}>Chủ đề</Typography>
            <FormControl fullWidth>
              <RadioGroup
                value={tempCategory}
                onChange={(e) => setTempCategory(e.target.value)}
              >
                <Grid container spacing={1}>
                  {POST_CATEGORIES.map((cat) => (
                    <Grid size={6} key={cat}>
                      <FormControlLabel
                        value={cat}
                        control={<Radio sx={styles.radioStyle} />}
                        label={cat === "All" ? "Tất cả" : cat}
                        componentsProps={{
                          typography: { fontSize: "14px", color: "#4A5568" },
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={handleClear}
          variant="outlined"
          fullWidth
          sx={styles.clearBtn}
        >
          Đặt lại
        </Button>
        <Button
          onClick={handleApply}
          variant="contained"
          fullWidth
          sx={styles.applyBtn}
        >
          Áp dụng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// --- Main Component ---
const PostFilter: React.FC<PostFilterProps> = ({
  keyword,
  setKeyword,
  filterCategory,
  setFilterCategory,
  onFilter, // Chỉ dùng khi bấm nút Search (nếu có), không dùng khi Apply filter category
  onReset,
}) => {
  const [openModal, setOpenModal] = useState(false);

  // FIX: Chỉ hiện chấm đỏ khi category khác "All" VÀ khác rỗng
  const isFiltered = filterCategory !== "All" && filterCategory !== "";

  return (
    <>
      <Paper elevation={0} sx={styles.barPaper}>
        {/* Search Input */}
        <Box sx={{ display: "flex", gap: 2, flex: 1, maxWidth: 500 }}>
          <TextField
            placeholder="Tìm kiếm tiêu đề bài viết..."
            size="small"
            fullWidth
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            sx={styles.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#9FA0BF" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Filter Button */}
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Badge color="error" variant="dot" invisible={!isFiltered}>
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={() => setOpenModal(true)}
              sx={styles.filterBtn}
            >
              Bộ lọc
            </Button>
          </Badge>
        </Box>
      </Paper>

      <PostFilterModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        initialCategory={filterCategory}
        onApply={(newCategory) => {
          // FIX: Chỉ set state, để useEffect ở usePosts tự lo việc fetch API
          setFilterCategory(newCategory);
        }}
        onClear={onReset}
      />
    </>
  );
};

export default PostFilter;
