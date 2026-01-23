import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Button,
  Typography,
} from "@mui/material";

import { requestPasswordReset } from "../../services/authServices";
import { useToast } from "../../context/useToast";
import RoundedInput from "../Signin/TextInput";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      showToast("Vui lòng nhập email", "warning");
      return;
    }

    try {
      setLoading(true);

      const data = await requestPasswordReset(email);

      showToast(
        data.message || "Vui lòng kiểm tra email để đặt lại mật khẩu",
        "success"
      );

      // 👉 chuyển sang trang reset, mang theo token
      navigate("/reset-password", {
        state: { token: data.token },
      });
    } catch (err: any) {
      const message =
        err?.message || "Không thể gửi yêu cầu đặt lại mật khẩu";

      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#F5EFEB]">
      <Paper
        elevation={8}
        sx={{
          width: 420,
          p: 4,
          borderRadius: "16px",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          mb={2}
          fontWeight={600}
        >
          Quên mật khẩu
        </Typography>

        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          mb={3}
        >
          Nhập email đã đăng ký để đặt lại mật khẩu
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <RoundedInput
            label="Email"
            type="email"
            value={email}
            setValue={setEmail}
            placeholder="example@email.com"
          />

          <Box textAlign="center" mt={3}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                width: "100%",
                borderRadius: "9999px",
                py: 1,
                backgroundColor: "#5a7d9a",
                "&:hover": { backgroundColor: "#4a6d8a" },
                textTransform: "none",
              }}
            >
              {loading ? "Đang xử lý..." : "Tiếp theo"}
            </Button>
          </Box>

          <Box textAlign="center" mt={2}>
            <Button
              variant="text"
              onClick={() => navigate("/login")}
              sx={{ textTransform: "none" }}
            >
              Quay lại đăng nhập
            </Button>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default ForgotPassword;
