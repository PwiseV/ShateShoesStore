import { Card, CardContent, Typography, Divider } from '@mui/material';
import CartItemView from './CartItem';
import type { CartItem } from '../types';

interface Props {
  items: CartItem[];
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}

const CartList = ({ items, onIncrease, onDecrease, onRemove }: Props) => (
  <Card sx={{ bgcolor: '#dbe9f3', borderRadius: 4, boxShadow: 'none' }}>
    <CardContent sx={{ p: { xs: 2, md: 4 } }}>
      <Typography display={"flex"} variant="h5" fontWeight={700} color='#2F4156'>
        Giỏ hàng của tôi ({items.length})
        </Typography>
        <Divider sx={{ borderColor: '#000000', mt: 1, mb: 4 }} />

      {items.map((item, index) => (
        <div key={item.id}>
          <CartItemView 
            item={item} 
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onRemove={onRemove}
          />
          {index < items.length - 1 && (
            <Divider sx={{ borderColor: '#c4d3df', my: 1 }} />
          )}
        </div>
      ))}
    </CardContent>
  </Card>
);

export default CartList;