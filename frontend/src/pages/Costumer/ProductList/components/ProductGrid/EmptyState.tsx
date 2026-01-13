// src/pages/Costumer/ProductList/components/ProductGrid/EmptyState.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const EmptyState = () => {
  return (
    <Box sx={{ textAlign: "center", py: 8, width: "100%" }}>
      <SearchOffIcon sx={{ fontSize: 60, color: "#ccc", mb: 2 }} />
      <Typography variant="h6" color="text.secondary">
        Không tìm thấy sản phẩm nào
      </Typography>
    </Box>
  );
};
export default EmptyState;
