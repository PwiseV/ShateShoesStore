import React from "react";
import { Box, Typography, Stack } from "@mui/material";
// [UPDATED] Import Type
import type { OrderItem } from "../../../../services/userHistoryServices";

// Đổi props từ 'product' thành 'item' cho chuẩn ngữ nghĩa mới, hoặc giữ nguyên tên prop nhưng đổi type
const ProductItem = ({ product }: { product: OrderItem }) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Box
        component="img"
        src={product.avatar} // [SỬA] image -> avatar
        alt={product.title} // [SỬA] name -> title
        sx={{
          width: 80,
          height: 80,
          borderRadius: 2,
          objectFit: "cover",
          border: "1px solid #eee",
        }}
      />
      <Box flex={1} sx={{ textAlign: "left" }}>
        <Typography
          fontWeight="bold"
          sx={{ color: "#2C3E50", fontFamily: '"Lexend", sans-serif' }}
        >
          {product.title} {/* [SỬA] name -> title */}
        </Typography>
        <Typography variant="body2" color="#567C8D" sx={{ mt: 0.5 }}>
          x{product.quantity}
        </Typography>
        <Typography variant="body2" color="#567C8D">
          {product.color}, Size: {product.size}{" "}
          {/* [SỬA] variant -> color, size */}
        </Typography>
      </Box>
      <Box textAlign="right">
        <Typography sx={{ color: "#546E7A", fontWeight: "bold" }}>
          {product.price.toLocaleString()}đ
        </Typography>
      </Box>
    </Stack>
  );
};

export default ProductItem;
