import React from "react";
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Stack,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Post } from "../types";
import { TABLE_GRID, PAGE_SIZE } from "../constants";

interface PostTableProps {
  loading: boolean;
  posts: Post[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (post: Post) => void;
}

const PostTable: React.FC<PostTableProps> = ({
  loading,
  posts,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  return (
    <>
      {/* HEADER */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: TABLE_GRID,
          backgroundColor: "#567C8D",
          color: "white",
          py: 1.5,
          px: 1,
          borderRadius: "12px 12px 0 0",
          fontWeight: 600,
          fontSize: "0.8rem",
          textAlign: "center",
        }}
      >
        <Box>#</Box>
        <Box sx={{ textAlign: "left", pl: 1 }}>Tiêu đề bài viết</Box>
        <Box>Danh mục</Box>
        <Box sx={{ textAlign: "left", pl: 1 }}>Nội dung tóm tắt</Box>
        <Box>Tác giả</Box>
        <Box>Trạng thái</Box>
        <Box>Tùy chỉnh</Box>
      </Box>

      {/* BODY */}
      <Stack spacing={1} sx={{ mt: 1 }}>
        {loading && <CircularProgress sx={{ alignSelf: "center", my: 2 }} />}

        {!loading && posts.length === 0 && (
          <Typography align="center" color="text.secondary" py={4}>
            Không tìm thấy bài viết nào
          </Typography>
        )}

        {!loading &&
          posts.map((post, index) => (
            <Box
              key={post.id}
              sx={{
                display: "grid",
                gridTemplateColumns: TABLE_GRID,
                backgroundColor: "white",
                py: 1.5,
                px: 1,
                borderRadius: "8px",
                alignItems: "center",
                textAlign: "center",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                transition: "all 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
                },
              }}
            >
              <Typography color="#7f8c8d" fontWeight={500}>
                {index + 1 + (currentPage - 1) * PAGE_SIZE}
              </Typography>

              <Box sx={{ textAlign: "left", pl: 1, overflow: "hidden" }}>
                <Typography
                  fontWeight={600}
                  fontSize="0.9rem"
                  color="#2C3E50"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {post.title}
                </Typography>
                <Typography fontSize="0.7rem" color="#999" fontStyle="italic">
                  {post.createdAt}
                </Typography>
              </Box>

              <Box>
                <Chip
                  label={post.category}
                  size="small"
                  sx={{
                    bgcolor: "#ECEFF1",
                    color: "#455A64",
                    fontWeight: 600,
                  }}
                />
              </Box>

              <Typography
                fontSize="0.85rem"
                color="#666"
                textAlign="left"
                pl={1}
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {post.content}
              </Typography>

              {/* ĐÃ FIX MÀU TÊN TÁC GIẢ TẠI ĐÂY */}
              <Typography fontSize="0.85rem" fontWeight={500} color="#2C3E50">
                {post.author}
              </Typography>

              <Box
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 0.5,
                }}
                onClick={() => onToggleStatus(post)}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: post.status === "active" ? "#00bcd4" : "#ff9800",
                    mr: 0.5,
                  }}
                />
                <Typography
                  fontSize="0.75rem"
                  fontWeight={700}
                  color={post.status === "active" ? "#00bcd4" : "#555"}
                >
                  {post.status === "active" ? "Hiển thị" : "Ẩn"}
                </Typography>
              </Box>

              <Box>
                <IconButton size="small" onClick={() => onEdit(post)}>
                  <EditIcon fontSize="small" color="primary" />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{ color: "#e74c3c" }}
                  onClick={() => onDelete(post.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          ))}
      </Stack>

      {/* PAGINATION */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 3,
          gap: 1,
        }}
      >
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Box
            key={p}
            onClick={() => onPageChange(p)}
            sx={{
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
              cursor: "pointer",
              bgcolor: currentPage === p ? "#2C3E50" : "#E0E0E0",
              color: currentPage === p ? "white" : "#333",
              fontSize: "0.8rem",
              fontWeight: 600,
            }}
          >
            {p}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default PostTable;
