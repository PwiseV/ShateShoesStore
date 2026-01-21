import { Box } from "@mui/material";
import CartList from "./components/CartList";
import CartSummary from "./components/CartSummary";
import type { CartItem } from "./types";

interface Props {
  items: CartItem[];
  increaseQty: (id: string | number) => void;
  decreaseQty: (id: string | number) => void;
  removeItem: (id: string | number) => void;
  toggleSelection: (id: string | number) => void;
  toggleAll: (checked: boolean) => void;
  updateVariant: (id: string | number, size: string, quantity: number) => void;
  total: number;
  finalTotal: number;
  // Đã xóa snackbar props
}

const CartView = ({
  items,
  increaseQty,
  decreaseQty,
  removeItem,
  toggleSelection,
  toggleAll,
  updateVariant,
  total,
  finalTotal,
}: Props) => {
  return (
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
        onToggleAll={toggleAll}
        onUpdateVariant={updateVariant}
      />

      <CartSummary items={items} total={total} finalTotal={finalTotal} />
    </Box>
  );
};

export default CartView;
