import React from "react";
import { Box, Typography } from "@mui/material";
import { type BlogPost } from "../../../../../services/blogServices";

// [MỚI] Định nghĩa Props
interface StoryListProps {
  data: BlogPost[];
}

const StoryList: React.FC<StoryListProps> = ({ data }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {/* Map qua mảng data nhận được từ props */}
      {data.map((story) => (
        <Box
          key={story.id}
          sx={{ display: "flex", gap: 2, alignItems: "center" }}
        >
          <Box
            component="img"
            src={story.thumbnail}
            sx={{
              width: 100,
              height: 100,
              borderRadius: "12px",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
          <Box sx={{ textAlign: "left" }}>
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
              {story.published_at}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default StoryList;
