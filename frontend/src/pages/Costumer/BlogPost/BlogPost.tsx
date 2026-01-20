import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // [MỚI] Để lấy postid từ URL
import { Box, CircularProgress, Typography } from "@mui/material"; // [MỚI] Loading & Error UI

import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";
import BlogHero from "./components/BlogHero";
import BlogContent from "./components/BlogContent";

// [MỚI] Import Services
import { getBlogPostById } from "../../../services/blogPostServices";
// import { getBlogPostById } from "../../../services/blogPostServices";
import type { BlogPostDetail } from "../../../services/blogPostServices";

const BlogPost = () => {
  // 1. Lấy ID bài viết từ URL (khớp với path="/blog/:postid" trong App.tsx)
  const { postid } = useParams<{ postid: string }>();

  // 2. State lưu dữ liệu
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 3. Gọi API khi postid thay đổi
  useEffect(() => {
    const fetchPostDetail = async () => {
      if (!postid) return;

      setLoading(true);
      try {
        const data = await getBlogPostById(postid);
        setPost(data);
      } catch (err) {
        console.error("Failed to fetch blog post:", err);
        setError("Không thể tải bài viết này.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [postid]);

  // 4. Màn hình Loading
  if (loading) {
    return (
      <Box
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Header />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress sx={{ color: "#2C3E50" }} />
        </Box>
        <Footer />
      </Box>
    );
  }

  // 5. Màn hình Lỗi hoặc Không tìm thấy
  if (error || !post) {
    return (
      <Box
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Header />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" color="error">
            {error || "Bài viết không tồn tại"}
          </Typography>
        </Box>
        <Footer />
      </Box>
    );
  }

  // 6. Màn hình Chính (Render dữ liệu thật)
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Phần 1: Banner & Tiêu đề */}
        <BlogHero
          title={post.title}
          author={post.author}
          date={post.published_at} // Map 'published_at' sang 'date'
          image={post.image}
        />

        {/* Phần 2: Nội dung chi tiết (HTML) */}
        <BlogContent content={post.content} />
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
