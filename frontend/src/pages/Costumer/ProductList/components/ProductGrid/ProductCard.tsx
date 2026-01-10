import { Box, Paper, Typography } from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";

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
  p?: Product;
};

const ProductCard = ({ product, p }: Props) => {
  const item = product ?? p;
  if (!item) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "20px",
        overflow: "hidden",
        bgcolor: "#fff",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        textAlign: "left", // QUAN TRỌNG: Ép nội dung trong card căn trái lại
        transition: "all 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
        },
      }}
    >
      <Box
        sx={{
          height: "280px",
          width: "100%",
          bgcolor: "#F9F9F9",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={item.image}
          alt={item.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
            "&:hover": { transform: "scale(1.08)" },
          }}
        />
      </Box>

      <Box sx={{ p: 2.5, display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: 600,
            color: "#333",
            fontFamily: '"Lexend", sans-serif',
            minHeight: "44px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textAlign: "left", // Ép căn trái cho tên
          }}
        >
          {item.name}
        </Typography>

        <Box sx={{ display: "flex", mt: 0.0001 }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              border: "1px solid #FFD700",
              borderRadius: "6px",
              px: 0.8,
              py: 0.2,
            }}
          >
            <StarRateIcon sx={{ color: "#FFD700", fontSize: 16, mr: 0.5 }} />
            <Typography sx={{ fontSize: "0.85rem", fontWeight: 700 }}>
              {item.rating.toFixed(1)}
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            fontSize: "1.1rem",
            fontWeight: 800,
            color: "#222",
            fontFamily: '"Lexend", sans-serif',
            textAlign: "left", // Ép căn trái cho giá
          }}
        >
          {currencyVND(item.priceVnd)}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ProductCard;
