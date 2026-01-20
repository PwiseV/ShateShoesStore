import React from "react";
import { Box, Typography, Stack } from "@mui/material";
// Import type từ file cha
import type { OrderProduct } from "../OrderHistory";

const ProductItem = ({ product }: { product: OrderProduct }) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Box
        component="img"
        src={product.image}
        alt={product.name}
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
          {product.name}
        </Typography>
        <Typography variant="body2" color="#567C8D" sx={{ mt: 0.5 }}>
          x{product.quantity}
        </Typography>
        <Typography variant="body2" color="#567C8D">
          {product.variant}
        </Typography>
      </Box>
      <Box textAlign="right">
        {product.originalPrice && (
          <Typography
            variant="body2"
            sx={{
              textDecoration: "line-through",
              color: "#999",
              fontSize: "0.9rem",
            }}
          >
            {product.originalPrice.toLocaleString()}đ
          </Typography>
        )}
        <Typography sx={{ color: "#546E7A", fontWeight: "bold" }}>
          {product.price.toLocaleString()}đ
        </Typography>
      </Box>
    </Stack>
  );
};

export default ProductItem;
