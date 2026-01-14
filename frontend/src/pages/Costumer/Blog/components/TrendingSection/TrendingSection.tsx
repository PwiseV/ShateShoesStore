import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import TrendingCard from "./TrendingCard";

const TRENDING_DATA = [
  {
    id: 1,
    name: "MIRA MARY SNEAKER",
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80",
  },
  {
    id: 2,
    name: "Brownie Ballet",
    image:
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=500&q=80",
  },
  {
    id: 3,
    name: "Ballet Violet",
    image:
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&q=80",
  },
  {
    id: 4,
    name: "Sneaker NxN",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80",
  },
];

const TrendingSection = () => {
  return (
    <Box sx={{ mb: 10, textAlign: "left" }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          color: "#2C3E50",
          mb: 4,
          fontFamily: '"Lexend", sans-serif',
          textAlign: "left",
        }}
      >
        Top Trendings
      </Typography>

      {/* 1 hàng ngang + scroll */}
      <Grid
        container
        spacing={3}
        wrap="wrap"
        sx={{
          pb: 1,
        }}
      >
        {TRENDING_DATA.map((item) => (
          <Grid item key={item.id} sx={{ flex: "0 0 258px" }}>
            <TrendingCard name={item.name} image={item.image} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination Dots */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 1.5, mt: 5 }}>
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            bgcolor: "#2C3E50",
          }}
        />
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            bgcolor: "#cbd5e0",
            cursor: "pointer",
          }}
        />
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            bgcolor: "#cbd5e0",
            cursor: "pointer",
          }}
        />
      </Box>
    </Box>
  );
};

export default TrendingSection;
