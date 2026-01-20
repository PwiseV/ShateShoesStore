import React, { useState, useEffect } from "react";
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

// import { login } from "../../services/authServices";
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

  useEffect(() => {
    (async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        if (!token) return;
        setAccessToken(token);
        const data = await getMe({ token });
        const user = data.user;

        if (user) {
          setUser(user);
          const cleanUrl = window.location.origin + window.location.pathname;
          window.history.replaceState({}, "", cleanUrl);
          showToast("Sign in successfully", "success");
          if (user.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/homepage");
          }
        } else {
          showToast("Unable to get user info from token", "error");
          setAccessToken(null);
        }
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : typeof err === "string"
            ? err
            : "Something went wrong";
        showToast(message, "error");
        setAccessToken(null);
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, "", cleanUrl);
      }
    })();
  }, [setUser, navigate, showToast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // FE gửi email + password -> BE trả về { user, message, accessToken }
      const data = await signin({ email, password });

      if (!data.user) {
        throw new Error("Unexpected response from server");
      }

      setUser(data.user);

      showToast(data.message ?? "Sign in successfully!", "success");

      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/homepage");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "Something went wrong";

      console.log("Signin error:", err);

      showToast(message, "error");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#F5EFEB] overflow-hidden p-6">
      <Paper
        elevation={10}
        className="flex max-w-[800px] w-full h-[90vh] max-h-[210vh] overflow-hidden"
        sx={{ borderRadius: "24px" }}
      >
        {/* Left Side - Welcome Section */}
        <Box className="flex-1 relative hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1200&q=80"
            alt="Welcome"
            className="w-full h-full object-cover"
          />
          <Box className="absolute inset-0 bg-black/30 flex flex-col justify-end p-10 text-white">
            <Typography
              variant="h2"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "1.5rem", md: "2rem" },
                textAlign: "left",
              }}
            >
              Welcome Back!
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textAlign: "left",
                fontSize: { xs: "0.3rem", md: "0.7rem" },
              }}
            >
              <br />
              Mỗi tài khoản là một câu chuyện phong cách riêng.
              <br />
              Hãy đăng nhập để khám phá ưu đãi và nhận gợi ý độc quyền dành cho
              bạn.
            </Typography>
          </Box>
        </Box>

        {/* Right Side - Login Form */}
        <Box
          className="flex-1 p-10 lg:p-15 flex flex-col justify-center "
          sx={{
            background: "linear-gradient(135deg, #f8fafc 0%, #e6f0fb 100%)",
          }}
        >
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: 600,
              mb: 2,
              fontSize: { xs: "1.5m", md: "1.7rem" },
              color: "#2F4156",
            }}
          >
            Sign in
          </Typography>

          {/* Social Login Icons */}
          <Stack direction="row" spacing={3} justifyContent="center" mb={2}>
            <IconButton
              onClick={googleSignIn}
              aria-label="Sign in with Facebook"
              size="medium"
              sx={{
                borderRadius: "8px",
                bgcolor: "common.white",
                "&:hover": { bgcolor: "primary.main", color: "common.white" },
                transition: "all .25s",
              }}
            >
              <FacebookIcon />
            </IconButton>

            <IconButton
              onClick={googleSignIn}
              aria-label="Sign in with Google"
              size="medium"
              sx={{
                borderRadius: "8px",
                bgcolor: "common.white",
                "&:hover": { bgcolor: "primary.main", color: "common.white" },
                transition: "all .25s",
              }}
            >
              <GoogleIcon />
            </IconButton>

            <IconButton
              onClick={googleSignIn}
              aria-label="Sign in with LinkedIn"
              size="medium"
              sx={{
                borderRadius: "8px",
                bgcolor: "common.white",
                "&:hover": { bgcolor: "primary.main", color: "common.white" },
                transition: "all .25s",
              }}
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>

          <Typography variant="body2" align="center" color="#2F4156" mb={1}>
            Or use your account
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mx: "auto", width: "100%", maxWidth: 480 }}
          >
            <RoundedInput
              label="Email"
              type="email"
              value={email}
              setValue={setEmail}
              placeholder="example@email.com"
            />
            <RoundedInput
              label="Password"
              type="password"
              value={password}
              setValue={setPassword}
              placeholder="Your password"
            />

            <Box textAlign="center" mt={2}>
              <MuiLink
                component={RouterLink}
                to="/forgot-password"
                underline="hover"
                sx={{
                  color: "#567C8D",
                  display: "inline-block",
                  mb: 2,
                }}
              >
                Forgot your password?
              </MuiLink>
            </Box>

            <Box textAlign="center" mt={1}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "40%",
                  borderRadius: "9999px",
                  py: 1,
                  fontSize: "1rem",
                  backgroundColor: "#5a7d9a",
                  "&:hover": { backgroundColor: "#4a6d8a" },
                  textTransform: "none",
                }}
              >
                Sign in
              </Button>
            </Box>

            <Box textAlign="center" mt={1}>
              <MuiLink
                href="/register"
                underline="hover"
                sx={{ color: "#567C8D", display: "inline-block" }}
              >
                Sign up
              </MuiLink>
            </Box>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default LoginForm;
