import React from "react";
import { Box, Typography } from "@mui/material";

const STORIES = [
  {
    id: 1,
    title: "Mẹo hay cho tín đồ giày đẹp",
    date: "Sun September 10th 2025",
    img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200",
  },
  {
    id: 2,
    title: "Từ đôi giày đến phong cách sống",
    date: "Sun September 10th 2025",
    img: "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=200",
  },
  {
    id: 3,
    title: "Cập nhật xu hướng giày mới nhất",
    date: "Sun September 10th 2025",
    img: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=200",
  },
];

const StoryList = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {STORIES.map((story) => (
        <Box
          key={story.id}
          sx={{ display: "flex", gap: 2, alignItems: "center" }}
        >
          <Box
            component="img"
            src={story.img}
            sx={{
              width: 100,
              height: 100,
              borderRadius: "12px",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
          <Box>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "1rem",
                mb: 1,
                color: "#2C3E50",
                fontFamily: '"Lexend", sans-serif',
              }}
            >
              {story.title}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "#999",
                fontFamily: '"Lexend", sans-serif',
              }}
            >
              {story.date}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default StoryList;
