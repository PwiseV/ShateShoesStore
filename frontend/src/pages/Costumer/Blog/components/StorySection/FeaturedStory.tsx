import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../Admin/Post/utils";
import { type BlogPost } from "../../../../../services/blogServices";

interface FeaturedStoryProps {
  data: BlogPost;
}

const FeaturedStory: React.FC<FeaturedStoryProps> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate(`/blog/${data.id}`)}
      sx={{
        cursor: "pointer",
        "&:hover": { opacity: 0.9 },
      }}
    >
      <Box
        component="img"
        src={data.thumbnail}
        alt={data.title}
        sx={{
          width: "100%",
          height: 450,
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
        {data.summary || data.excerpt}
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
        {formatDate(data.published_at || data.createdAt)}
      </Typography>
    </Box>
  );
};

export default FeaturedStory;
