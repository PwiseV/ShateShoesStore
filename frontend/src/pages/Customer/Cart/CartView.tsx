import { Box } from "@mui/material";
import CartList from "./components/CartList";
import CartSummary from "./components/CartSummary";
import type { CartItem, CartColor } from "./types";

interface Props {
  items: CartItem[];
  increaseQty: (id: number | string) => void;
  decreaseQty: (id: number | string) => void;
  removeItem: (id: number | string) => void;
  toggleSelection: (id: number | string) => void;
  updateVariant: (id: number | string, size: string, color: CartColor) => void;
  total: number;
  discount: number;
  finalTotal: number;
  couponCode: string;
  setCouponCode: (code: string) => void;
  applyDiscount: (
    code: string
  ) => Promise<{ success: boolean; discount: number; message: string }>;
  couponMessage: string;
  removeDiscount: () => void;
}

const CartView = ({
  items,
  increaseQty,
  decreaseQty,
  removeItem,
  toggleSelection,
  updateVariant,
  total,
  discount,
  finalTotal,
  couponCode,
  setCouponCode,
  applyDiscount,
  couponMessage,
  removeDiscount,
}: Props) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: { xs: "1fr", lg: "3fr 1.4fr" },
      gap: 5,
    }}
  >
    <CartList
      items={items}
      onIncrease={increaseQty}
      onDecrease={decreaseQty}
      onRemove={removeItem}
      onToggle={toggleSelection}
      onUpdateVariant={updateVariant}
    />
    <CartSummary
      total={total}
      discount={discount}
      finalTotal={finalTotal}
      itemsCount={items.filter((i) => i.selected).length}
      couponCode={couponCode}
      setCouponCode={setCouponCode}
      applyDiscount={applyDiscount}
      couponMessage={couponMessage}
      removeDiscount={removeDiscount}
    />
  </Box>
);

export default CartView;
