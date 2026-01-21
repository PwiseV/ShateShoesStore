import {
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
  Box,
} from "@mui/material";
import OrderItem from "./OrderItem";
import type { CartItem } from "../../Cart/types";

interface Props {
    items: CartItem[];
    total: number;
    discount: number;
    finalTotal: number;
    onSubmit: () => void;
    loading: boolean;
}

const OrderSummary = ({ items, total, discount, finalTotal, onSubmit, loading }: Props) => {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: "none" }}>
      <CardContent sx={{ p: 3 }}>
        <Typography
          fontWeight={700}
          color="#2F4156"
          mb={2}
          sx={{ fontFamily: "'Lexend', sans-serif" }}
        >
          Sản phẩm đặt mua
        </Typography>

        {items.map((item) => (
          <OrderItem key={item.id} item={item} />
        ))}

        <Divider sx={{ my: 2 }} />

        <SummaryRow label="Giá gốc" value={total} />
        <SummaryRow label="Giảm giá" value={discount} />
        <SummaryRow label="Phí ship" value={15000} />

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between">
          <Typography fontWeight={700}>Tổng tiền</Typography>
          <Typography fontWeight={800} color="#d32f2f">
            {finalTotal.toLocaleString("vi-VN")} đ
          </Typography>
        </Box>

        <Button
          fullWidth
            variant="contained"
            onClick={onSubmit}
            disabled={loading}
          sx={{
            mt: 3,
            bgcolor: "#000",
            textTransform: "none",
            fontWeight: 700,
          }}
        >
          {loading ? "Đang đặt hàng..." : "Đặt hàng"}
        </Button>
      </CardContent>
    </Card>
  );
};

const SummaryRow = ({
  label,
  value,
}: {
  label: string;
  value: number;
}) => (
  <Box display="flex" justifyContent="space-between" mb={1}>
    <Typography color="#546e7a">{label}</Typography>
    <Typography>{value.toLocaleString("vi-VN")} đ</Typography>
  </Box>
);

export default OrderSummary;
