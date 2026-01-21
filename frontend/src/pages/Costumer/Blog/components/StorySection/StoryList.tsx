import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { type BlogPost } from "../../../../../services/blogServices";

interface StoryListProps {
  data: BlogPost[];
}

const StoryList: React.FC<StoryListProps> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {data.map((story) => (
        <Box
          key={story.id}
          onClick={() => navigate(`/blog/${story.id}`)}
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            cursor: "pointer",
            transition: "0.2s",
            "&:hover": { transform: "translateX(5px)" },
          }}
        >
          <Box
            component="img"
            src={story.thumbnail}
            sx={{
              width: 150,
              height: 135,
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
