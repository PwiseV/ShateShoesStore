import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import FeaturedStory from "./FeaturedStory";
import StoryList from "./StoryList";

const StorySection = () => {
  return (
    <Box sx={{ mb: 10 }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "left",
          fontWeight: 800,
          color: "#2C3E50",
          mb: 4,
          fontFamily: '"Lexend", sans-serif',
        }}
      >
        Latest Stories
      </Typography>

      <Grid container spacing={6}>
        <Grid item xs={12} md={7}>
          <FeaturedStory />
        </Grid>
        <Grid item xs={12} md={5}>
          <StoryList />
        </Grid>
      </Grid>

      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Button
          variant="outlined"
          sx={{
            borderRadius: "50px",
            px: 5,
            py: 1,
            color: "#666",
            borderColor: "#999",
            textTransform: "none",
            "&:hover": {
              borderColor: "#333",
              color: "#333",
              bgcolor: "transparent",
            },
          }}
        >
          Explore more
        </Button>
      </Box>
    </Box>
  );
};

export default StorySection;
