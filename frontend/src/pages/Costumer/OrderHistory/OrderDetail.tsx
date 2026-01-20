import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Divider,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Import components con
import OrderStatusTimeline from "./components/OrderStatusTimeline";
import ProductItem from "./components/ProductItem";

// Import Header & Footer
import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";
import SideBar from "../../../components/Customer/SideBar";

// Import Type và Mock Data từ file cha
import { type Order, MOCK_ORDERS } from "./OrderHistory";

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const foundOrder = MOCK_ORDERS.find((o) => o.id === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
    }
  }, [orderId]);

  if (!order) return <Box sx={{ p: 4 }}>Loading...</Box>;

  return (
    <Box
      sx={{
        bgcolor: "#F5EFEB",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      <Container sx={{ maxWidth: "lg", flex: 1, py: 8 }}>
        <Grid container spacing={2}>
          {/* --- CỘT TRÁI: SIDEBAR --- */}
          <Grid item xs={12} md={3}>
            <SideBar selectedMenu="History" />
          </Grid>

          {/* --- CỘT PHẢI: CHI TIẾT ĐƠN HÀNG --- */}
          <Grid item xs={12} md={9}>
            <Box sx={{ pl: { md: 4 } }}>
              {/* Header: Nút back + Title */}
              <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate("/history")}
                  sx={{
                    color: "#546E7A",
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                >
                  Quay lại
                </Button>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    color: "#2C3E50",
                    fontFamily: '"Lexend", sans-serif',
                  }}
                >
                  Chi tiết đơn hàng
                </Typography>
              </Stack>

              {/* 1. Timeline */}
              <Paper
                elevation={0}
                sx={{ p: 3, mb: 3, borderRadius: "16px", bgcolor: "#E3F2FD" }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "#1565C0" }}
                  >
                    Mã đơn hàng: {order.id}
                  </Typography>
                  <Typography sx={{ color: "#1565C0", fontWeight: 600 }}>
                    {order.statusLabel}
                  </Typography>
                </Stack>
                <Divider sx={{ borderColor: "#BBDEFB" }} />
                <OrderStatusTimeline status={order.status} />
              </Paper>

              {/* 2. Địa chỉ & Vận chuyển */}
              <Grid container spacing={3} mb={3}>
                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: "16px",
                      height: "100%",
                      bgcolor: "white",
                      textAlign: "left",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, mb: 2, color: "#2C3E50" }}
                    >
                      Địa chỉ nhận hàng
                    </Typography>
                    <Typography fontWeight="bold" sx={{ mb: 0.5 }}>
                      {order.shippingAddress?.name}
                    </Typography>
                    <Typography sx={{ color: "#555", mb: 0.5 }}>
                      {order.shippingAddress?.phone}
                    </Typography>
                    <Typography sx={{ color: "#555" }}>
                      {order.shippingAddress?.address}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: "16px",
                      height: "100%",
                      bgcolor: "white",
                      textAlign: "left",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, mb: 2, color: "#2C3E50" }}
                    >
                      Thông tin vận chuyển
                    </Typography>
                    <Typography sx={{ color: "#555" }}>
                      Phương thức: <b>Nhanh</b>
                    </Typography>
                    <Typography sx={{ color: "#555" }}>
                      Đơn vị: <b>Giao Hàng Tiết Kiệm</b>
                    </Typography>
                    <Typography sx={{ color: "#555" }}>
                      Mã vận đơn: <b>8329384923</b>
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              {/* 3. Sản phẩm & Tổng tiền */}
              <Paper
                elevation={0}
                sx={{ p: 3, borderRadius: "16px", bgcolor: "white" }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: "#2C3E50",
                    textAlign: "left",
                  }}
                >
                  Sản phẩm
                </Typography>
                <Stack spacing={3}>
                  {order.products.map((prod) => (
                    <div key={prod.id}>
                      <ProductItem product={prod} />
                      <Divider sx={{ mt: 2 }} />
                    </div>
                  ))}
                </Stack>

                <Box
                  sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
                >
                  <Stack spacing={1} sx={{ minWidth: 250 }}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography color="text.secondary">
                        Tổng tiền hàng:
                      </Typography>
                      <Typography>
                        {(order.totalAmount + 20000).toLocaleString()}đ
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography color="text.secondary">
                        Phí vận chuyển:
                      </Typography>
                      <Typography>-20.000đ</Typography>
                    </Stack>
                    <Divider />
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="#2C3E50"
                      >
                        Thành tiền:
                      </Typography>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        color="#D32F2F"
                      >
                        {order.totalAmount.toLocaleString()}đ
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
};

export default OrderDetail;
