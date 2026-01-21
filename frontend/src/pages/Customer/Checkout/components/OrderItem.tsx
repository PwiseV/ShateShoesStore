import { Box, Typography } from "@mui/material";
import type { CartItem } from "../../Cart/types";

const OrderItem = ({ item }: { item: CartItem }) => {
  const image =
    typeof item.color.avatar === "string"
      ? item.color.avatar
      : item.color.avatar?.url;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        mb: 2,
        bgcolor: "#f5f7fa",
        p: 1.5,
        borderRadius: 2,
      }}
    >
      <Box
        component="img"
        src={image}
        sx={{ width: 60, height: 60, borderRadius: 1 }}
      />

      <Box flex={1}>
        <Typography textAlign={"left"} fontWeight={600} fontSize={14}>
          {item.product.title}
        </Typography>
        <Typography fontSize={12} color="#607d8b">
          {item.size} / {item.color.color} × {item.quantity}
        </Typography>
      </Box>

      <Typography fontWeight={700}>
        {(item.color.price * item.quantity).toLocaleString("vi-VN")} đ
      </Typography>
    </Box>
  );
};

export default OrderItem;
