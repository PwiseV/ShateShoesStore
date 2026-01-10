// src/pages/Costumer/ProductList/components/SortBar.tsx
import React from "react";
import { Box, Typography, FormControl, Select, MenuItem } from "@mui/material";

export type SortValue = "popular" | "priceAsc" | "priceDesc";

type SortBarProps = {
  sort: SortValue;
  onSortChange: (value: SortValue) => void;
};

const SortBar: React.FC<SortBarProps> = ({ sort, onSortChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Typography sx={{ mr: 1, color: "#667", fontSize: "0.9rem" }}>
        Sort by
      </Typography>
      <FormControl size="small">
        <Select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          sx={{ borderRadius: "12px", bgcolor: "white", minWidth: 160 }}
        >
          <MenuItem value="popular">Phổ biến</MenuItem>
          <MenuItem value="priceAsc">Giá tăng dần</MenuItem>
          <MenuItem value="priceDesc">Giá giảm dần</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortBar;
