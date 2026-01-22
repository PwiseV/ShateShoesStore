import React from "react";
import { Box, Paper, Typography, Stack } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EventIcon from "@mui/icons-material/Event";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { type Order } from "../../../../../services/userHistoryServices"; // [UPDATED]

interface Props {
  order: Order;
}

const Shipping: React.FC<Props> = ({ order }) => {
  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          bgcolor: "#E3F2FD",
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
          <LocalShippingIcon sx={{ color: "#1976D2" }} />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 700, color: "#1565C0" }}>
            Đơn hàng đang được vận chuyển
          </Typography>
          <Typography variant="body2" sx={{ color: "#1E88E5" }}>
            Vui lòng chú ý điện thoại từ shipper.
          </Typography>
        </Box>
      </Paper>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2,
          mb: 4,
          alignItems: "stretch",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 3,
            bgcolor: "white",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CalendarTodayIcon sx={{ color: "#546E7A" }} />
          <Box>
            <Typography variant="caption" sx={{ color: "#78909C" }}>
              Ngày đặt hàng:
            </Typography>
            <Typography fontWeight={700} color="#2C3E50">
              {order.date}
            </Typography>
          </Box>
        </Paper>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            bgcolor: "white",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <EventIcon sx={{ color: "#546E7A" }} />
          <Box>
            <Typography variant="caption" sx={{ color: "#78909C" }}>
              Dự kiến giao:
            </Typography>
            <Typography fontWeight={700} color="#2C3E50">
              {order.dates.expected || "Đang cập nhật"}
            </Typography>
          </Box>
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
    </>
  );
};
export default Shipping;
