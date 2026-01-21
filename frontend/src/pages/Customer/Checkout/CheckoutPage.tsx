import { Box, Divider, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";
import CheckoutView from "./CheckoutView";

const CheckoutPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.items || state.items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <Box sx={{ bgcolor: "#f6f1ec", minHeight: "100vh" }}>
      <Header />

      <Box sx={{ maxWidth: 1320, mx: "auto", px: 10, py: 6 }}>
        <Typography
        textAlign="left"
          variant="h4"
          fontWeight={800}
          color="#2F4156"
          sx={{ fontFamily: "'Lexend', sans-serif" }}
        >
          Thông tin đơn hàng
        </Typography>

        <Divider sx={{ borderColor: "#000", mt: 2, mb: 4 }} />

        <CheckoutView {...state} />
      </Box>

      <Footer />
    </Box>
  );
};

export default CheckoutPage;
