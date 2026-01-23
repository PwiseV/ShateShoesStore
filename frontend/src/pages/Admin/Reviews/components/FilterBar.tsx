import React from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedStatus: string | null;
  onStatusChange: (value: string) => void;
  selectedStar: number | null;
  onStarChange: (value: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedStar,
  onStarChange,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 3, // Bo góc mạnh hơn (12px)
        display: "flex",
        gap: 2,
        alignItems: "center",
        flexWrap: "wrap",
        // Bạn có thể thêm border nhẹ nếu muốn phân cách với nền trắng
        // border: "1px solid #f0f0f0" 
      }}
    >
      {/* Thanh Search với Theme mới */}
      <TextField
        placeholder="Tìm kiếm nội dung đánh giá..."
        size="small"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{
          flex: 1,
          minWidth: "300px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            bgcolor: "#F8F9FD", // Nền xám nhạt hiện đại
            "& fieldset": { border: "none" }, // Ẩn viền mặc định
            "&.Mui-focused fieldset": { border: "1px solid #567C8D" }, // Hiện viền khi focus
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

      <Box sx={{ display: "flex", gap: 1.5 }}>
        {/* Dropdown Status */}
        <FormControl size="small" sx={{ minWidth: 160 }}>

          <Select
            labelId="status-label"
            value={selectedStatus || "all"}
            onChange={(e) => onStatusChange(e.target.value as string)}
            label="Trạng thái"
            sx={{
              borderRadius: "12px",
              bgcolor: "#F8F9FD",
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "1px solid #567C8D" },
            }}
          >
            <MenuItem value="all"><em>Tất cả trạng thái</em></MenuItem>
            <MenuItem value="pending">Chờ duyệt</MenuItem>
            <MenuItem value="active">Đã duyệt</MenuItem>
            <MenuItem value="hidden">Ẩn</MenuItem>
          </Select>
        </FormControl>

        {/* Dropdown Rating */}
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <Select
            labelId="rating-label"
            value={selectedStar !== null ? String(selectedStar) : "all"}
            onChange={(e) => onStarChange(e.target.value as string)}
            label="Đánh giá"
            sx={{
              borderRadius: "12px",
              bgcolor: "#F8F9FD",
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "1px solid #567C8D" },
            }}
          >
            <MenuItem value="all"><em>Tất cả sao</em></MenuItem>
            {[5, 4, 3, 2, 1].map((star) => (
              <MenuItem key={star} value={String(star)}>
                {star} sao
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
};

export default FilterBar;