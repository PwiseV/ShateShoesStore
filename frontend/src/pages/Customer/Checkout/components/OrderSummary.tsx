// src/pages/Customer/Checkout/components/OrderSummary.tsx
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import type { CartItem } from "../../Cart/types";

interface Props {
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  finalTotal: number;
  onApplyCode: (code: string) => void;
  onPlaceOrder: () => void;
  loading: boolean;
}

const OrderSummary = ({
  items,
  subtotal,
  shippingFee,
  discountAmount,
  finalTotal,
  onApplyCode,
  onPlaceOrder,
  loading,
}: Props) => {
  const [code, setCode] = useState("");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* 1. Nhập mã giảm giá */}
      <Card sx={{ borderRadius: 3, boxShadow: "none" }}>
        <CardContent>
          <Typography
            fontWeight={700}
            mb={2}
            color="#2F4156"
            fontFamily="'Lexend', sans-serif"
          >
            Giảm giá
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Mã giảm giá"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              sx={{ bgcolor: "white" }}
              disabled={loading} // Disable khi đang call API
            />
            <Button
              variant="contained"
              onClick={() => onApplyCode(code)} // <--- Trigger API check
              disabled={!code || loading}
              sx={{
                bgcolor: "#546e7a",
                textTransform: "none",
                fontWeight: 600,
                minWidth: 100,
                "&:hover": { bgcolor: "#2F4156" },
              }}
            >
              {loading ? "..." : "ÁP DỤNG"}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* 2. Danh sách sản phẩm & Tổng tiền */}
      <Card sx={{ borderRadius: 3, boxShadow: "none", minHeight: 400 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography
            fontWeight={700}
            fontSize={18}
            mb={2}
            color="#2F4156"
            fontFamily="'Lexend', sans-serif"
          >
            Sản phẩm đặt mua
          </Typography>

          <Divider sx={{ mb: 2 }} />

          {/* List Items (Scrollable nếu dài) */}
          <Box sx={{ maxHeight: 300, overflowY: "auto", mb: 2 }}>
            {items.map((item) => (
              <Box
                key={item.cartItemId}
                sx={{
                  display: "flex",
                  gap: 2,
                  mb: 2,
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid #eee",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={item.avatar || item.product.avatar}
                    alt={item.product.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    fontFamily="'Lexend', sans-serif"
                    color="#2F4156"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {item.product.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontFamily="'Lexend', sans-serif"
                  >
                    Size: {item.size} | {item.color}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    fontFamily="'Lexend', sans-serif"
                  >
                    x{item.quantity}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    fontFamily="'Lexend', sans-serif"
                  >
                    {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Price Calculation */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="body2"
                color="#546e7a"
                fontFamily="'Lexend', sans-serif"
              >
                Giá gốc
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                fontFamily="'Lexend', sans-serif"
              >
                {subtotal.toLocaleString("vi-VN")}đ
              </Typography>
            </Box>

            {discountAmount > 0 && (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="body2"
                  color="#546e7a"
                  fontFamily="'Lexend', sans-serif"
                >
                  Giảm giá
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  fontFamily="'Lexend', sans-serif"
                  color="success.main"
                >
                  -{discountAmount.toLocaleString("vi-VN")}đ
                </Typography>
              </Box>
            )}

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="body2"
                color="#546e7a"
                fontFamily="'Lexend', sans-serif"
              >
                Phí ship
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                fontFamily="'Lexend', sans-serif"
              >
                {shippingFee.toLocaleString("vi-VN")}đ
              </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                fontWeight={800}
                color="#2F4156"
                fontSize={18}
                fontFamily="'Lexend', sans-serif"
              >
                Tổng tiền
              </Typography>
              <Typography
                fontWeight={800}
                color="#2F4156"
                fontSize={20}
                fontFamily="'Lexend', sans-serif"
              >
                {finalTotal.toLocaleString("vi-VN")}đ
              </Typography>
            </Box>
          </Box>

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={onPlaceOrder}
            disabled={loading}
            sx={{
              mt: 3,
              bgcolor: "#546e7a",
              py: 1.5,
              borderRadius: 1,
              fontWeight: 700,
              textTransform: "none",
              fontSize: 16,
              "&:hover": { bgcolor: "#2F4156" },
            }}
          >
            {loading ? "Đang xử lý..." : "Đặt hàng"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderSummary;
