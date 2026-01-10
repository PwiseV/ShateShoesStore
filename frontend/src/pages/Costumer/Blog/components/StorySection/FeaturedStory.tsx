import React from "react";
import { Box, Typography } from "@mui/material";

const FeaturedStory = () => {
  return (
    <Box>
      <Box
        component="img"
        src="https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=800&q=80"
        alt="Featured"
        sx={{
          width: "100%",
          height: 350,
          objectFit: "cover",
          borderRadius: "12px",
          mb: 3,
        }}
      />
      <Typography
        variant="h5"
        sx={{
          textAlign: "left",
          fontWeight: 800,
          color: "#2C3E50",
          fontFamily: '"Lexend", sans-serif',
        }}
      >
        Chuyện những đôi giày kể
      </Typography>
      <Typography sx={{ color: "#567C8D", fontWeight: 500 }}>
        Khám phá xu hướng, bí quyết chọn giày và cảm hứng thời trang dành riêng
        cho bạn.
      </Typography>
      <Typography variant="caption" sx={{ color: "#999" }}>
        Sun September 10th 2025
      </Typography>
    </Box>
  );
};

export default FeaturedStory;
