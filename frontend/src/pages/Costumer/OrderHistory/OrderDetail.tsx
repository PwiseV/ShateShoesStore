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
  Chip,
} from "@mui/material";
// Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

// Layout
import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";
import SideBar from "../../../components/Customer/SideBar";

// Services
import { type Order } from "../../../services/userHistoryServices";
import { getOrderById } from "../../../services/fakeUserHistoryServices";

// Views
import Delivered from "./components/StatusViews/Delivered";
import Shipping from "./components/StatusViews/Shipping";
import Pending from "./components/StatusViews/Pending";
import Cancelled from "./components/StatusViews/Cancelled";

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!orderId) return;
      try {
        const data = await getOrderById(orderId);
        setOrder(data);
      } catch (error) {
        console.error("Lỗi tải đơn hàng:", error);
      }
    };
    fetchDetail();
  }, [orderId]);

  // Giữ nguyên logic check đơn giản của bạn
  if (!order) return <Box sx={{ p: 4 }}>Loading...</Box>;

  // Render nội dung trạng thái tương ứng
  const renderStatusContent = () => {
    switch (order.status) {
      case "delivered":
        return <Delivered order={order} />;
      case "shipping":
        return <Shipping order={order} />;
      case "pending":
        return <Pending order={order} />;
      case "cancelled":
        return <Cancelled order={order} />;
      default:
        return null;
    }
  };

  // Helper lấy màu badge
  const getStatusColor = () => {
    switch (order.status) {
      case "delivered":
        return { bg: "#DCFCE7", color: "#4ADE80" };
      case "shipping":
        return { bg: "#DBEAFE", color: "#60A5FA" };
      case "pending":
        return { bg: "#FEF9C3", color: "#FACC15" };
      case "cancelled":
        return { bg: "#FEE2E2", color: "#C62828" };
      default:
        return { bg: "#eee", color: "#333" };
    }
  };
  const statusColor = getStatusColor();

  const locationPillStyle = {
    bgcolor: "white",
    borderRadius: "30px",
    px: 3,
    py: 1,
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
    minWidth: "fit-content",
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
            <Box sx={{ position: "sticky", top: "100px" }}>
              <SideBar selectedMenu="History" />
            </Box>
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
                  bgcolor: "#C8D9E6",
                  borderRadius: "20px",
                  p: { xs: 2, md: 4 },
                  minHeight: "600px",
                  width: "800px",
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
                  <Chip
                    label={order.statusLabel}
                    sx={{
                      bgcolor: statusColor.bg,
                      color: statusColor.color,
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      height: "32px",
                    }}
                  />
                </Stack>

                {/* 2. Timeline Vận chuyển */}
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={2}
                  sx={{ mb: 4 }}
                >
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

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#546E7A",
                      opacity: 0.6,
                      flex: 1,
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

                {/* 3. Render Component con tương ứng */}
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
