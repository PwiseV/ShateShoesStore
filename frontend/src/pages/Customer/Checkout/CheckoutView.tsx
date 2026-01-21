import { Box } from "@mui/material";
import CheckoutForm from "./components/CheckoutForm";
import OrderSummary from "./components/OrderSummary";
import { useCheckout } from "./hooks/useCheckout";
import type { CartItem } from "../Cart/types";

interface Props {
  items: CartItem[];
  total: number;
  discount: number;
  finalTotal: number;
}

const CheckoutView = ({ items, total, discount, finalTotal }: Props) => {
  const checkout = useCheckout(items, total, discount, finalTotal);

    return (
      <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", lg: "2.5fr 1.2fr" },
        gap: 4,
      }}
    >
      <CheckoutForm
        shippingInfo={checkout.shippingInfo}
        onChange={checkout.updateField}
        errors={checkout.errors}
      />

      <OrderSummary
        items={items}
        total={total}
        discount={discount}
        finalTotal={finalTotal}
        onSubmit={checkout.submitOrder}
        loading={checkout.loading}
      />
    </Box>
  );
};


export default CheckoutView;
