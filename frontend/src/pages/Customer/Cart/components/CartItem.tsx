import {
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import type { CartItem } from '../types';

interface Props {
  item: CartItem;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}

const CartItemView = ({ item, onIncrease, onDecrease, onRemove }: Props) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: { xs: '80px 1fr', sm: '100px 1fr auto auto' },
      gap: { xs: 2, sm: 3 },
      py: 3,
      alignItems: 'center',
    }}
  >
    {/* Ảnh */}
    <Box
      component="img"
      src={item.product.image}
      alt={item.product.name}
      sx={{ width: 90, height: 90, borderRadius: 2, objectFit: 'cover' }}
    />

    {/* Info */}
    <Box sx={{ textAlign: 'left' }}> 
    <Typography fontWeight={700} variant="subtitle1" color='#567C8D'>
        {item.product.name}
    </Typography>
    <Typography variant="body2" color='#2F4156' mt={0.5}>
        Size: {item.size} • Color: {item.color.color}
    </Typography>
    <Typography fontWeight={700} color='#2F4156' mt={1}>
        {item.product.priceVnd.toLocaleString('vi-VN')} đ
    </Typography>
    </Box>

    {/* Số lượng + Xóa (nhóm lại cho đẹp) */}
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: 2,
        justifyContent: 'flex-end',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #c4d3df',
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: 'white',
        }}
      >
        <IconButton
          size="small"
          onClick={() => onDecrease(item.id as number)}
          disabled={item.quantity <= 1}
          sx={{ borderRight: '1px solid #c4d3df', borderRadius: 0 }}
        >
          <RemoveIcon fontSize="small" />
        </IconButton>

        <Typography sx={{ px: 2, fontWeight: 600, minWidth: 40, textAlign: 'center' }}>
          {item.quantity}
        </Typography>

        <IconButton
          size="small"
          onClick={() => onIncrease(item.id as number)}
          sx={{ borderLeft: '1px solid #c4d3df', borderRadius: 0 }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>

      <IconButton
        color="error"
        size="small"
        onClick={() => onRemove(item.id as number)}
        sx={{ 
          '&:hover': { bgcolor: 'rgba(244,67,54,0.1)' } 
        }}
      >
        <DeleteOutlineIcon />
      </IconButton>
    </Box>
  </Box>
);

export default CartItemView;