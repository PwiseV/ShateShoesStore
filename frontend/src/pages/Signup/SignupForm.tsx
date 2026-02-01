import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Paper,
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
import Header from "../../components/Customer/Header"; // Thêm Header vào

import { signup, googleSignIn } from "../../services/authServices";
import { useToast } from "../../context/useToast";
import validatePassword from "../../utils/ValidatePassword";
import RoundedInput from "./TextInput";

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [check, setCheck] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validatePassword(password);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    
    if (password !== confirmPassword) {
      showToast("Mật khẩu xác nhận không khớp!", "error");
      return;
    }

    if (!check) {
      showToast("Bạn phải đồng ý với điều khoản!", "error");
      return;
    }

    try {
      const data = await signup({ name, email, password });
      showToast(data.message || "Đăng ký thành công!", "success");
      navigate("/login");
    } catch (err: any) {
      showToast(err.message || "Something went wrong", "error");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F5EFEB",
        display: "flex",
        flexDirection: "column",
        // Ép Header không sticky
        "& .MuiAppBar-root": {
          position: "static !important",
          marginTop: "20px !important",
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
            maxWidth: "900px", // Nhỏ lại y chang Login
            width: "100%",
            minHeight: "520px", 
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          {/* Left Side - Welcome Section */}
          <Box
            sx={{
              flex: 1,
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
                Join Us!
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9, lineHeight: 1.4 }}>
                Tạo tài khoản ngay để nhận ưu đãi và bắt đầu hành trình phong cách của bạn.
              </Typography>
            </Box>
          </Box>

          {/* Right Side - Signup Form */}
          <Box
            sx={{
              flex: 1.2,
              p: { xs: 3, md: 5 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background: "linear-gradient(135deg, #f8fafc 0%, #e6f0fb 100%)",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: "#2F4156",
                textAlign: "center",
              }}
            >
              Sign up
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
              hoặc đăng ký bằng email
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={1.2}>
                <RoundedInput
                  label="Name"
                  value={name}
                  setValue={setName}
                  type="text"
                  placeholder="Nguyen Van A"
                />
                <RoundedInput
                  label="Email"
                  value={email}
                  setValue={setEmail}
                  type="email"
                  placeholder="example@email.com"
                />
                <Box>
                  <RoundedInput
                    label="Password"
                    value={password}
                    setValue={setPassword}
                    type="password"
                    placeholder="Mật khẩu"
                    onBlur={() => setError(validatePassword(password))}
                  />
                  {error && <Typography sx={{ color: "red", fontSize: "0.7rem", mt: 0.5 }}>{error}</Typography>}
                </Box>
                <RoundedInput
                  label="Confirm Password"
                  value={confirmPassword}
                  setValue={setConfirmPassword}
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                />
              </Stack>

              <FormControlLabel
                control={<Checkbox size="small" checked={check} onChange={() => setCheck(!check)} />}
                label={
                  <Typography sx={{ fontSize: "0.75rem", color: "#2F4156" }}>
                    Tôi đồng ý với các{" "}
                    <MuiLink component={RouterLink} to="/terms" sx={{ color: "#5a7d9a" }}>
                      điều khoản dịch vụ
                    </MuiLink>
                  </Typography>
                }
                sx={{ mt: 1 }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  borderRadius: "9999px",
                  mt: 2,
                  py: 1,
                  fontSize: "0.9rem",
                  backgroundColor: "#5a7d9a",
                  "&:hover": { backgroundColor: "#4a6d8a" },
                  textTransform: "none",
                }}
              >
                Sign up
              </Button>

              <Box textAlign="center" mt={2}>
                <Typography variant="caption" color="text.secondary">
                  Đã có tài khoản?{" "}
                  <MuiLink
                    component={RouterLink}
                    to="/login"
                    sx={{ color: "#5a7d9a", fontWeight: 600, textDecoration: "none" }}
                  >
                    Sign in
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

export default SignupForm;