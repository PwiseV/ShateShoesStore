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
// Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

// Import components con
import ProductItem from "./components/ProductItem";

// Layout
import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";
import SideBar from "../../../components/Customer/SideBar";

// Import Type và Mock Data
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

  // Style cho viên thuốc địa điểm (Màu trắng, bo tròn)
  const locationPillStyle = {
    bgcolor: "white",
    borderRadius: "30px", // Bo tròn mạnh
    px: 3,
    py: 1.2, // Độ cao vừa phải
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    boxShadow: "0 2px 4px rgba(0,0,0,0.02)", // Bóng rất nhẹ hoặc bỏ nếu muốn phẳng lì
  };

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
          <Grid item xs={12} md={3}>
            <SideBar selectedMenu="History" />
          </Grid>

          <Grid item xs={12} md={9}>
            <Box sx={{ pl: { md: 4 } }}>
              {/* Header: Quay lại & Title */}
              <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate("/history")}
                  sx={{
                    color: "#546E7A",
                    fontWeight: "bold",
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "transparent",
                      textDecoration: "underline",
                    },
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

              {/* BOX NỀN XANH BAO BỌC */}
              <Box
                sx={{
                  bgcolor: "#C8D9E6", // Màu nền xanh chủ đạo
                  borderRadius: "20px",
                  p: { xs: 2, md: 4 },
                }}
              >
                {/* 1. Header Mã đơn & Trạng thái */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={4}
                >
                  <Box>
                    <Typography
                      variant="body1"
                      textAlign="left"
                      sx={{ color: "#546E7A", mb: 0.5, fontWeight: 500 }}
                    >
                      Mã đơn hàng
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: "#2C3E50" }}
                    >
                      {order.id}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      bgcolor: "#C8E6C9", // Hoặc đổi màu theo status
                      color: "#2E7D32",
                      px: 2.5,
                      py: 0.8,
                      borderRadius: "30px",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                    }}
                  >
                    {order.statusLabel}
                  </Box>
                </Stack>

                {/* --- 2. LỘ TRÌNH VẬN CHUYỂN (GIỐNG HÌNH image_bdf79a.png) --- */}
                <Stack
                  direction={{ xs: "column", md: "row" }} // Mobile dọc, PC ngang
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={2}
                  sx={{ mb: 4 }}
                >
                  {/* Pill 1: Điểm gửi */}
                  <Box sx={locationPillStyle}>
                    <LocalShippingOutlinedIcon sx={{ color: "#546E7A" }} />
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      color="#37474F"
                    >
                      Thủ Đức, Tp Hồ Chí Minh
                    </Typography>
                  </Box>

                  {/* Mũi tên kết nối (Nằm trực tiếp trên nền xanh) */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#546E7A",
                      opacity: 0.6,
                      flex: 1, // Co giãn chiếm khoảng trống
                      justifyContent: "center",
                      px: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        letterSpacing: 4,
                        mr: 1,
                        fontWeight: 700,
                        fontSize: "1.2rem",
                      }}
                    >
                      - - - - - -
                    </Typography>
                    <ArrowRightAltIcon />
                  </Box>

                  {/* Pill 2: Điểm nhận */}
                  <Box sx={locationPillStyle}>
                    <LocationOnOutlinedIcon sx={{ color: "#546E7A" }} />
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      color="#37474F"
                    >
                      Bình Sơn, Quãng Ngãi
                    </Typography>
                  </Box>
                </Stack>
                {/* ----------------------------------------------------------- */}

                {/* 3. Địa chỉ & Vận chuyển */}
                <Grid container spacing={3} mb={3}>
                  <Grid item xs={12} md={6}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: "16px",
                        height: "100%",
                        bgcolor: "white",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 700, mb: 2, color: "#546E7A" }}
                      >
                        Địa chỉ nhận hàng
                      </Typography>
                      <Typography
                        fontWeight="bold"
                        sx={{ mb: 0.5, color: "#2C3E50" }}
                      >
                        {order.shippingAddress?.name}
                      </Typography>
                      <Typography
                        sx={{ color: "#555", mb: 0.5, fontSize: "0.95rem" }}
                      >
                        {order.shippingAddress?.phone}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#555",
                          fontSize: "0.95rem",
                          lineHeight: 1.5,
                        }}
                      >
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
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 700, mb: 2, color: "#546E7A" }}
                      >
                        Thông tin vận chuyển
                      </Typography>
                      <Stack spacing={1.5}>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography
                            sx={{ color: "#555", fontSize: "0.95rem" }}
                          >
                            Phương thức:
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 600, color: "#2C3E50" }}
                          >
                            Nhanh
                          </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography
                            sx={{ color: "#555", fontSize: "0.95rem" }}
                          >
                            Đơn vị:
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 600, color: "#2C3E50" }}
                          >
                            Giao Hàng Tiết Kiệm
                          </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography
                            sx={{ color: "#555", fontSize: "0.95rem" }}
                          >
                            Mã vận đơn:
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 600, color: "#2C3E50" }}
                          >
                            8329384923
                          </Typography>
                        </Stack>
                        {order.deliveryDuration && (
                          <Stack direction="row" justifyContent="space-between">
                            <Typography
                              sx={{ color: "#555", fontSize: "0.95rem" }}
                            >
                              Thời gian:
                            </Typography>
                            <Typography
                              sx={{ fontWeight: 600, color: "#2C3E50" }}
                            >
                              {order.deliveryDuration}
                            </Typography>
                          </Stack>
                        )}
                      </Stack>
                    </Paper>
                  </Grid>
                </Grid>

                {/* 4. Sản phẩm */}
                <Typography
                  variant="body1"
                  textAlign="left"
                  sx={{ fontWeight: 500, mb: 2, color: "#2C3E50" }}
                >
                  Sản phẩm
                </Typography>
                <Stack spacing={2}>
                  {order.products.map((prod) => (
                    <Paper
                      key={prod.id}
                      elevation={0}
                      sx={{ p: 2, borderRadius: "12px", bgcolor: "white" }}
                    >
                      <ProductItem product={prod} />
                    </Paper>
                  ))}
                </Stack>

                {/* Tổng tiền */}
                <Box
                  sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
                >
                  <Stack spacing={1} sx={{ minWidth: 300 }}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography color="#546E7A">Tổng tiền hàng:</Typography>
                      <Typography fontWeight={500}>
                        {(
                          order.totalAmount - order.shippingFee
                        ).toLocaleString()}
                        đ
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography color="#546E7A">Phí vận chuyển:</Typography>
                      <Typography fontWeight={500}>
                        {order.shippingFee.toLocaleString()}đ
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography color="#546E7A">Thanh toán:</Typography>
                      <Typography
                        fontWeight={500}
                        sx={{
                          textAlign: "right",
                          maxWidth: "150px",
                          fontSize: "0.9rem",
                        }}
                      >
                        {order.paymentMethod}
                      </Typography>
                    </Stack>
                    <Divider sx={{ my: 1 }} />
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
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default OrderDetail;
