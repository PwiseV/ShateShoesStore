import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Button,
  Typography,
} from "@mui/material";

import { resetPassword } from "../../services/authServices";
import { useToast } from "../../context/useToast";
import RoundedInput from "../Signin/TextInput";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const token = location.state?.token;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  /* ============================
     GUARD: bắt buộc có token
  ============================ */
  useEffect(() => {
    if (!token) {
      showToast("Phiên đặt lại mật khẩu không hợp lệ", "error");
      navigate("/forgot-password", { replace: true });
    }
  }, [token, navigate, showToast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      showToast("Vui lòng nhập đầy đủ thông tin", "warning");
      return;
    }

    if (newPassword.length < 6) {
      showToast("Mật khẩu phải có ít nhất 6 ký tự", "warning");
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast("Mật khẩu xác nhận không khớp", "error");
      return;
    }

    try {
      setLoading(true);

      const data = await resetPassword({
        token,
        newPassword,
      });

      showToast(
        data.message || "Đặt lại mật khẩu thành công",
        "success"
      );

      navigate("/login", { replace: true });
    } catch (err: any) {
      const message =
        err?.message || "Không thể đặt lại mật khẩu";

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
          Đặt lại mật khẩu
        </Typography>

        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          mb={3}
        >
          Nhập mật khẩu mới cho tài khoản của bạn
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <RoundedInput
            label="Mật khẩu mới"
            type="password"
            value={newPassword}
            setValue={setNewPassword}
            placeholder="Nhập mật khẩu mới"
          />

          <RoundedInput
            label="Xác nhận mật khẩu"
            type="password"
            value={confirmPassword}
            setValue={setConfirmPassword}
            placeholder="Nhập lại mật khẩu"
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
              {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
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

export default ResetPassword;
