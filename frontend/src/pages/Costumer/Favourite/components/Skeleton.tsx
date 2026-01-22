import React from "react";
import { Box, Paper, Skeleton } from "@mui/material";

const ProductSkeleton = () => {
  return (
    <Paper elevation={0} sx={{ bgcolor: "transparent", borderRadius: 0 }}>
      {/* Ảnh bo góc */}
      <Skeleton
        variant="rectangular"
        width="100%"
        sx={{ aspectRatio: "1/1", borderRadius: "20px" }}
      />

      <Box sx={{ pt: 2 }}>
        <Skeleton width="80%" height={24} sx={{ mb: 1 }} />
        <Skeleton width="30%" height={20} sx={{ mb: 1 }} />
        <Skeleton width="50%" height={30} />

        <Box sx={{ mt: 3 }}>
          <Skeleton width="100%" height={45} sx={{ mb: 1.5 }} />
          <Skeleton width="100%" height={45} />
        </Box>
      </Box>
    </Paper>
  );
};

export default ProductSkeleton;
