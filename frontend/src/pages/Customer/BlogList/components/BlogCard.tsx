import React from "react";
import { Box, Typography, Card, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { BlogPost } from "../../../../services/blogServices";
import { formatDate } from "../../../../utils/dateFormatter";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const navigate = useNavigate();

  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: "transparent", // Trong suốt để hòa vào nền trang web
        borderRadius: "16px",
        height: "100%",
        width: "100%",
        display: "flex",
      }}
    >
      <CardActionArea
        onClick={() => navigate(`/blog/${post.id}`)}
        sx={{
          display: "flex",
          justifyContent: "flex-start", // Căn trái
          alignItems: "center",
          gap: 3, // Khoảng cách giữa ảnh và chữ
          p: 2,
          height: "100%",
          "&:hover .blog-title": { color: "#5D7C89" }, // Hiệu ứng hover đổi màu chữ
          "&:hover img": { transform: "scale(1.05)" }, // Hiệu ứng zoom ảnh nhẹ
        }}
      >
        {/* --- Phần Ảnh (Bên trái) --- */}
        <Box
          sx={{
            width: 140, // Kích thước ảnh vuông
            height: 140,
            flexShrink: 0, // Không cho ảnh bị co lại
            borderRadius: "20px", // Bo góc tròn trịa như thiết kế
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={post.thumbnail}
            alt={post.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease",
            }}
          />
        </Box>

        {/* --- Phần Nội dung (Bên phải) --- */}
        <Box 
          sx={{ 
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography
            className="blog-title"
            variant="h6"
            sx={{
              textAlign: "left",
              fontWeight: 800,
              fontFamily: '"Lexend", sans-serif',
              color: "#2C3E50",
              fontSize: "1.1rem",
              lineHeight: 1.4,
              transition: "color 0.3s ease",
            }}
          >
            {post.title}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: "#999",
              fontFamily: '"Lexend", sans-serif',
              fontSize: "0.85rem",
              display: "block",
              mt: 1,
            }}
          >
            {formatDate((post.published_at || post.createdAt) ?? "")}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default BlogCard;
