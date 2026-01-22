import React from "react";
import { Box, Paper, Typography, Button, Stack } from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {
  type Order,
  cancelOrder,
} from "../../../../../services/userHistoryServices"; // [UPDATED]

interface Props {
  order: Order;
}

const Pending: React.FC<Props> = ({ order }) => {
  const handleCancelOrder = async () => {
    if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng?")) {
      try {
        await cancelOrder(order.id, "User cancelled");
        alert("Hủy đơn thành công!");
        window.location.reload();
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          bgcolor: "#FFFDE7",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            p: 1.5,
            bgcolor: "white",
            borderRadius: "50%",
            display: "flex",
          }}
        >
          <HourglassEmptyIcon sx={{ color: "#FBC02D" }} />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 700, color: "#F9A825" }}>
            Đơn hàng đang chờ xác nhận
          </Typography>
          <Typography variant="body2" sx={{ color: "#F57F17" }}>
            Chúng tôi sẽ sớm liên hệ để xác nhận đơn hàng của bạn.
          </Typography>
        </Box>
      </Paper>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
          gap: 2,
          mb: 4,
          alignItems: "stretch",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: "12px",
            bgcolor: "white",
            textAlign: "left",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ fontWeight: 600, color: "#546E7A", mb: 2 }}>
            Thông tin nhận hàng
          </Typography>
          <Typography sx={{ color: "#2C3E50", mb: 0.5 }}>
            Họ tên: {order.shippingAddress.name}
          </Typography>
          <Typography sx={{ color: "#2C3E50", mb: 0.5 }}>
            Điện thoại: {order.shippingAddress.phone}
          </Typography>
          <Typography sx={{ color: "#555" }}>
            Địa chỉ: {order.shippingAddress.address}
          </Typography>
        </Paper>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            bgcolor: "white",
            borderRadius: "12px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="outlined"
            color="error"
            startIcon={<CancelOutlinedIcon />}
            onClick={handleCancelOrder}
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              width: "100%",
              height: "50px",
              borderColor: "#FFCDD2",
              color: "#D32F2F",
              fontWeight: 600,
              "&:hover": { bgcolor: "#FFEBEE", borderColor: "#D32F2F" },
            }}
          >
            Hủy đơn hàng
          </Button>
        </Paper>
      </Box>

      <Typography
        sx={{ color: "#546E7A", mb: 2, fontWeight: 500, textAlign: "left" }}
      >
        Sản phẩm
      </Typography>
      <Stack spacing={2}>
        {order.products.map((prod) => (
          <Paper
            key={prod.id}
            elevation={0}
            sx={{
              p: 2,
              borderRadius: "12px",
              bgcolor: "white",
              display: "flex",
              alignItems: "center",
              gap: 2,
              textAlign: "left",
            }}
          >
            <Box
              component="img"
              src={prod.image}
              sx={{
                width: 60,
                height: 60,
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
            <Box flex={1}>
              <Typography sx={{ fontWeight: 700, color: "#2C3E50" }}>
                {prod.name}
              </Typography>
              <Typography sx={{ color: "#78909C", fontSize: "0.85rem" }}>
                x{prod.quantity}
              </Typography>
              <Typography sx={{ color: "#567C8D", fontSize: "0.9rem" }}>
                {prod.variant}
              </Typography>
            </Box>
            <Typography sx={{ fontWeight: 600, color: "#567C8D" }}>
              {prod.price.toLocaleString()}đ
            </Typography>
          </Paper>
        ))}
      </Stack>
      <Box sx={{ mt: 3, textAlign: "right" }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#2C3E50" }}>
          Thành tiền:{" "}
          <Box component="span" sx={{ color: "#5D5A88" }}>
            {order.totalAmount.toLocaleString()}đ
          </Box>
        </Typography>
      </Box>
    </>
  );
};
export default Pending;
