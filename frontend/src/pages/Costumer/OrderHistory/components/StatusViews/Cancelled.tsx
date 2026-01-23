import React from "react";
import { Box, Paper, Typography, Button, Stack } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ReplayIcon from "@mui/icons-material/Replay";
import {
  type Order,
  reOrder,
} from "../../../../../services/userHistoryServices";

interface Props {
  order: Order;
}

const Cancelled: React.FC<Props> = ({ order }) => {
  const handleReOrder = async () => {
    try {
      await reOrder(order.orderId);
      alert("Đã thêm sản phẩm vào giỏ hàng!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          bgcolor: "#FFEBEE",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ p: 1, bgcolor: "white", borderRadius: "50%" }}>
            <CancelIcon sx={{ color: "#D32F2F" }} />
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: 700, color: "#C62828", textAlign: "left" }}
            >
              Đơn hàng đã bị hủy
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#E53935", textAlign: "left" }}
            >
              Vào ngày: {new Date(order.createdAt).toLocaleDateString("vi-VN")}
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          startIcon={<ReplayIcon />}
          onClick={handleReOrder}
          sx={{
            bgcolor: "#4c4feec0",
            color: "white",
            textTransform: "none",
            borderRadius: "8px",
            "&:hover": { bgcolor: "#3639f0da" },
          }}
        >
          Mua lại sản phẩm
        </Button>
      </Paper>

      <Box sx={{ opacity: 0.7 }}>
        <Typography
          sx={{ color: "#546E7A", mb: 2, fontWeight: 500, textAlign: "left" }}
        >
          Sản phẩm đã chọn
        </Typography>
        <Stack spacing={2}>
          {order.items.map((item) => (
            <Paper
              key={item.orderItemId}
              elevation={0}
              sx={{
                p: 2,
                borderRadius: "12px",
                bgcolor: "#FAFAFA",
                display: "flex",
                alignItems: "center",
                gap: 2,
                textAlign: "left",
              }}
            >
              <Box
                component="img"
                src={item.avatar}
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "8px",
                  filter: "grayscale(100%)",
                }}
              />
              <Box flex={1}>
                <Typography sx={{ fontWeight: 700, color: "#546E7A" }}>
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    color: "#78909C",
                    fontSize: "0.9rem",
                    textAlign: "left",
                  }}
                >
                  x{item.quantity}
                </Typography>
                <Typography sx={{ color: "#78909C", fontSize: "0.9rem" }}>
                  {item.color} - Size: {item.size}
                </Typography>
              </Box>
              <Typography sx={{ fontWeight: 600, color: "#78909C" }}>
                {item.price.toLocaleString()}đ
              </Typography>
            </Paper>
          ))}
        </Stack>
      </Box>
    </>
  );
};
export default Cancelled;
