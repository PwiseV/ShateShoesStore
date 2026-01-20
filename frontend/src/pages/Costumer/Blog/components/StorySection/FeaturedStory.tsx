import React from "react";
import { Box, Typography } from "@mui/material";
import { type BlogPost } from "../../../../../services/blogServices";
// import { type BlogPost } from "../../../../../services/blogServices";

// [MỚI] Định nghĩa Props
interface FeaturedStoryProps {
  data: BlogPost;
}

const FeaturedStory: React.FC<FeaturedStoryProps> = ({ data }) => {
  return (
    <Box>
      <Box
        component="img"
        src={data.thumbnail} // Dùng data từ props
        alt={data.title}
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
        {data.title}
      </Typography>

      <Typography
        sx={{
          color: "#567C8D",
          fontWeight: 500,
          textAlign: "left",
        }}
      >
        {data.summary}
      </Typography>

      <Typography
        variant="caption"
        sx={{
          color: "#999",
          display: "block",
          textAlign: "left",
          fontFamily: '"Lexend", sans-serif',
        }}
      >
        {data.published_at}
      </Typography>
    </Box>
  );
};

export default FeaturedStory;
