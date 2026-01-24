import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Pagination,
  CircularProgress,
} from "@mui/material";

import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";

import BlogCard from "./components/BlogCard";
import BlogSearch from "./components/BlogSearch";

// Import Services
import { getBlogList } from "../../../services/blogListServices";
import type { BlogPost } from "../../../services/blogServices";

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Gọi API
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await getBlogList(page, 10, searchTerm);
        setPosts(response.data);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchPosts();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [page, searchTerm]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <Box
      sx={{
        bgcolor: "#F5EFEB", // Màu nền chủ đạo
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      <Container maxWidth="lg" sx={{ flex: 1, py: 6 }}>
        {/* --- TIÊU ĐỀ --- */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: "#2C3E50",
            fontFamily: '"Lexend", sans-serif',
            mb: 4,
          }}
        >
          Blog Posts
        </Typography>

        {/* --- THANH TÌM KIẾM --- */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 8 }}>
          <Box sx={{ width: "100%", maxWidth: "600px" }}>
            <BlogSearch
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
          </Box>
        </Box>

        {/* --- DANH SÁCH BÀI VIẾT --- */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress sx={{ color: "#2C3E50" }} />
          </Box>
        ) : posts.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              // [QUAN TRỌNG] Mobile 1 cột, Laptop trở lên 2 cột đều nhau
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 4, // Khoảng cách giữa các ô (32px)
              alignItems: "stretch", // Kéo giãn chiều cao các thẻ cho bằng nhau
            }}
          >
            {posts.map((post) => (
              <Box key={post.id} sx={{ height: "100%" }}>
                <BlogCard post={post} />
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={{ textAlign: "center", py: 10 }}>
            <Typography variant="h6" color="text.secondary">
              Không tìm thấy bài viết nào.
            </Typography>
          </Box>
        )}

        {/* --- PHÂN TRANG --- */}
        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              // siblingCount={1} hiển thị kiểu: < 1 2 3 ... 9 >
              siblingCount={1}
              boundaryCount={1}
              sx={{
                "& .MuiPagination-ul": {
                  gap: "12px", // Tăng khoảng cách giữa các nút
                  alignItems: "center",
                },
                "& .MuiPaginationItem-root": {
                  fontFamily: '"Lexend", sans-serif',
                  fontSize: "1.2rem", // Cỡ chữ to rõ
                  fontWeight: 400,
                  color: "#2C3E50", // Màu chữ mặc định (Xám đậm)
                  bgcolor: "transparent", // Nền trong suốt
                  border: "none",
                  transition: "all 0.2s",
                  minWidth: "40px",
                  height: "40px",
                  borderRadius: "50%", // Bo tròn hoàn toàn
                  "&:hover": {
                    bgcolor: "rgba(93, 124, 137, 0.1)", // Hover nhẹ màu xanh
                    color: "#5D7C89",
                  },
                },
                // Style riêng cho nút đang được chọn (Active)
                "& .MuiPaginationItem-page.Mui-selected": {
                  bgcolor: "#5D7C89 !important", // Màu nền xanh xám như ảnh
                  color: "white",
                  fontWeight: 600,
                  boxShadow: "0 4px 10px rgba(93, 124, 137, 0.3)", // Đổ bóng nhẹ cho đẹp
                  "&:hover": {
                    bgcolor: "#4a6370 !important",
                  },
                },
                // Style cho dấu ba chấm (...)
                "& .MuiPaginationItem-ellipsis": {
                  color: "#2C3E50",
                  fontSize: "1.2rem",
                  letterSpacing: "2px", // Làm dấu chấm thưa ra giống ảnh ". . ."
                },
                // Style cho nút mũi tên (< >)
                "& .MuiPaginationItem-previousNext": {
                  fontSize: "1.4rem",
                  color: "#2C3E50",
                  "&:hover": {
                    bgcolor: "transparent",
                    color: "#5D7C89",
                  },
                },
              }}
            />
          </Box>
        )}
      </Container>

      <Footer />
    </Box>
  );
};

export default BlogList;
