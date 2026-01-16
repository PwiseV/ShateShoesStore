import { Box } from '@mui/material';
import CartList from './components/CartList';
import CartSummary from './components/CartSummary';
import type { CartItem } from './types';

interface Props {
  items: CartItem[];
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  removeItem: (id: number) => void;
  total: number;
  discount: number;
  finalTotal: number;
  couponCode: string;
  setCouponCode: (code: string) => void;
  applyDiscount: (code: string) => Promise<{ success: boolean; discount: number; message: string }>;  // ← sửa thành kiểu này
  couponMessage: string;
  removeDiscount: () => void;
}

const CartView = ({
  items,
  increaseQty,
  decreaseQty,
  removeItem,
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
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', lg: '3fr 1.4fr' },
      gap: 5,
    }}
  >
    <CartList
      items={items}
      onIncrease={increaseQty}
      onDecrease={decreaseQty}
      onRemove={removeItem}
    />
    <CartSummary
      total={total}
      discount={discount}
      finalTotal={finalTotal}
      itemsCount={items.length}
      couponCode={couponCode}
      setCouponCode={setCouponCode}
      applyDiscount={applyDiscount}
      couponMessage={couponMessage}
      removeDiscount={removeDiscount}
    />
  </Box>
);

export default CartView;