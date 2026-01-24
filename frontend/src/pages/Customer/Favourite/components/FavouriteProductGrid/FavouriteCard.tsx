import React from "react";
import { Box, Paper, Typography, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StarRateIcon from "@mui/icons-material/StarRate";
import FavoriteIcon from "@mui/icons-material/Favorite";

// Import Type trực tiếp từ Service để đồng bộ
import { type FavouriteProduct } from "../../../../../services/favouriteServices";

const currencyVND = (n: number) =>
  `${(Math.round(n / 1000) * 1000).toLocaleString("vi-VN")}đ`;

type Props = {
  product?: FavouriteProduct;
  onRemove?: (id: string) => void;
};

const FavouriteCard = ({ product, onRemove }: Props) => {
  const navigate = useNavigate();

  if (!product) return null;

  const handleNavigate = () => {
    // Dùng productId để navigate đến chi tiết
    navigate(`/products/details/${product.productId}`);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: "transparent",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        overflow: "visible",
      }}
    >
      {/* 1. KHUNG ẢNH */}
      <Box
        onClick={handleNavigate}
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "1/1",
          bgcolor: "#fff",
          borderRadius: "20px",
          overflow: "hidden",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
          },
        }}
      >
        <Box
          component="img"
          src={product.avatar} // [SỬA] image -> avatar
          alt={product.title} // [SỬA] name -> title
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
            "&:hover": { transform: "scale(1.08)" },
          }}
        />

        {/* Nút Xóa (Trái tim đỏ) */}
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            // [SỬA] Truyền productId để xóa
            onRemove?.(product.productId);
          }}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            color: "#FF6B6B",
            bgcolor: "rgba(255,255,255,0.7)",
            width: "34px",
            height: "34px",
            "&:hover": { bgcolor: "white" },
          }}
        >
          <FavoriteIcon sx={{ fontSize: "1.2rem" }} />
        </IconButton>
      </Box>

      {/* 2. THÔNG TIN */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
          alignItems: "flex-start",
        }}
      >
        <Typography
          onClick={handleNavigate}
          sx={{
            fontSize: "1rem",
            fontWeight: 600,
            textTransform: "uppercase",
            color: "#4A4A4A",
            fontFamily: '"Lexend", sans-serif',
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
            cursor: "pointer",
            "&:hover": {
              color: "#567C8D",
              textDecoration: "underline",
            },
          }}
        >
          {product.title} {/* [SỬA] name -> title */}
        </Typography>

        {/* Rating */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            border: "1px solid #FFD700",
            borderRadius: "4px",
            px: 0.6,
            py: 0.2,
          }}
        >
          <StarRateIcon sx={{ color: "#FFD700", fontSize: 14, mr: 0.3 }} />
          <Typography
            sx={{
              fontSize: "0.75rem",
              fontWeight: 700,
              fontFamily: '"Lexend", sans-serif',
            }}
          >
            {product.rating.toFixed(1)}
          </Typography>
        </Box>

        <Typography
          sx={{
            fontSize: "1.1rem",
            fontWeight: 800,
            color: "#2C3E50",
            fontFamily: '"Lexend", sans-serif',
            mt: 0.5,
          }}
        >
          {currencyVND(product.min_price)} {/* [SỬA] priceVnd -> min_price */}
        </Typography>
      </Box>
    </Paper>
  );
};

export default FavouriteCard;
