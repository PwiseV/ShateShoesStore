import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

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
};

const ProductInfo: React.FC<ProductInfoProps> = ({
  name,
  breadcrumbs = [],
  badges = [],
  rating,
  description = [],
  className,
}) => {
  return (
    <Stack
      className={className}
      spacing={2} // Tăng khoảng cách chung
      alignItems="flex-start" // QUAN TRỌNG: Căn tất cả về bên trái
      sx={{
        fontFamily: '"DM Sans", sans-serif',
        width: "100%",
        textAlign: "left", // Đảm bảo text mặc định căn trái
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

        <IconButton
          sx={{
            bgcolor: "#fff",
            color: "#546E7A",
            width: 44,
            height: 44,
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            transition: "all 0.2s",
            "&:hover": {
              bgcolor: "#fff",
              color: "#ff4757",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
            },
          }}
        >
          <FavoriteBorderIcon sx={{ fontSize: 22 }} />
        </IconButton>
      </Stack>

      {/* 2. Tên sản phẩm */}
      <Typography
        variant="h3" // Tăng kích cỡ tiêu đề lên chút (h4 -> h3) cho giống mẫu
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

      {/* 3. Rating */}
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

      {/* 4. Badges */}
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

      {/* 5. Mô tả sản phẩm (ĐÃ CHỈNH SỬA) */}
      {description.length > 0 && (
        <Box sx={{ mt: 1, width: "100%" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 1.5,
              color: "#2C3E50",
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            Mô tả sản phẩm
          </Typography>

          {/* Thay thẻ ul bằng Stack để bỏ dấu chấm và căn thẳng lề trái */}
          <Stack spacing={1.5} sx={{ width: "100%" }}>
            {description.map((d, i) => (
              <Typography
                key={i}
                variant="body1" // Dùng body1 cho chữ to rõ hơn xíu
                sx={{
                  color: "#4a4a4a",
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  fontFamily: '"DM Sans", sans-serif',
                  textAlign: "left", // Căn trái tuyệt đối
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
