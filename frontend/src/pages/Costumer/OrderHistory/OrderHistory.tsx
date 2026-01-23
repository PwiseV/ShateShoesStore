import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  InputBase,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import OrderTabs from "./components/OrderTabs";
import OrderCard from "./components/OrderCard";

// Import Layout
import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";
import SideBar from "../../../components/Customer/SideBar";

// [UPDATED] Import từ Service
import type { Order } from "../../../services/userHistoryServices";
import {
  getOrders,
  getOrderCounts,
} from "../../../services/fakeUserHistoryServices";

const OrderHistory = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // State dữ liệu
  const [orders, setOrders] = useState<Order[]>([]);
  const [counts, setCounts] = useState({
    all: 0,
    pending: 0,
    shipping: 0,
    delivered: 0,
    cancelled: 0,
  });
  const [loading, setLoading] = useState(false);

  // Pagination Logic UI
  const PAGE_SIZE = 3;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Reset nút xem thêm khi filter thay đổi
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [tabValue, searchTerm]);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const statusMap = [
          "all",
          "pending",
          "shipped",
          "delivered",
          "cancelled",
        ];

        let currentStatus = statusMap[tabValue];

        if (tabValue === 2) currentStatus = "shipping"; // Map lại shipping

        // Lấy danh sách (Limit lớn để UI tự cắt bằng slice như cũ)
        const dataRes = await getOrders({
          status: currentStatus,
          search: searchTerm,
        });
        setOrders(dataRes.data);

        // Lấy số lượng cho Tabs
        const countRes = await getOrderCounts();
        setCounts(countRes);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tabValue, searchTerm]);

  // Logic hiển thị
  const displayedOrders = orders.slice(0, visibleCount);
  const isAllShown = visibleCount >= orders.length;
  const remainingCount = orders.length - visibleCount;
  const nextLoadCount = Math.min(PAGE_SIZE, Math.max(0, remainingCount));

  const handleToggleOrders = () => {
    if (isAllShown) setVisibleCount(PAGE_SIZE);
    else setVisibleCount((prev) => prev + PAGE_SIZE);
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
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Box sx={{ position: "sticky", top: "100px" }}>
              <SideBar selectedMenu="History" />
            </Box>
          </Grid>

          <Grid item xs={12} md={9}>
            <Box
              sx={{
                bgcolor: "#D0E1E9",
                borderRadius: "20px",
                p: { xs: 2, md: 4 },
                minHeight: "600px",
              }}
            >
              <OrderTabs
                value={tabValue}
                onChange={setTabValue}
                counts={counts}
              />

              <Paper
                elevation={0}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  borderRadius: "30px",
                  bgcolor: "white",
                  pl: 3,
                  pr: 0.5,
                  py: 0.5,
                  mb: 4,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1, fontFamily: '"Lexend", sans-serif' }}
                  placeholder="Bạn có thể tìm kiếm theo ID đơn hàng hoặc Tên Sản phẩm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <IconButton
                  sx={{
                    bgcolor: "#2C3E50",
                    color: "white",
                    width: 40,
                    height: 40,
                    "&:hover": { bgcolor: "#1a252f" },
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </Paper>

              <Box>
                {loading ? (
                  <Box sx={{ textAlign: "center", py: 4 }}>
                    <CircularProgress sx={{ color: "#546E7A" }} />
                  </Box>
                ) : displayedOrders.length > 0 ? (
                  <>
                    {displayedOrders.map((order) => (
                      <OrderCard key={order.orderId} order={order} />
                    ))}

                    {orders.length > PAGE_SIZE && (
                      <Box sx={{ textAlign: "center", mt: 4, mb: 2 }}>
                        <Button
                          onClick={handleToggleOrders}
                          endIcon={
                            isAllShown ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )
                          }
                          disableRipple
                          sx={{
                            textTransform: "none",
                            color: "#546E7A",
                            fontSize: "0.95rem",
                            fontWeight: 600,
                            fontFamily: '"Lexend", sans-serif',
                            border: "1px solid #90A4AE",
                            borderRadius: "8px",
                            px: 4,
                            py: 1,
                            bgcolor: "transparent",
                            outline: "none !important",
                            "&:hover": {
                              bgcolor: "white",
                              borderColor: "#2C3E50",
                              color: "#2C3E50",
                            },
                          }}
                        >
                          {isAllShown
                            ? "Thu gọn"
                            : `Xem thêm ${nextLoadCount} lịch sử đơn hàng`}
                        </Button>
                      </Box>
                    )}
                  </>
                ) : (
                  <Box
                    sx={{
                      textAlign: "center",
                      py: 8,
                      color: "#666",
                      bgcolor: "rgba(255,255,255,0.5)",
                      borderRadius: "16px",
                    }}
                  >
                    <Typography fontFamily='"Lexend", sans-serif'>
                      Không tìm thấy đơn hàng nào
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default OrderHistory;
