import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Button, CircularProgress } from "@mui/material";
import FeaturedStory from "./FeaturedStory";
import StoryList from "./StoryList";

// [MỚI] Import Service và Type
import { getLatestPosts } from "../../../../../services/fakeBlogServices";
// import { getLatestPosts } from "../../../../../services/blogServices";
import { type BlogPost } from "../../../../../services/blogServices";

const StorySection = () => {
  // [MỚI] State lưu bài viết
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // [MỚI] Gọi API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getLatestPosts(4); // Lấy 4 bài (1 to + 3 nhỏ)
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch stories", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Tách dữ liệu: Bài đầu tiên là Featured, còn lại là List
  const featuredPost = posts[0];
  const listPosts = posts.slice(1);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ mb: 6 }}>
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
          {/* [MỚI] Truyền dữ liệu vào component con */}
          {featuredPost && <FeaturedStory data={featuredPost} />}
        </Grid>
        <Grid item xs={12} md={5}>
          {/* [MỚI] Truyền dữ liệu vào component con */}
          {listPosts.length > 0 && <StoryList data={listPosts} />}
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
