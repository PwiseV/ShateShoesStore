import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Stack,
  Button,
  Typography,
  Chip,
  Grid,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";
import SideBar from "../../../components/Customer/SideBar";

import { type Order } from "../../../services/userHistoryServices";
// import { getOrderById } from "../../../services/fakeUserHistoryServices"; // Hoặc service thật
import { getOrderById } from "../../../services/userHistoryServices"; // Hoặc service thật

// Views
import Delivered from "./components/StatusViews/Delivered";
import Shipping from "./components/StatusViews/Shipping";
import Pending from "./components/StatusViews/Pending";
import Cancelled from "./components/StatusViews/Cancelled";

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!orderId) return;
      setLoading(true);
      try {
        const data = await getOrderById(orderId);
        setOrder(data);
      } catch (error) {
        console.error("Lỗi tải đơn hàng:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [orderId]);

  if (loading)
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  if (!order) return <Box sx={{ p: 4 }}>Không tìm thấy đơn hàng</Box>;

  // Mapping status từ Backend sang Component hiển thị
  const renderStatusContent = () => {
    switch (order.status) {
      case "delivered":
        return <Delivered order={order} />;
      case "shipped":
        return <Shipping order={order} />;
      case "cancelled":
        return <Cancelled order={order} />;
      case "pending":
      case "paid":
      case "processing":
        return <Pending order={order} />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (order.status) {
      case "delivered":
        return { bg: "#DCFCE7", color: "#4ADE80", label: "Đã giao" };
      case "shipped":
        return { bg: "#DBEAFE", color: "#60A5FA", label: "Đang vận chuyển" };
      case "cancelled":
        return { bg: "#FEE2E2", color: "#C62828", label: "Đã hủy" };
      default:
        return { bg: "#FEF9C3", color: "#FACC15", label: "Đang xử lý" };
    }
  };
  const statusColor = getStatusColor();

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
            <Box sx={{ position: "sticky", top: "100px" }}>
              <SideBar selectedMenu="History" />
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box sx={{ pl: { md: 4 } }}>
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

              <Box
                sx={{
                  bgcolor: "#C8D9E6",
                  borderRadius: "20px",
                  p: { xs: 2, md: 4 },
                  width: "100%",
                }}
              >
                {/* Header Card: Mã đơn hàng & Trạng thái */}
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
                      {order.orderNumber}
                    </Typography>
                  </Box>
                  <Chip
                    label={statusColor.label}
                    sx={{
                      bgcolor: statusColor.bg,
                      color: statusColor.color,
                      fontWeight: 700,
                    }}
                  />
                </Stack>

                {/* Thanh Địa chỉ & Tiến trình (Đã sửa lỗi thiết kế) */}
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={2}
                  sx={{ mb: 4 }}
                >
                  {/* Địa điểm Gửi */}
                  <Box
                    sx={{
                      bgcolor: "white",
                      borderRadius: "30px",
                      px: 3,
                      py: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                    }}
                  >
                    <LocalShippingOutlinedIcon sx={{ color: "#546E7A" }} />
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      color="#37474F"
                    >
                      {order.fromAddress
                        ? order.fromAddress.split(",").slice(-2).join(", ")
                        : "Kho hàng"}{" "}
                    </Typography>
                  </Box>

                  {/* === PHẦN GIỮA: DÙNG BORDER THAY VÌ TEXT === */}
                  {/* === KHU VỰC GIỮA: THANH TIẾN TRÌNH (ĐÃ SỬA LẠI HOÀN CHỈNH) === */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1, // Tự động co giãn để lấp đầy khoảng trống
                      px: 2,
                      minWidth: "100px",
                    }}
                  >
                    {order.status === "shipped" ? (
                      // === TRƯỜNG HỢP: ĐANG VẬN CHUYỂN ===
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                          gap: 1,
                        }}
                      >
                        {/* 1. Đường kẻ trái */}
                        <Box
                          sx={{
                            position: "relative",
                            flex: 1,
                            height: "2px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {/* Dấu chấm tròn ở đầu */}
                          <FiberManualRecordIcon
                            sx={{
                              fontSize: "10px",
                              color: "#546E7A",
                              position: "absolute",
                              left: -4,
                              zIndex: 1,
                            }}
                          />
                          {/* Dùng Border thay vì Text để không bị lệch */}
                          <Box
                            sx={{
                              width: "100%",
                              borderTop: "2px dashed #90A4AE",
                              opacity: 0.6,
                            }}
                          />
                        </Box>

                        {/* 2. BOX NGÀY DỰ KIẾN (Pill Shape) */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.8,
                            border: "1px solid #CFD8DC", // Viền nhạt giống OrderCard
                            borderRadius: "30px",
                            px: 2,
                            py: 0.6,
                            bgcolor: "white",
                            whiteSpace: "nowrap",
                            zIndex: 2,
                          }}
                        >
                          <AccessTimeIcon
                            sx={{ color: "#546E7A", fontSize: "16px" }}
                          />
                          <Typography
                            sx={{
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              color: "#455A64",
                              fontFamily: '"Lexend", sans-serif',
                            }}
                          >
                            Dự kiến:{" "}
                            {order.arrivedAt
                              ? new Date(order.arrivedAt).toLocaleDateString(
                                  "vi-VN",
                                )
                              : "Đang cập nhật"}
                          </Typography>
                        </Box>

                        {/* 3. Đường kẻ phải */}
                        <Box
                          sx={{
                            position: "relative",
                            flex: 1,
                            height: "2px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              width: "100%",
                              borderTop: "2px dashed #90A4AE",
                              opacity: 0.6,
                            }}
                          />
                          {/* Mũi tên ở cuối */}
                          <ArrowRightAltIcon
                            sx={{
                              fontSize: "1.5rem",
                              color: "#546E7A",
                              position: "absolute",
                              right: -6,
                              zIndex: 1,
                            }}
                          />
                        </Box>
                      </Box>
                    ) : (
                      // === CÁC TRƯỜNG HỢP KHÁC (Chỉ hiện mũi tên dài) ===
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          opacity: 0.5,
                        }}
                      >
                        <FiberManualRecordIcon
                          sx={{
                            fontSize: "10px",
                            color: "#546E7A",
                            position: "absolute",
                            left: 0,
                          }}
                        />
                        <Box
                          sx={{
                            width: "100%",
                            borderTop: "2px dashed #90A4AE",
                            mx: 1,
                          }}
                        />
                        <ArrowRightAltIcon
                          sx={{
                            fontSize: "1.5rem",
                            color: "#546E7A",
                            position: "absolute",
                            right: 0,
                          }}
                        />
                      </Box>
                    )}
                  </Box>

                  {/* Địa điểm Nhận */}
                  <Box
                    sx={{
                      bgcolor: "white",
                      borderRadius: "30px",
                      px: 3,
                      py: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                    }}
                  >
                    <LocationOnOutlinedIcon sx={{ color: "#546E7A" }} />
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      color="#37474F"
                    >
                      {order.address.split(",").slice(-2).join(", ")}
                    </Typography>
                  </Box>
                </Stack>

                {renderStatusContent()}
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
