import { useState, useEffect } from "react";
import { Paper, Typography, Avatar, Box, Button } from "@mui/material";
import { useToast } from "../../../../context/useToast";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import {
  type CommentItem,
  getDashboardComments,
} from "../../../../services/adminServices";

const Comment = () => {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const { showToast } = useToast();
  const navigate = useNavigate(); // 2. Khởi tạo navigate

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await getDashboardComments();
        setComments(res);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : typeof err === "string"
              ? err
              : "Something went wrong";
        showToast(message, "error");
      }
    };
    fetchComments();
  }, []); // 3. Thêm [] để chỉ gọi API một lần khi mount

  return (
    <Paper
      sx={{
        backgroundColor: "#F2F1FA",
        borderRadius: "20px",
        padding: "10px",
        pt: 4,
        width: "100%",
        boxShadow: "none", // Tùy chọn: làm phẳng dashboard
      }}
    >
      <Typography
        sx={{
          fontSize: "1rem",
          fontWeight: 700,
          mb: 1,
          ml: 2,
          textAlign: "left",
        }}
      >
        Comments
      </Typography>
      <Box sx={{}}>
        {comments.slice(0, 4).map((c) => (
          <Box
            key={c.id} // Thêm key để tránh cảnh báo React
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 1,
              borderRadius: "5px",
              p: 1,
            }}
          >
            <Avatar alt={c.id} src={c.avatar} sx={{ width: 50, height: 50 }} />
            <Box>
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: "700",
                  textAlign: "left",
                }}
              >
                {c.username}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  textAlign: "left", // Chỉnh lại textAlign trái cho tự nhiên
                  maxWidth: "150px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {c.content}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mr: 0,
                ml: "auto",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  textAlign: "right",
                  color: "#888",
                }}
              >
                {c.time}
              </Typography>
            </Box>
          </Box>
        ))}
        
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 1,
            px: 1,
          }}
        >
          <Button
            onClick={() => navigate("/admin/reviews")} // 4. Thêm sự kiện điều hướng
            sx={{
              border: "1.5px solid #bbb",
              textTransform: "none",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "black",
              borderRadius: "20px",
              width: "100%",
              py: 0.8,
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.04)",
                borderColor: "#999",
              },
            }}
          >
            More comments
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Comment;