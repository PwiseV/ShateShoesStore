import React from "react";
import { Box, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type CategoryItemProps = {
  name: string;
};

const CategoryItem: React.FC<CategoryItemProps> = ({ name }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between", // Đẩy text sang trái, icon sang phải
        py: 1.2, // Tăng padding dọc cho thoáng giống design
        cursor: "pointer",
        color: "#2F4156", // Màu chữ xám đậm
        transition: "all 0.2s",
        "&:hover": {
          color: "#2C3E50", // Hover đậm hơn
          transform: "translateX(4px)", // Hiệu ứng trượt nhẹ sang phải
        },
      }}
    >
      <Typography
        sx={{
          fontSize: "1rem",
          fontWeight: 500,
          fontFamily: '"Lexend", sans-serif',
        }}
      >
        {name}
      </Typography>

      {/* Mũi tên chỉ xuống giống design */}
      <ExpandMoreIcon sx={{ fontSize: 20, color: "#718096" }} />
    </Box>
  );
};

export default CategoryItem;
