import React from "react";
import { Box, Typography, Paper } from "@mui/material";

type TrendingCardProps = {
  name: string;
  image: string;
};

const TrendingCard: React.FC<TrendingCardProps> = ({ name, image }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: "white", // Nền trắng của khung
        p: 1.5, // Padding tạo khoảng trắng quanh ảnh (quan trọng)
        borderRadius: "16px", // Bo góc khung ngoài
        height: "100%",
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
        },
      }}
    >
      {/* Khung chứa ảnh */}
      <Box
        sx={{
          width: "100%",
          aspectRatio: "1/1", // Ép ảnh thành hình vuông cho đều
          overflow: "hidden",
          borderRadius: "12px", // Bo góc ảnh bên trong
          mb: 2, // Khoảng cách xuống tên
          bgcolor: "#f9f9f9", // Màu nền lót khi ảnh đang load
        }}
      >
        <Box
          component="img"
          src={image}
          alt={name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // Cắt ảnh vừa khung
            transition: "transform 0.5s ease",
            "&:hover": { transform: "scale(1.1)" },
          }}
        />
      </Box>

      {/* Tên sản phẩm */}
      <Box sx={{ textAlign: "center", pb: 0.5 }}>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: "0.9rem",
            color: "#2C3E50",
            textTransform: "uppercase",
            fontFamily: "Lexend, sans-serif",
            letterSpacing: "0.5px",
          }}
        >
          {name}
        </Typography>
      </Box>
    </Paper>
  );
};

export default TrendingCard;
