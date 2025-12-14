import React from "react";
import { Box, Typography } from "@mui/material";

type StockState = "in stock" | "low stock" | "out of stock";

interface StockStatusProps {
  status: StockState;
}

const StockStatus = ({ status }: StockStatusProps) => {
  const config = {
    "in stock": {
      label: "In Stock",
      color: "#4CAF50", // xanh
    },
    "low stock": {
      label: "Low Stock",
      color: "#FFC107", // vàng
    },
    "out of stock": {
      label: "Out of Stock",
      color: "#F44336", // đỏ
    },
  };

  const { label, color } = config[status];

  return (
    <Box
      sx={{
        display: "inline-block",
        px: 1,
        borderRadius: "8px",
        backgroundColor: color,
      }}
    >
      <Typography sx={{ fontSize: "0.6rem", color: "white", fontWeight: 600 }}>
        {label}
      </Typography>
    </Box>
  );
};

export default StockStatus;
