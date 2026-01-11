import React from "react";
import {
  Paper,
  Box,
  TextField,
  InputAdornment,
  Button,
  Badge,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

interface Props {
  keyword: string;
  onKeywordChange: (val: string) => void;
  onOpenFilter: () => void;
  isFiltered: boolean;
  onAdd?: () => void; // Optional nếu bạn muốn nút Add ở đây
}

const PromotionFilterBar: React.FC<Props> = ({
  keyword,
  onKeywordChange,
  onOpenFilter,
  isFiltered,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 2,
        borderRadius: "16px",
        display: "flex",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "#fff",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.03)",
      }}
    >
      {/* Search Input */}
      <Box sx={{ display: "flex", gap: 2, flex: 1, maxWidth: 500 }}>
        <TextField
          placeholder="Tìm kiếm theo mã code, mô tả..."
          size="small"
          fullWidth
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              bgcolor: "#F8F9FD",
              "& fieldset": { border: "none" },
              "&.Mui-focused fieldset": { border: "1px solid #567C8D" }, // Focus màu xanh
            },
          }}
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
            onClick={onOpenFilter}
            sx={{
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
            }}
          >
            Bộ lọc
          </Button>
        </Badge>
      </Box>
    </Paper>
  );
};

export default PromotionFilterBar;
