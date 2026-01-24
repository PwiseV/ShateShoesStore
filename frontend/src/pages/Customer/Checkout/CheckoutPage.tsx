// src/pages/Customer/Checkout/CheckoutPage.tsx
import { Box, Divider, Typography, CircularProgress } from "@mui/material";
import Header from "../../../components/Customer/Header"; // Đảm bảo đường dẫn import đúng
import Footer from "../../../components/Customer/Footer"; // Đảm bảo đường dẫn import đúng
import CheckoutView from "./CheckoutView";
import { useCheckout } from "./hooks/useCheckout";

const CheckoutPage = () => {
  // Gọi logic tại Page để quản lý loading toàn trang
  const checkout = useCheckout();

  return (
    <Box
      sx={{
        bgcolor: "#f6f1ec", // Màu nền giống CartPage
        minHeight: "100vh",
        fontFamily: "'Lexend', sans-serif",
      }}
    >
      <Header />

      {checkout.loading ? (
        // Hiển thị Loading khi đang tải dữ liệu (Address, Coupons...)
        <Box
          sx={{
            height: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        // Nội dung chính
        <Box sx={{ maxWidth: 1320, mx: "auto", px: { xs: 2, md: 10 }, py: 6 }}>
          <Typography
            display={"flex"}
            variant="h4"
            fontWeight={800}
            color="#2F4156"
            sx={{ fontFamily: "'Lexend', sans-serif" }}
          >
            Thông tin đơn hàng
          </Typography>
          <Divider sx={{ borderColor: "#000000", mt: 2, mb: 4 }} />

          {/* Truyền toàn bộ data và function từ hook xuống View */}
          <CheckoutView {...checkout} />
        </Box>
      )}

      <Footer />
    </Box>
  );
};

export default CheckoutPage;
