// src/pages/Customer/Checkout/CheckoutView.tsx
import { Box } from "@mui/material";
import CheckoutForm from "./components/CheckoutForm";
import OrderSummary from "./components/OrderSummary";
import type { useCheckout } from "./hooks/useCheckout";

// Định nghĩa Props dựa trên kiểu dữ liệu trả về của useCheckout
// (Mẹo: dùng ReturnType để lấy kiểu tự động)
type Props = ReturnType<typeof useCheckout>;

const CheckoutView = (props: Props) => {
  // Destructuring props để lấy data
  const {
    items,
    receiverName,
    setReceiverName,
    phone,
    setPhone,
    fullAddress,
    setFullAddress,
    note,
    setNote,
    availableCoupons,
    selectedCoupon,
    handleApplyCouponCode,
    handleSelectCoupon,
    priceSummary,
    handlePlaceOrder,
    loading, // loading lúc ấn nút đặt hàng
  } = props;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", lg: "1.8fr 1fr" },
        gap: 5,
        alignItems: "start",
      }}
    >
      <CheckoutForm
        name={receiverName}
        setName={setReceiverName}
        phone={phone}
        setPhone={setPhone}
        address={fullAddress}
        setAddress={setFullAddress}
        note={note}
        setNote={setNote}
        availableCoupons={availableCoupons}
        onSelectCoupon={handleSelectCoupon}
        selectedCouponId={selectedCoupon?.promotionId}
      />

      <OrderSummary
        items={items}
        subtotal={priceSummary.subtotal}
        shippingFee={priceSummary.shippingFee}
        discountAmount={priceSummary.discountAmount}
        finalTotal={priceSummary.total}
        onApplyCode={handleApplyCouponCode}
        onPlaceOrder={handlePlaceOrder}
        loading={loading}
      />
    </Box>
  );
};

export default CheckoutView;
