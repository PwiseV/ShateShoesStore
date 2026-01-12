import React from "react";
import { Box, Paper, Typography, Button, IconButton } from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";
import FavoriteIcon from "@mui/icons-material/Favorite";

export type Product = {
  id: string;
  name: string;
  priceVnd: number;
  image: string;
  rating: number;
};

const currencyVND = (n: number) =>
  `${(Math.round(n / 1000) * 1000).toLocaleString("vi-VN")}đ`;

type Props = {
  product?: Product;
};

const FavouriteCard = ({ product }: Props) => {
  if (!product) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: "transparent", // Nền trong suốt giống thiết kế
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        overflow: "visible", // Để shadow khi hover không bị cắt
      }}
    >
      {/* 1. KHUNG ẢNH (Bo tròn 20px) */}
      <Box
        sx={{
          position: "relative",
          borderRadius: "20px",
          overflow: "hidden",
          width: "100%",
          aspectRatio: "1/1",
          bgcolor: "#fff",
        }}
      >
        <Box
          component="img"
          src={product.image}
          alt={product.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
            "&:hover": { transform: "scale(1.08)" },
          }}
        />
        {/* Icon Tim */}
        <IconButton
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
          sx={{
            fontSize: "0.95rem",
            fontWeight: 600,
            textTransform: "uppercase",
            color: "#4A4A4A",
            fontFamily: '"Lexend", sans-serif',
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {product.name}
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
            mt: 0.5,
            fontFamily: '"Lexend", sans-serif',
          }}
        >
          {currencyVND(product.priceVnd)}
        </Typography>
      </Box>

      {/* 3. NÚT BẤM (Đẩy xuống đáy - mt: auto) */}
      <Box
        sx={{ mt: "auto", display: "flex", flexDirection: "column", gap: 1.5 }}
      >
        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#567C8D",
            color: "white",
            textTransform: "none",
            fontWeight: 700,
            boxShadow: "none",
            borderRadius: "0", // Vuông vức
            py: 1.2,
            fontFamily: '"Lexend", sans-serif',
            "&:hover": { bgcolor: "#456372", boxShadow: "none" },
          }}
        >
          Mua ngay
        </Button>

        <Button
          variant="outlined"
          fullWidth
          sx={{
            borderColor: "#8898aa",
            color: "#2C3E50",
            textTransform: "none",
            fontWeight: 700,
            borderRadius: "0", // Vuông vức
            py: 1.2,
            fontFamily: '"Lexend", sans-serif',
            "&:hover": { borderColor: "#2C3E50", bgcolor: "transparent" },
          }}
        >
          Thêm vào giỏ hàng
        </Button>
      </Box>
    </Paper>
  );
};

export default FavouriteCard;
