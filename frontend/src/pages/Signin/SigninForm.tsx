import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Paper,
  Button,
  IconButton,
  Link as MuiLink,
  Typography,
  Stack,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Header from "../../components/Customer/Header";

import { useAuth } from "../../context/useAuth";
import { signin, googleSignIn, getMe } from "../../services/authServices";
import { setAccessToken } from "../../services/tokenServices";
import { useToast } from "../../context/useToast";
import RoundedInput from "./TextInput";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Hàm xử lý điều hướng sau khi đăng nhập
  const handleNavigation = useCallback(
    (user: any) => {
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/homepage");
      }
    },
    [navigate],
  );

  // Xử lý OAuth Token từ URL
  useEffect(() => {
    const handleOAuth = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        if (!token) return;

        setAccessToken(token);
        const data = await getMe({ token });
        const user = data.user;

        if (user) {
          setUser(user);
          localStorage.setItem("userId", user.id);

          // Làm sạch URL
          window.history.replaceState(
            {},
            "",
            window.location.origin + window.location.pathname,
          );
          showToast("Sign in successfully", "success");
          handleNavigation(user);
        } else {
          throw new Error("Unable to get user info");
        }
      } catch (err: any) {
        showToast(err.message || "OAuth failed", "error");
        setAccessToken(null);
      }
    };
    handleOAuth();
  }, [setUser, showToast, handleNavigation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast("Please fill in all fields", "warning");
      return;
    }

    try {
      const data = await signin({ email, password });

      if (data.user) {
        setUser(data.user);
        localStorage.setItem("userId", data.user.id);
        showToast(data.message ?? "Welcome back!", "success");
        handleNavigation(data.user);
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err.message || "Signin failed";
      showToast(message, "error");
    }
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F5EFEB",
        display: "flex",
        flexDirection: "column",
        // Ép Header không sticky mà không sửa file gốc
        "& .MuiAppBar-root": {
          position: "static !important",
          marginTop: "10px !important",
        },
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Paper
          elevation={10}
          sx={{
            display: "flex",
            // Giảm độ rộng từ 900px xuống còn 750px
            maxWidth: "900px", 
            width: "100%",
            // Giảm chiều cao tối thiểu cho gọn hơn
            minHeight: "480px", 
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          {/* Left Side - Welcome Section (Ảnh bên trái) */}
          <Box
            sx={{
              flex: 1, // Giảm tỉ lệ chiếm dụng của phần ảnh
              position: "relative",
              display: { xs: "none", md: "block" },
            }}
          >
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1200&q=80"
              alt="Welcome"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.1))",
                display: "flex",
                flexDirection: "column",
                justifyContent: "end",
                p: 3,
                color: "white",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                Welcome!
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9, lineHeight: 1.4 }}>
                Đăng nhập để nhận ngay những ưu đãi phong cách nhất dành riêng cho bạn.
              </Typography>
            </Box>
          </Box>

          {/* Right Side - Login Form (Phần nhập liệu) */}
          <Box
            sx={{
              flex: 1.2,
              p: { xs: 3, md: 5 }, // Giảm padding bên trong
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background: "linear-gradient(135deg, #f8fafc 0%, #e6f0fb 100%)",
            }}
          >
            <Typography
              variant="h5" // Giảm kích thước font title
              sx={{
                fontWeight: 600,
                mb: 2,
                color: "#2F4156",
                textAlign: "center",
              }}
            >
              Sign in
            </Typography>

            {/* Social Login */}
            <Stack direction="row" spacing={1.5} justifyContent="center" mb={2}>
              {[
                { icon: <FacebookIcon fontSize="small" />, action: googleSignIn },
                { icon: <GoogleIcon fontSize="small" />, action: googleSignIn },
                { icon: <LinkedInIcon fontSize="small" />, action: googleSignIn },
              ].map((social, idx) => (
                <IconButton
                  key={idx}
                  onClick={social.action}
                  size="small"
                  sx={{
                    bgcolor: "white",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                    p: 1,
                    "&:hover": { bgcolor: "#5a7d9a", color: "white" },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>

            <Typography variant="caption" align="center" color="text.secondary" mb={2}>
              hoặc sử dụng email
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={1.5}> {/* Dùng Stack để kiểm soát khoảng cách input */}
                <RoundedInput
                  label="Email"
                  type="email"
                  value={email}
                  setValue={setEmail}
                  placeholder="email@example.com"
                />
                <RoundedInput
                  label="Password"
                  type="password"
                  value={password}
                  setValue={setPassword}
                  placeholder="Mật khẩu"
                />
              </Stack>

              <Box textAlign="right" mt={1}>
                <MuiLink
                  component={RouterLink}
                  to="/forgot-password"
                  sx={{
                    color: "#567C8D",
                    fontSize: "0.75rem",
                    textDecoration: "none",
                  }}
                >
                  Quên mật khẩu?
                </MuiLink>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  borderRadius: "9999px",
                  mt: 3,
                  py: 1, // Nút mảnh hơn
                  fontSize: "0.9rem",
                  backgroundColor: "#5a7d9a",
                  "&:hover": { backgroundColor: "#4a6d8a" },
                  textTransform: "none",
                }}
              >
                Sign in
              </Button>

              <Box textAlign="center" mt={2}>
                <Typography variant="caption" color="text.secondary">
                  Chưa có tài khoản?{" "}
                  <MuiLink
                    component={RouterLink}
                    to="/register"
                    sx={{ color: "#5a7d9a", fontWeight: 600, textDecoration: "none" }}
                  >
                    Sign up
                  </MuiLink>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default LoginForm;
