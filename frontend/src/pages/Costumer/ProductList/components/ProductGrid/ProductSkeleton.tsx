import { Box, Paper, Skeleton } from "@mui/material";

const ProductSkeleton = () => {
  return (
    <Paper
      elevation={0}
      sx={{ borderRadius: "16px", overflow: "hidden", bgcolor: "#fff" }}
    >
      <Skeleton variant="rectangular" width="100%" height={220} />
      <Box sx={{ p: 1.5 }}>
        <Skeleton width="70%" />
        <Skeleton width="40%" />
        <Skeleton width="50%" />
      </Box>
    </Paper>
  );
};

export default ProductSkeleton;
