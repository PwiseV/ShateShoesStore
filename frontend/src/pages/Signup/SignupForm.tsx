import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  TextField,
  Button,
  IconButton,
  Link as MuiLink,
  Typography,
  Stack,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import { signup } from "../../services/fakeAuthServices";
import { useToast } from "../../context/useToast";

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [check, setCheck] = useState(false);

  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await signup(name, email, password, confirmPassword, check);
      showToast(data.message, "success");
      navigate("/login");
    } catch (err: unknown) {
      console.error("Register error:", err);

      const message =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "Something went wrong";

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
              variant="h1"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "2rem", md: "1.4rem" },
                textAlign: "left",
                mt: 2,
              }}
            >
              Create your account today and get started for free!
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textAlign: "left",
                fontSize: { xs: "0.5rem", md: "0.7rem" },
              }}
            >
              <br />
              Hãy đăng ký để tiếp tục hành trình tìm kiếm đôi giày hoàn hảo dành
              riêng cho bạn nhé!
            </Typography>
          </Box>
        </Box>

        {/* Right Side - Login Form */}
        <Box
          className="flex-1 p-10 lg:p-15 flex flex-col justify-center"
          sx={{
            background: "linear-gradient(135deg, #f8fafc 0%, #e6f0fb 100%)",
          }}
        >
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "1.5rem", md: "1.7rem" },
              color: "#2F4156",
            }}
          >
            Sign up
          </Typography>

          {/* Social Login Icons */}
          <Stack direction="row" spacing={3} justifyContent="center" mb={2}>
            <IconButton
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
            Or using email for registration
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mx: "auto", width: "100%", maxWidth: 480 }}
          >
            <TextField
              id="name"
              label="Name"
              type="ext"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              margin="normal"
              placeholder="Ly Thi Let"
              InputProps={{
                sx: {
                  borderRadius: "9999px",
                  bgcolor: "common.white",
                  height: 40,
                  padding: "0 14px", // để chữ không bị sát
                },
              }}
              InputLabelProps={{
                sx: {
                  fontSize: "0.9rem",
                  top: "-5px", // 🔥 chỉnh label lên/xuống
                  left: 10,
                  "&.MuiInputLabel-shrink": {
                    top: "0", // khi thu nhỏ, label về đúng vị trí
                  },
                },
              }}
            />
            <TextField
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              margin="dense"
              placeholder="example@email.com"
              InputProps={{
                sx: {
                  borderRadius: "9999px",
                  bgcolor: "common.white",
                  height: 40,
                  padding: "0 14px", // để chữ không bị sát
                },
              }}
              InputLabelProps={{
                sx: {
                  fontSize: "0.9rem",
                  top: "-5px", // 🔥 chỉnh label lên/xuống
                  left: 10,
                  "&.MuiInputLabel-shrink": {
                    top: "0", // khi thu nhỏ, label về đúng vị trí
                  },
                },
              }}
            />

            <TextField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              margin="dense"
              placeholder="Your password"
              InputProps={{
                sx: {
                  borderRadius: "9999px",
                  bgcolor: "common.white",
                  height: 40,
                  padding: "0 14px", // để chữ không bị sát
                },
              }}
              InputLabelProps={{
                sx: {
                  fontSize: "0.9rem",
                  top: "-5px", // 🔥 chỉnh label lên/xuống
                  left: 10,
                  "&.MuiInputLabel-shrink": {
                    top: "0", // khi thu nhỏ, label về đúng vị trí
                  },
                },
              }}
            />

            <TextField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              fullWidth
              margin="dense"
              placeholder="Your password"
              InputProps={{
                sx: {
                  borderRadius: "9999px",
                  bgcolor: "common.white",
                  height: 40,
                  padding: "0 14px", // để chữ không bị sát
                },
              }}
              InputLabelProps={{
                sx: {
                  fontSize: "0.9rem",
                  top: "-5px", // 🔥 chỉnh label lên/xuống
                  left: 10,
                  "&.MuiInputLabel-shrink": {
                    top: "0", // khi thu nhỏ, label về đúng vị trí
                  },
                },
              }}
            />

            <FormControlLabel
              required
              value={check}
              control={<Checkbox  size="small"/>}
              onChange={() => setCheck(!check)}

              label={
                <span className="text-[#2F4156] text-xs">
                  Tôi đồng ý với tất cả các{" "}
                  <a href="/terms" className="text-blue-600 underline">
                    điều khoản dịch vụ
                  </a>
                </span>
              }
            />

            <Box textAlign="center" mt={1}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "40%",
                  borderRadius: "9999px",
                  py: 0.75,
                  fontSize: "1rem",
                  backgroundColor: "#5a7d9a",
                  "&:hover": { backgroundColor: "#4a6d8a" },
                  textTransform: "none",
                }}
              >
                Sign up
              </Button>
            </Box>

            <Box textAlign="center" mt={1}>
              <MuiLink
                href="/login"
                underline="hover"
                sx={{ color: "#567C8D", display: "inline-block" }}
              >
                Sign in
              </MuiLink>
            </Box>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default SignupForm;
