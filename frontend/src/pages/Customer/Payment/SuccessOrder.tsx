// src/pages/Customer/Payment/OrderSuccess.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate("/history"); 
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <Box
      sx={{
        bgcolor: "#f6f1ec",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      <Container
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 4,
            maxWidth: 500,
            width: "100%",
            borderTop: "8px solid #4caf50",
          }}
        >
          <CheckCircleOutlineIcon
            sx={{ fontSize: 100, color: "#4caf50", mb: 2 }}
          />

          <Typography
            variant="h4"
            fontWeight={800}
            color="#2F4156"
            sx={{ fontFamily: "'Lexend', sans-serif" }}
          >
            Đặt hàng thành công
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3} mt={2}>
            Hệ thống sẽ tự động chuyển bạn về trang <b>Đơn hàng của tôi</b> sau{" "}
            {countdown} giây.
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              onClick={() => navigate("/history")}
              sx={{
                bgcolor: "#2C4A5C",
                px: 3,
                borderRadius: "20px",
                "&:hover": { bgcolor: "#1A2E3A" },
              }}
            >
              Xem đơn hàng
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/products")}
              sx={{
                borderColor: "#2C4A5C",
                color: "#2C4A5C",
                px: 3,
                borderRadius: "20px",
                "&:hover": { borderColor: "#1A2E3A" },
              }}
            >
              Tiếp tục mua sắm
            </Button>
          </Stack>
        </Paper>
      </Container>

      <Footer />
    </Box>
  );
};

export default OrderSuccess;
