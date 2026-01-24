import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface BlogSearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BlogSearch: React.FC<BlogSearchProps> = ({ value, onChange }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Bạn có thể tìm kiếm theo tiêu đề bài viết..."
      value={value}
      onChange={onChange}
      sx={{
        bgcolor: "white",
        borderRadius: "50px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.03)", // Đổ bóng nhẹ
        "& .MuiOutlinedInput-root": {
          borderRadius: "50px",
          pr: 1, // Padding phải để nút search không sát lề
          "& fieldset": { border: "none" }, // Bỏ viền đen mặc định
        },
        "& input": {
          pl: 3, // Padding trái cho text nhập vào
          fontFamily: '"Lexend", sans-serif',
          fontSize: "0.9rem",
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              sx={{
                bgcolor: "#34495E", // Màu nền nút search (Xám xanh đậm)
                color: "white",
                p: 1,
                "&:hover": { bgcolor: "#2C3E50" },
              }}
            >
              <SearchIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default BlogSearch;
