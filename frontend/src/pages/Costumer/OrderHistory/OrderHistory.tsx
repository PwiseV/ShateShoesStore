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

// --- 1. CẬP NHẬT TYPE DEFINITION (Dựa trên ERD và Thiết kế) ---
export type OrderStatus = "pending" | "shipping" | "delivered" | "cancelled";

export type OrderProduct = {
  id: string;
  name: string;
  variant: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
};

export type Order = {
  id: string; // ERD: order_number
  status: OrderStatus; // ERD: status
  statusLabel: string;
  totalAmount: number; // ERD: total (Thành tiền cuối cùng)
  shippingFee: number; // ERD: shipping_fee
  paymentMethod: string; // ERD: payment_method (từ bảng Payment hoặc Order)
  products: OrderProduct[];

  // Thời gian (ERD: created_at, delivered_at...)
  date: string; // Ngày đặt hàng
  dates: {
    shipped?: string; // Ngày vận chuyển
    delivered?: string; // Ngày giao hàng thành công
    expected?: string; // Ngày dự kiến
  };
  deliveryDuration?: string; // VD: "5 ngày" (Tính toán hoặc lưu trữ)

  // Địa chỉ (ERD: name, phone, address)
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
  };
};

// --- 2. CẬP NHẬT MOCK DATA (5 Đơn hàng đầy đủ thông tin) ---
export const MOCK_ORDERS: Order[] = [
  // 1. ĐANG VẬN CHUYỂN
  {
    id: "CHT-913742",
    status: "shipping",
    statusLabel: "Đang vận chuyển",
    totalAmount: 239000,
    shippingFee: 30000,
    paymentMethod: "Thanh toán khi nhận hàng (COD)",
    date: "20/10/2025",
    dates: {
      shipped: "21/10/2025",
      expected: "25/10/2025",
    },
    shippingAddress: {
      name: "Tuấn Ngọc",
      phone: "0389183498",
      address: "123 Đường Số 1, Phường Linh Trung, Thủ Đức, TP.HCM",
    },
    products: [
      {
        id: "p1",
        name: "NIKE AIR JORDAN 1",
        variant: "Phân loại: Xanh trắng, 37",
        price: 189000,
        originalPrice: 200000,
        quantity: 1,
        image:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768232214/variants/jgvv3pcb1rv82ylylf6u.jpg",
      },
    ],
  },
  // 2. THÀNH CÔNG (Khớp với hình orderdetail.png)
  {
    id: "CHT-882211",
    status: "delivered",
    statusLabel: "Giao hàng thành công",
    totalAmount: 550000,
    shippingFee: 20000,
    paymentMethod: "Thanh toán khi nhận hàng",
    date: "28/9/2024",
    deliveryDuration: "5 ngày",
    dates: {
      shipped: "24/09/2025",
      delivered: "28/09/2025",
    },
    shippingAddress: {
      name: "Tuấn Ngọc",
      phone: "0389183498",
      address:
        "Cổng sau kí túc xá khu B, đại học quốc gia, Phường Linh Trung, Quận Thủ Đức, Hồ Chí Minh",
    },
    products: [
      {
        id: "p3",
        name: "NIKE AIR JORDAN 1",
        variant: "Phân loại: Xanh trắng, 42",
        price: 550000,
        originalPrice: 650000,
        quantity: 1,
        image:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768164423/variants/wz0bxhbozdv9kxae5dnv.jpg",
      },
    ],
  },
  // 3. CHỜ XÁC NHẬN
  {
    id: "CHT-773322",
    status: "pending",
    statusLabel: "Chờ xác nhận",
    totalAmount: 1250000,
    shippingFee: 0, // Freeship
    paymentMethod: "Chuyển khoản ngân hàng",
    date: "28/10/2025",
    dates: {
      expected: "01/11/2025",
    },
    shippingAddress: {
      name: "Nguyễn Văn A",
      phone: "0909123456",
      address: "456 Lê Văn Việt, Quận 9, TP.HCM",
    },
    products: [
      {
        id: "p4",
        name: "NIKE AIR JORDAN 1",
        variant: "Phân loại: Xanh trắng, 40",
        price: 1250000,
        quantity: 1,
        image:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768164423/variants/wz0bxhbozdv9kxae5dnv.jpg",
      },
      {
        id: "p5",
        name: "NIKE AIR JORDAN 1",
        variant: "Phân loại: Đỏ, 41",
        price: 0,
        originalPrice: 50000,
        quantity: 1,
        image:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768235813/variants/fdljulagbgtmkunlvy4u.jpg",
      },
    ],
  },
  // 4. ĐÃ HỦY
  {
    id: "CHT-661100",
    status: "cancelled",
    statusLabel: "Đã hủy",
    totalAmount: 300000,
    shippingFee: 25000,
    paymentMethod: "Ví MoMo",
    date: "15/08/2025",
    dates: {},
    shippingAddress: {
      name: "Trần Thị B",
      phone: "0912345678",
      address: "789 Nguyễn Huệ, Quận 1, TP.HCM",
    },
    products: [
      {
        id: "p6",
        name: "NIKE AIR JORDAN 1",
        variant: "Phân loại: Trắng xanh, 38",
        price: 300000,
        originalPrice: 450000,
        quantity: 1,
        image:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768236078/variants/riy3vfbs0k7soiidbrnq.jpg",
      },
    ],
  },
  // 5. TEST LOAD MORE
  {
    id: "CHT-TEST-MORE",
    status: "delivered",
    statusLabel: "Giao hàng thành công",
    totalAmount: 2500000,
    shippingFee: 50000,
    paymentMethod: "Thanh toán khi nhận hàng",
    date: "01/11/2025",
    deliveryDuration: "3 ngày",
    dates: {
      shipped: "02/11/2025",
      delivered: "05/11/2025",
    },
    shippingAddress: {
      name: "Lê Văn C",
      phone: "0987654321",
      address: "101 Đường 3/2, Cần Thơ",
    },
    products: [
      {
        id: "t1",
        name: "Giày Test 1",
        variant: "Phân loại: Xanh, 40",
        price: 500000,
        quantity: 1,
        image:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768232214/variants/jgvv3pcb1rv82ylylf6u.jpg",
      },
      {
        id: "t2",
        name: "Giày Test 2",
        variant: "Phân loại: Xanh, 41",
        price: 500000,
        quantity: 1,
        image:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768164423/variants/wz0bxhbozdv9kxae5dnv.jpg",
      },
      {
        id: "t3",
        name: "Giày Test 3",
        variant: "Phân loại: Đỏ, 42",
        price: 500000,
        quantity: 1,
        image:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768235813/variants/fdljulagbgtmkunlvy4u.jpg",
      },
      {
        id: "t4",
        name: "Giày Test 4",
        variant: "Phân loại: Xanh, 43",
        price: 500000,
        quantity: 1,
        image:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768236078/variants/riy3vfbs0k7soiidbrnq.jpg",
      },
      {
        id: "t5",
        name: "Giày Test 5",
        variant: "Phân loại: Xanh, 44",
        price: 500000,
        quantity: 1,
        image:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768164423/variants/wz0bxhbozdv9kxae5dnv.jpg",
      },
    ],
  },
];

const OrderHistory = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const PAGE_SIZE = 3;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [tabValue, searchTerm]);

  const orderCounts = {
    all: MOCK_ORDERS.length,
    pending: MOCK_ORDERS.filter((order) => order.status === "pending").length,
    shipping: MOCK_ORDERS.filter((order) => order.status === "shipping").length,
    delivered: MOCK_ORDERS.filter((order) => order.status === "delivered")
      .length,
    cancelled: MOCK_ORDERS.filter((order) => order.status === "cancelled")
      .length,
  };

  const filteredOrders = MOCK_ORDERS.filter((order) => {
    // Filter by Tab
    let matchTab = false;
    if (tabValue === 0) matchTab = true;
    else if (tabValue === 1 && order.status === "pending") matchTab = true;
    else if (tabValue === 2 && order.status === "shipping") matchTab = true;
    else if (tabValue === 3 && order.status === "delivered") matchTab = true;
    else if (tabValue === 4 && order.status === "cancelled") matchTab = true;

    // Filter by Search
    const matchSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.products.some((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    return matchTab && matchSearch;
  });

  const displayedOrders = filteredOrders.slice(0, visibleCount);
  const isAllShown = visibleCount >= filteredOrders.length;
  const remainingCount = filteredOrders.length - visibleCount;
  const nextLoadCount = Math.min(PAGE_SIZE, Math.max(0, remainingCount));

  const handleToggleOrders = () => {
    if (isAllShown) {
      setVisibleCount(PAGE_SIZE);
    } else {
      setVisibleCount((prev) => prev + PAGE_SIZE);
    }
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
        <Grid container spacing={3} alignItems="flex-start">
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
                counts={orderCounts}
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
                {displayedOrders.length > 0 ? (
                  <>
                    {displayedOrders.map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))}

                    {filteredOrders.length > PAGE_SIZE && (
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
                            "&:focus": { outline: "none !important" },
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
