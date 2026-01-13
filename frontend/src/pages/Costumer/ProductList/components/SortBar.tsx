import React from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  // 1. Thêm từ khóa 'type' vào trước SelectChangeEvent
  type SelectChangeEvent,
} from "@mui/material";

export type SortValue = "priceAsc" | "priceDesc";

type SortBarProps = {
  value: SortValue;
  onChange: (value: SortValue) => void;
};

const SortBar: React.FC<SortBarProps> = ({ value, onChange }) => {
  // 2. Sử dụng type SelectChangeEvent bình thường
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as SortValue);
  };

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
        Sắp xếp theo
      </Typography>
      <FormControl size="small">
        <Select
          value={value}
          onChange={handleChange}
          sx={{ borderRadius: "12px", bgcolor: "white", minWidth: 160 }}
        >
          <MenuItem value="priceAsc">Giá tăng dần</MenuItem>
          <MenuItem value="priceDesc">Giá giảm dần</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortBar;
