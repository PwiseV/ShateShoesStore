import { Box, Divider, Typography, CircularProgress } from "@mui/material";
import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";
import CartView from "./CartView";
import { useCart } from "./hooks/useCart";

const CartPage = () => {
  const cart = useCart();

  return (
    <Box
      sx={{
        bgcolor: "#f6f1ec",
        minHeight: "100vh",
        fontFamily: "'Lexend', sans-serif",
      }}
    >
      <Header />

      {cart.loading ? (
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
        <Box sx={{ maxWidth: 1320, mx: "auto", px: 10, py: 6 }}>
          <Typography
            display={"flex"}
            variant="h4"
            fontWeight={800}
            color="#2F4156"
            sx={{ fontFamily: "'Lexend', sans-serif" }}
          >
            Giỏ hàng của tôi
          </Typography>
          <Divider sx={{ borderColor: "#000000", mt: 2, mb: 4 }} />

          <CartView
            items={cart.items}
            increaseQty={cart.increaseQty}
            decreaseQty={cart.decreaseQty}
            removeItem={cart.removeItem}
            toggleSelection={cart.toggleSelection}
            toggleAll={cart.toggleAll}
            updateVariant={cart.updateVariant}
            total={cart.total}
            finalTotal={cart.finalTotal}
          />
        </Box>
      )}
      <Footer />
    </Box>
  );
};

export default CartPage;
