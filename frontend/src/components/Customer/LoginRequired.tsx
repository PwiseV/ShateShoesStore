import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper, Stack, Avatar } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const LoginRequired: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        // Chìa khóa để nằm giữa màn hình
        minHeight: "100vh", 
        width: "100%",
        display: "flex",
        alignItems: "center",     // Giữa theo chiều dọc
        justifyContent: "center", // Giữa theo chiều ngang
        
        p: 2,
        bgcolor: "#f8fafc", // Màu nền nhẹ nhàng để tránh bị đen
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, sm: 5 },
          maxWidth: 460,
          width: "100%",
          textAlign: "center",
          borderRadius: "28px",
          border: "1px solid #e6eaf0",
          boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
          bgcolor: "#fff",
        }}
      >
        {/* Nội dung bên trong giữ nguyên */}
        <Stack spacing={3} alignItems="center">
          <Avatar
            sx={{
              width: 64,
              height: 64,
              bgcolor: "rgba(90,125,154,0.15)",
              color: "#5a7d9a",
            }}
          >
            <LockOutlinedIcon fontSize="large" />
          </Avatar>

          <Typography variant="h5" sx={{ fontWeight: 700, color: "#2F4156" }}>
            Yêu cầu đăng nhập
          </Typography>

          <Typography variant="body2" sx={{ color: "#6b7280", maxWidth: 360 }}>
            Hãy đăng nhập để tiếp tục mua sắm. Việc này giúp chúng tôi bảo mật
            thông tin và cá nhân hóa trải nghiệm của bạn tốt hơn.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ width: "100%", mt: 1 }}
          >
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              fullWidth
              onClick={() => navigate(-1)}
              sx={{
                borderRadius: "999px",
                textTransform: "none",
                fontWeight: 500,
                color: "#5a7d9a",
                borderColor: "#c7d6e2",
                "&:hover": { borderColor: "#5a7d9a", bgcolor: "#f3f7fa" },
              }}
            >
              Quay lại
            </Button>

            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate("/login")}
              sx={{
                borderRadius: "999px",
                textTransform: "none",
                fontWeight: 600,
                bgcolor: "#5a7d9a",
                boxShadow: "0 8px 20px rgba(90,125,154,0.35)",
                "&:hover": { bgcolor: "#4a6d8a" },
              }}
            >
              Đăng nhập
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default LoginRequired;
