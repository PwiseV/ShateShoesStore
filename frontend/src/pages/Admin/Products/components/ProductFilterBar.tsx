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

interface ProductFilterBarProps {
  keyword: string;
  setKeyword: (val: string) => void;
  onSearch: () => void;
  onOpenFilter: () => void;
  isFiltered: boolean;
}

const ProductFilterBar: React.FC<ProductFilterBarProps> = ({
  keyword,
  setKeyword,
  onSearch,
  onOpenFilter,
  isFiltered,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 3,
        display: "flex",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", gap: 2, flex: 1, maxWidth: 500 }}>
        <TextField
          placeholder="Tìm theo tên/mã SP..."
          size="small"
          fullWidth
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              bgcolor: "#F8F9FD",
              "& fieldset": { border: "none" },
              "&.Mui-focused fieldset": { border: "1px solid #567C8D" },
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

      <Box sx={{ display: "flex", gap: 1.5 }}>
        <Badge color="error" variant="dot" invisible={!isFiltered}>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={onOpenFilter}
            sx={{ borderColor: "#ccc", color: "#555" }}
          >
            Bộ lọc
          </Button>
        </Badge>
      </Box>
    </Paper>
  );
};

export default ProductFilterBar;
