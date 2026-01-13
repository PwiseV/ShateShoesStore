import React from "react";
import {
  Paper,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

interface PostFilterProps {
  keyword: string;
  setKeyword: (val: string) => void;
  filterMonth: string;
  setFilterMonth: (val: string) => void;
  filterCategory: string;
  setFilterCategory: (val: string) => void;
  availableMonths: string[];
  onFilter: () => void;
  onReset: () => void;
}

const PostFilter: React.FC<PostFilterProps> = ({
  keyword,
  setKeyword,
  filterMonth,
  setFilterMonth,
  filterCategory,
  setFilterCategory,
  availableMonths,
  onFilter,
  onReset,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 3,
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        flexWrap: "nowrap",
        backgroundColor: "white",
        overflowX: "auto",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      <TextField
        placeholder="Tìm tiêu đề..."
        size="small"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
        sx={{ minWidth: 200, bgcolor: "#f9f9f9" }}
      />

      <Select
        size="small"
        value={filterMonth}
        onChange={(e) => setFilterMonth(e.target.value)}
        displayEmpty
        sx={{ minWidth: 160, bgcolor: "#f9f9f9" }}
      >
        <MenuItem value="All">Toàn bộ thời gian</MenuItem>
        {availableMonths.map((m) => {
          const [year, month] = m.split("-");
          return (
            <MenuItem key={m} value={m}>
              Tháng {month}/{year}
            </MenuItem>
          );
        })}
      </Select>

      <Select
        size="small"
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        displayEmpty
        sx={{ minWidth: 150, bgcolor: "#f9f9f9" }}
      >
        <MenuItem value="All">Tất cả chủ đề</MenuItem>
        <MenuItem value="Phối đồ">Phối đồ</MenuItem>
        <MenuItem value="Xu hướng">Xu hướng</MenuItem>
        <MenuItem value="Review">Review</MenuItem>
      </Select>

      <Button
        variant="contained"
        sx={{
          bgcolor: "#2C3E50",
          textTransform: "none",
          whiteSpace: "nowrap",
          minWidth: "fit-content",
        }}
        startIcon={<FilterListIcon />}
        onClick={onFilter}
      >
        Lọc
      </Button>

      <Button
        variant="outlined"
        color="error"
        sx={{
          textTransform: "none",
          borderColor: "#e74c3c",
          color: "#e74c3c",
          whiteSpace: "nowrap",
          minWidth: "fit-content",
        }}
        startIcon={<RestartAltIcon />}
        onClick={onReset}
      >
        Đặt lại
      </Button>
    </Paper>
  );
};

export default PostFilter;
