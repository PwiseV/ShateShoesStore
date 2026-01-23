import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../../context/useToast"; // Import Global Toast
import type { CartItem } from "../types";

interface Props {
  items: CartItem[];
  total: number;
  finalTotal: number;
  // Các props khác giữ nguyên nếu có (discount, coupon...)
}

const CartSummary = ({ items, total, finalTotal }: Props) => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleCheckout = () => {
    // 1. Lọc lấy các sản phẩm đang được chọn
    const selectedItems = items.filter((item) => item.selected);

    // 2. Validate: Nếu chưa chọn sản phẩm nào thì báo lỗi
    if (selectedItems.length === 0) {
      showToast("Vui lòng chọn ít nhất 1 sản phẩm để thanh toán", "error");
      return;
    }

    // 3. Chuyển hướng sang trang Checkout và GỬI KÈM DỮ LIỆU
    navigate("/checkout", {
      state: {
        items: selectedItems, // Danh sách item đã chọn
        total: total, // Tổng tiền gốc
        finalTotal: finalTotal, // Tổng tiền sau giảm giá (nếu có)
      },
    });
  };

  return (
    <Card
      sx={{
        bgcolor: "white",
        borderRadius: 4,
        boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
        height: "fit-content",
        position: "sticky",
        top: 20,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h6"
          fontWeight={700}
          color="#2F4156"
          mb={2}
          sx={{ fontFamily: "'Lexend', sans-serif" }}
        >
          Tổng tiền giỏ hàng
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography color="#546e7a">Tạm tính:</Typography>
            <Typography fontWeight={600}>
              {total.toLocaleString("vi-VN")}đ
            </Typography>
          </Box>
          {/* Nếu có giảm giá thì hiển thị ở đây */}
          <Divider sx={{ my: 2, borderStyle: "dashed" }} />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography fontWeight={700} color="#2F4156">
              Tổng cộng:
            </Typography>
            <Typography fontWeight={700} color="#d32f2f" fontSize={18}>
              {finalTotal.toLocaleString("vi-VN")}đ
            </Typography>
          </Box>
        </Box>

        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleCheckout} // <--- Gắn hàm xử lý vào đây
          sx={{
            bgcolor: "#2F4156",
            py: 1.5,
            borderRadius: 3,
            fontWeight: 700,
            textTransform: "none",
            fontSize: 16,
            "&:hover": { bgcolor: "#1a2530" },
          }}
        >
          Tiến hành đặt hàng
        </Button>
      </CardContent>
    </Card>
  );
};

export default CartSummary;
