import React from "react";
import { Box, Typography } from "@mui/material";

const EmptyState = () => {
  return (
    <Box sx={{ py: 10, textAlign: "center", color: "#2C3E50" }}>
      <Typography
        variant="h6"
        fontWeight={700}
        fontFamily='"Lexend", sans-serif'
      >
        Chưa có sản phẩm yêu thích
      </Typography>
      <Typography variant="body2" fontFamily='"Lexend", sans-serif'>
        Hãy thêm một vài sản phẩm để xem lại tại đây.
      </Typography>
    </Box>
  );
};

export default EmptyState;
