import React from "react";
import { Box, Paper, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ReplayIcon from "@mui/icons-material/Replay";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import {
  type Order,
  reOrder,
} from "../../../../../services/userHistoryServices";

interface Props {
  order: Order;
}

const Delivered: React.FC<Props> = ({ order }) => {
  const navigate = useNavigate();
  const handleReOrder = async () => {
    try {
      await reOrder(order.orderId);
      alert("Đã thêm vào giỏ!");
    } catch (e) {
      console.error(e);
    }
  };

  const forceWrapStyle = {
    whiteSpace: "normal",
    wordBreak: "break-word", // Ngắt từ nếu cần
    overflowWrap: "break-word", // Chuẩn CSS hiện đại để ngắt dòng
    width: "100%",
  };

  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}
    >
      {/* === 1. TOP CARDS === */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr 1fr" },
          gap: 2,
          width: "100%",
        }}
      >
        {/* CARD 1: Cảm ơn */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            bgcolor: "#FDF8F5",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
            gap: 1.5,
            minHeight: "200px",
            minWidth: 0, // [FIX]: Tránh vỡ layout khi nội dung quá dài
          }}
        >
          <Box>
            <Box
              sx={{
                display: "inline-flex",
                p: 1,
                bgcolor: "white",
                borderRadius: "50%",
                mb: 1,
                border: "1px solid #eee",
              }}
            >
              <VolunteerActivismOutlinedIcon sx={{ color: "#546E7A" }} />
            </Box>
            <Typography
              sx={{ fontWeight: 500, color: "#2C3E50", ...forceWrapStyle }}
            >
              Cảm ơn cậu đã mua hàng của chúng tớ!
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<ReplayIcon fontSize="small" />}
            onClick={handleReOrder}
            sx={{
              bgcolor: "#37474F",
              color: "white",
              textTransform: "none",
              borderRadius: "8px",
              whiteSpace: "nowrap",
              px: 2,
            }}
          >
            Mua lại
          </Button>
        </Paper>

        {/* CARD 2: Ngày giao */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            bgcolor: "#FDF8F5",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
            minWidth: 0, // [FIX]
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              p: 1,
              bgcolor: "white",
              borderRadius: "50%",
              mb: 2,
              border: "1px solid #eee",
            }}
          >
            <CheckCircleOutlineIcon sx={{ color: "#546E7A" }} />
          </Box>
          <Typography variant="body2" sx={{ color: "#567C8D", mb: 0.5 }}>
            Đã giao hàng:
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "#2C3E50", ...forceWrapStyle }}
          >
            {order.arrivedAt
              ? new Date(order.arrivedAt).toLocaleDateString("vi-VN")
              : "Chưa cập nhật"}
          </Typography>
        </Paper>

        {/* CARD 3: Thời gian */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            bgcolor: "#FDF8F5",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
            minWidth: 0, // [FIX]
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              p: 1,
              bgcolor: "white",
              borderRadius: "50%",
              mb: 2,
              border: "1px solid #eee",
            }}
          >
            <AccessTimeIcon sx={{ color: "#546E7A" }} />
          </Box>
          <Typography variant="body2" sx={{ color: "#567C8D", mb: 0.5 }}>
            Giao hàng trong:
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "#2C3E50", ...forceWrapStyle }}
          >
            {order.shippingDuration
              ? `${order.shippingDuration} ngày`
              : "Chưa cập nhật"}
          </Typography>
        </Paper>
      </Box>

      {/* === 2. CHI TIẾT & ĐỊA CHỈ === */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
          gap: 2,
          width: "100%",
          textAlign: "left",
        }}
      >
        {/* CỘT TRÁI: CHI TIẾT */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: "12px",
            bgcolor: "white",
            height: "100%",
            minWidth: 0, // [FIX]: Giúp grid item co giãn đúng cách
          }}
        >
          <Typography sx={{ color: "#546E7A", fontWeight: 600, mb: 2 }}>
            Chi tiết
          </Typography>
          <Typography sx={{ color: "#2C3E50", fontSize: "0.95rem", mb: 1 }}>
            Ngày đặt:{" "}
            <strong>
              {new Date(order.createdAt).toLocaleDateString("vi-VN")}
            </strong>
          </Typography>
          <Typography sx={{ color: "#2C3E50", fontSize: "0.95rem" }}>
            Thanh toán: {order.paymentMethod}
          </Typography>
        </Paper>

        {/* CỘT PHẢI: ĐỊA CHỈ (Đã xử lý xuống dòng) */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: "12px",
            bgcolor: "white",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            minWidth: 0, // [FIX]: QUAN TRỌNG NHẤT - Cho phép nội dung bên trong wrap lại thay vì đẩy box ra
          }}
        >
          <Typography sx={{ color: "#546E7A", fontWeight: 600, mb: 2 }}>
            Thông tin nhận hàng
          </Typography>
          <Typography
            sx={{
              color: "#2C3E50",
              fontWeight: 500,
              mb: 0.5,
              ...forceWrapStyle,
            }}
          >
            Họ tên: {order.name}
          </Typography>
          <Typography
            sx={{
              color: "#2C3E50",
              fontWeight: 500,
              mb: 0.5,
              ...forceWrapStyle,
            }}
          >
            Điện thoại: {order.phone}
          </Typography>
          <Typography
            sx={{
              color: "#2C3E50",
              fontSize: "0.95rem",
              ...forceWrapStyle, // Đảm bảo địa chỉ dài sẽ tự xuống hàng
            }}
          >
            Địa chỉ: {order.address}
          </Typography>
        </Paper>
      </Box>

      {/* === 3. DANH SÁCH SẢN PHẨM === */}
      <Box>
        <Typography
          sx={{ color: "#546E7A", mb: 2, fontWeight: 500, textAlign: "left" }}
        >
          Sản phẩm
        </Typography>
        <Stack spacing={2}>
          {order.items.map((item) => (
            <Paper
              key={item.orderItemId}
              elevation={0}
              sx={{
                p: 2,
                borderRadius: "12px",
                bgcolor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                flexWrap: "wrap",
                minWidth: 0,
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ flex: 1, minWidth: 0 }}
              >
                <Box
                  component="img"
                  src={item.avatar}
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "12px",
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />
                <Box sx={{ minWidth: 0, textAlign: "left" }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "#2C3E50",
                      ...forceWrapStyle,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: "#78909C", fontSize: "0.85rem" }}>
                    x{item.quantity}
                  </Typography>
                  <Typography sx={{ color: "#567C8D", fontSize: "0.9rem" }}>
                    {item.color} - Size: {item.size}
                  </Typography>
                </Box>
              </Stack>
              <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                <Typography sx={{ fontWeight: 600, color: "#567C8D", mb: 1 }}>
                  {item.price.toLocaleString()}đ
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={
                    <RateReviewOutlinedIcon
                      sx={{ fontSize: "16px !important" }}
                    />
                  }
                  onClick={() => navigate(`/review/${item.orderItemId}`)}
                  sx={{
                    color: "#567C8D",
                    borderColor: "#567C8D",
                    textTransform: "none",
                    borderRadius: "20px",
                    px: 2,
                    "&:hover": {
                      borderColor: "#37474F",
                      color: "#37474F",
                      bgcolor: "rgba(86, 124, 141, 0.05)",
                    },
                  }}
                >
                  Đánh giá
                </Button>
              </Box>
            </Paper>
          ))}
        </Stack>
      </Box>

      {/* 4. TOTAL */}
      <Box sx={{ textAlign: "right", mt: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#2C3E50" }}>
          Thành tiền:{" "}
          <Box component="span" sx={{ color: "#5D5A88", fontSize: "1.3rem" }}>
            {order.total.toLocaleString()}đ
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default Delivered;
