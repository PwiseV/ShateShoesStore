import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export type ProductRating = {
  value: number;
  count: number;
};

export type ProductInfoProps = {
  name: string;
  breadcrumbs?: string[];
  badges?: string[];
  rating?: ProductRating;
  description?: string[];
  className?: string;

  // THÊM PROPS MỚI ĐỂ CONTROL TỪ BÊN NGOÀI
  isLiked: boolean;
  onToggleLike: () => void;
};

const ProductInfo: React.FC<ProductInfoProps> = ({
  name,
  breadcrumbs = [],
  badges = [],
  rating,
  description = [],
  className,
  isLiked, // Nhận từ props
  onToggleLike, // Nhận từ props
}) => {
  // (Đã xóa useState nội bộ ở đây)

  return (
    <Stack
      className={className}
      spacing={2}
      alignItems="flex-start"
      sx={{
        fontFamily: '"DM Sans", sans-serif',
        width: "100%",
        textAlign: "left",
      }}
    >
      {/* 1. Header (Breadcrumb + Tim) */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        {breadcrumbs.length > 0 ? (
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: "#546E7A",
              fontFamily: '"Lexend", sans-serif',
            }}
          >
            {breadcrumbs.join(" > ")}
          </Typography>
        ) : (
          <Box />
        )}

        {/* --- NÚT TIM --- */}
        <IconButton
          onClick={onToggleLike} // Gọi hàm từ props
          disableRipple
          sx={{
            bgcolor: "#fff",
            color: isLiked ? "#ff4757" : "#546E7A",
            width: 44,
            height: 44,
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            transition: "all 0.2s",
            "&:focus": { outline: "none" },
            "&:hover": {
              bgcolor: "#fff",
              color: "#ff4757",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
            },
          }}
        >
          {isLiked ? (
            <FavoriteIcon sx={{ fontSize: 22 }} />
          ) : (
            <FavoriteBorderIcon sx={{ fontSize: 22 }} />
          )}
        </IconButton>
      </Stack>

      {/* ... (Các phần Tên, Rating, Badges, Mô tả giữ nguyên như cũ) ... */}

      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          color: "#2C3E50",
          letterSpacing: "-1px",
          lineHeight: 1.2,
          fontFamily: '"DM Sans", sans-serif',
        }}
      >
        {name}
      </Typography>

      {rating && (
        <Stack direction="row" spacing={1} alignItems="center">
          <Rating
            value={rating.value}
            readOnly
            precision={0.5}
            size="small"
            sx={{ color: "#F4C430" }}
          />
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: "#546E7A",
              mt: 0.5,
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            {rating.count} Đánh giá
          </Typography>
        </Stack>
      )}

      {badges.length > 0 && (
        <Stack direction="row" spacing={1.5} flexWrap="wrap">
          {badges.map((b) => (
            <Chip
              key={b}
              label={b}
              sx={{
                bgcolor: "#C8D9E6",
                color: "#567C8D",
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 600,
                fontSize: "0.85rem",
                borderRadius: "8px",
                height: 32,
                border: "none",
                "& .MuiChip-label": { px: 2 },
              }}
            />
          ))}
        </Stack>
      )}

      {description.length > 0 && (
        <Box sx={{ mt: 1, width: "100%" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 1,
              color: "#2C3E50",
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            Mô tả sản phẩm
          </Typography>
          <Stack spacing={0.8} sx={{ width: "100%" }}>
            {description.map((d, i) => (
              <Typography
                key={i}
                variant="body1"
                sx={{
                  color: "#4a4a4a",
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  fontFamily: '"DM Sans", sans-serif',
                  textAlign: "left",
                }}
              >
                {d}
              </Typography>
            ))}
          </Stack>
        </Box>
      )}
    </Stack>
  );
};

export default ProductInfo;
