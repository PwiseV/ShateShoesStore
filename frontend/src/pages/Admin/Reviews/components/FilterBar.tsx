import React from "react";
import { Box, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

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
    <Box sx={{ display: "flex", gap: 1.5, mb: 2, flexWrap: "wrap" }}>
      <TextField
        placeholder="Tìm kiếm tên sản phẩm, tên khách hàng, mã đánh giá..."
        size="small"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{
          flex: 1,
          minWidth: "300px",
          "& .MuiOutlinedInput-root": { borderRadius: "8px" },
        }}
      />

      {/* Dropdown Status */}
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Trạng thái</InputLabel>
        <Select
          value={selectedStatus || "all"}
          onChange={(e) => onStatusChange(e.target.value as string)}
          label="Trạng thái"
          sx={{ borderRadius: "8px" }}
        >
          <MenuItem value="all" sx={{ fontStyle: "italic" }}>
            Tất cả
          </MenuItem>
          <MenuItem value="pending">Chờ duyệt</MenuItem>
          <MenuItem value="approved">Đã duyệt</MenuItem>
          <MenuItem value="rejected">Ẩn</MenuItem>
        </Select>
      </FormControl>

      {/* Dropdown Review */}
      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Đánh giá</InputLabel>
        <Select
          value={selectedStar ?? "all"}
          onChange={(e) => onStarChange(e.target.value as string)}
          label="Đánh giá"
          sx={{ borderRadius: "8px" }}
        >
          <MenuItem value="all" sx={{ fontStyle: "italic" }}>
            Tất cả
          </MenuItem>
          {[1, 2, 3, 4, 5].map((star) => (
            <MenuItem key={star} value={star}>
              {star} sao
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
