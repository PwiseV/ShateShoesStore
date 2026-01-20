import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material"; // Thêm Snackbar, Alert
import { subscribeNewsletter } from "../../../../../services/fakeBlogServices"; // Import Service

const Newsletter = () => {
  // [MỚI] State cho form
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    open: boolean;
    type: "success" | "error";
    message: string;
  }>({
    open: false,
    type: "success",
    message: "",
  });

  // [MỚI] Xử lý gửi form
  const handleSubscribe = async () => {
    if (!email) return;

    setLoading(true);
    try {
      const response = await subscribeNewsletter(email);
      setToast({ open: true, type: "success", message: response.message });
      setEmail(""); // Reset input
    } catch (error: any) {
      setToast({
        open: true,
        type: "error",
        message: error.message || "Có lỗi xảy ra",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{ bgcolor: "#34495E", color: "white", py: 10, textAlign: "center" }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, mb: 1, fontFamily: '"Lexend", sans-serif' }}
        >
          Get Your Style Inspiration
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, mb: 5, fontFamily: '"Lexend", sans-serif' }}
        >
          Straight To Your Box
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mb: 4,
            flexWrap: "wrap",
          }}
        >
          <TextField
            placeholder="example@email.com"
            variant="outlined"
            // [MỚI] Binding state
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            sx={{
              bgcolor: "white",
              borderRadius: "50px",
              width: { xs: "100%", sm: "350px" },
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
                "& fieldset": { border: "none" },
              },
            }}
          />
          <Button
            variant="contained"
            // [MỚI] Gắn sự kiện click
            onClick={handleSubscribe}
            disabled={loading}
            sx={{
              bgcolor: "#5D7C89",
              borderRadius: "50px",
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontWeight: 700,
              boxShadow: "none",
              "&:hover": { bgcolor: "#4a6370", boxShadow: "none" },
            }}
          >
            {loading ? "Sending..." : "Send message"}
          </Button>
        </Box>

        <Typography
          variant="caption"
          sx={{
            opacity: 0.8,
            display: "block",
            maxWidth: 600,
            mx: "auto",
            lineHeight: 1.6,
            color: "#F2F1FA",
          }}
        >
          Hộp thư của bạn sắp xinh hơn rồi đó 💌
          <br />
          Đăng ký để nhận tin về bộ sưu tập mới, ưu đãi độc quyền và các mẹo
          phối giày cực hay nhé!
        </Typography>
      </Container>

      {/* [MỚI] Hiển thị thông báo */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={toast.type} sx={{ width: "100%" }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Newsletter;
