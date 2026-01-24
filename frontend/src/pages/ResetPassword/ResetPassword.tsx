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
import validatePassword from "../../utils/ValidatePassword";
import RoundedInput from "../Signin/TextInput";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const token = location.state?.token;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ============================
      GUARD: bắt buộc có token
  ============================ */
  useEffect(() => {
    if (!token) {
      showToast("Phiên đặt lại mật khẩu không hợp lệ hoặc đã hết hạn", "error");
      navigate("/forgot-password", { replace: true });
    }
  }, [token, navigate, showToast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Kiểm tra rỗng
    if (!newPassword || !confirmPassword) {
      showToast("Vui lòng nhập đầy đủ thông tin", "warning");
      return;
    }

    // 2. Validate độ mạnh mật khẩu (sử dụng hàm từ utils)
    const validationError = validatePassword(newPassword);
    if (validationError) {
      setError(validationError);
      showToast(validationError, "error"); // Hiện toast để người dùng chú ý hơn
      return;
    }

    // 3. Kiểm tra khớp mật khẩu
    if (newPassword !== confirmPassword) {
      showToast("Mật khẩu xác nhận không khớp", "error");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await resetPassword({
        token,
        newPassword,
      });

      showToast(
        data.message || "Đặt lại mật khẩu thành công",
        "success"
      );

      // Chuyển hướng về login sau khi thành công
      navigate("/login", { replace: true });
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || "Không thể đặt lại mật khẩu";
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
        <Typography variant="h5" align="center" mb={2} fontWeight={600}>
          Đặt lại mật khẩu
        </Typography>

        <Typography variant="body2" align="center" color="text.secondary" mb={3}>
          Nhập mật khẩu mới cho tài khoản của bạn
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <RoundedInput
            label="Mật khẩu mới"
            type="password"
            value={newPassword}
            setValue={(val) => {
                setNewPassword(val);
                if (error) setError(null); // Xóa lỗi khi đang gõ lại
            }}
            placeholder="Nhập mật khẩu mới"
            onBlur={() => setError(validatePassword(newPassword))}
          />
          
          {/* Hiển thị thông báo lỗi ngay dưới ô nhập */}
          {error && (
            <Typography color="error" variant="caption" sx={{ ml: 2, display: 'block', mt: -1, mb: 1 }}>
              {error}
            </Typography>
          )}

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
                py: 1.5,
                backgroundColor: "#5a7d9a",
                "&:hover": { backgroundColor: "#4a6d8a" },
                textTransform: "none",
                fontWeight: 600
              }}
            >
              {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
            </Button>
          </Box>

          <Box textAlign="center" mt={2}>
            <Button
              variant="text"
              onClick={() => navigate("/login")}
              sx={{ textTransform: "none", color: "gray" }}
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