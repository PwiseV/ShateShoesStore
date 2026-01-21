import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CartItemView from "./CartItem";
import type { CartItem } from "../types";

interface Props {
  items: CartItem[];
  onIncrease: (id: string | number) => void;
  onDecrease: (id: string | number) => void;
  onRemove: (id: string | number) => void;
  onToggle: (id: string | number) => void;
  onUpdateVariant: (
    id: string | number,
    newVariantId: string,
    quantity: number
  ) => void;
  // Thêm prop Select All nếu muốn truyền từ hook, hoặc xử lý tại đây
  onToggleAll?: (checked: boolean) => void;
}

const CartList = ({
  items,
  onIncrease,
  onDecrease,
  onRemove,
  onToggle,
  onUpdateVariant,
  onToggleAll,
}: Props) => {
  // Logic kiểm tra xem có đang chọn tất cả không
  const isAllSelected = items.length > 0 && items.every((i) => i.selected);
  const isIndeterminate = items.some((i) => i.selected) && !isAllSelected;

  return (
    <Card sx={{ bgcolor: "#dbe9f3", borderRadius: 4, boxShadow: "none" }}>
      <CardContent sx={{ p: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography
            variant="h5"
            fontWeight={700}
            color="#2F4156"
            sx={{ fontFamily: "'Lexend', sans-serif" }}
          >
            Giỏ hàng của tôi ({items.length})
          </Typography>

          {/* Nút Chọn Tất Cả */}
          {onToggleAll && items.length > 0 && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={(e) => onToggleAll(e.target.checked)}
                />
              }
              label="Chọn tất cả"
              sx={{
                "& .MuiTypography-root": {
                  fontFamily: "'Lexend', sans-serif",
                  fontWeight: 500,
                },
              }}
            />
          )}
        </Box>

        <Divider sx={{ borderColor: "#000000", mt: 1, mb: 4 }} />

        {items.map((item) => (
          <CartItemView
            key={item.cartItemId}
            item={item}
            onIncrease={() => onIncrease(item.cartItemId)}
            onDecrease={() => onDecrease(item.cartItemId)}
            onRemove={() => onRemove(item.cartItemId)}
            onToggle={() => onToggle(item.cartItemId)}
            onUpdateVariant={(id, vid, qty) => onUpdateVariant(id, vid, qty)}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default CartList;
