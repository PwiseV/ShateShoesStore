import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  Collapse,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductItem from "./ProductItem";
import { type Order } from "../../../../services/userHistoryServices";

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ReplayIcon from "@mui/icons-material/Replay";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

type Props = {
  order: Order;
};

const OrderCard: React.FC<Props> = ({ order }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const INITIAL_LIMIT = 3;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return {
          color: "#4ADE80",
          label: "Giao hàng thành công",
          bg: "#DCFCE7",
        };
      case "cancelled":
        return { color: "#d83830", label: "Đã hủy", bg: "#FEE2E2" };
      case "shipped":
        return { color: "#60A5FA", label: "Đang vận chuyển", bg: "#DBEAFE" };
      case "pending":
        return { color: "#FACC15", label: "Chờ xác nhận", bg: "#FEF9C3" };
      case "paid":
        return { color: "#FACC15", label: "Đã thanh toán", bg: "#FEF9C3" };
      case "processing":
        return { color: "#FACC15", label: "Đang xử lý", bg: "#FEF9C3" };
      default:
        return { color: "#e81d12", label: "Không rõ", bg: "#EEE" };
    }
  };
  const statusStyle = getStatusColor(order.status);
  const pillStyle = {
    display: "flex",
    alignItems: "center",
    gap: 1,
    border: "0.5px solid #F0E5DE",
    borderRadius: "18px",
    px: 2,
    py: 0.5,
    bgcolor: "white",
    whiteSpace: "nowrap",
  };

  const renderActionButtons = () => {
    // Logic nút bấm dựa trên status
    if (["pending", "paid", "processing"].includes(order.status)) {
      // Có thể thêm nút Hủy nếu cần
      return null;
    }
    if (order.status === "delivered" || order.status === "cancelled") {
      return (
        <Button
          variant="contained"
          startIcon={<ReplayIcon fontSize="small" />}
          sx={{ bgcolor: "#567C8D", color: "#fff", textTransform: "none" }}
        >
          Mua lại
        </Button>
      );
    }
    return null;
  };

  const initialItems = order.items.slice(0, INITIAL_LIMIT);
  const remainingItems = order.items.slice(INITIAL_LIMIT);

  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: "20px",
        p: 3,
        mb: 2.5,
        boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        border: "1px solid #EAEAEA",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <StorefrontOutlinedIcon sx={{ color: "#555", fontSize: 20 }} />
          {/* [SỬA] Hiển thị orderNumber */}
          <Typography
            fontWeight="400"
            sx={{
              color: "#2F4156",
              fontFamily: '"Lexend", sans-serif',
              fontSize: "1.25rem",
            }}
          >
            Mã đơn hàng: {order.orderNumber}
          </Typography>
        </Stack>
        <Box
          sx={{
            bgcolor: statusStyle.bg,
            px: 1.5,
            py: 0.5,
            borderRadius: "15px",
          }}
        >
          <Typography
            sx={{
              color: statusStyle.color,
              fontWeight: 700,
              fontSize: "0.7rem",
              textTransform: "uppercase",
            }}
          >
            {statusStyle.label}
          </Typography>
        </Box>
      </Stack>

      {/* Thông tin vận chuyển (Hardcode hoặc lấy từ order nếu có logic cụ thể) */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
        sx={{ mb: 1, display: { xs: "none", md: "flex" }, width: "100%" }}
      >
        <Box sx={pillStyle}>
          <LocalShippingOutlinedIcon
            fontSize="small"
            sx={{ color: "#546E7A" }}
          />
          <Typography
            variant="body2"
            sx={{ color: "#2C3E50", fontWeight: 500, fontSize: "0.7rem" }}
          >
            {order.fromAddress.split(",").slice(-2).join(", ")}
          </Typography>
        </Box>
        {/* 1. Đường nối bên trái (Chấm tròn + gạch) */}
        {/* --- [SỬA] LOGIC HIỂN THỊ TRẠNG THÁI VẬN CHUYỂN --- */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            px: 1,
            color: "#90A4AE", // Màu xám cho nét đứt
          }}
        >
          {order.status === "shipping" ? (
            // === TRƯỜNG HỢP 1: ĐANG VẬN CHUYỂN (Hiện 3 phần: Nét đứt - Ngày - Nét đứt) ===
            <>
              {/* 1. Nét đứt bên trái */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mr: 1,
                  opacity: 0.6,
                }}
              >
                <FiberManualRecordIcon
                  sx={{ fontSize: "8px", mr: 0.5, color: "#546E7A" }}
                />
                <Typography sx={{ letterSpacing: 2, fontSize: "0.7rem" }}>
                  - - - -
                </Typography>
              </Box>

              {/* 2. Ngày Dự Kiến (Hiển thị nổi bật) */}
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#546E7A",
                  whiteSpace: "nowrap",
                  pb: 0.2, // Căn chỉnh nhẹ
                }}
              >
                {/* Logic lấy ngày: Ưu tiên dates.expected cho đơn đang vận chuyển */}
                Dự kiến: {order.dates?.expected || "Đang cập nhật"}
              </Typography>

              {/* 3. Nét đứt bên phải + Mũi tên */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  ml: 1,
                  opacity: 0.6,
                }}
              >
                <Typography sx={{ letterSpacing: 2, fontSize: "0.7rem" }}>
                  - - - -
                </Typography>
                <ArrowRightAltIcon sx={{ fontSize: "1.1rem", ml: -0.5 }} />
              </Box>
            </>
          ) : (
            // === TRƯỜNG HỢP 2: CÁC TRẠNG THÁI KHÁC (Chỉ hiện đường nối dài) ===
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                opacity: 0.5,
                width: "100%",
                justifyContent: "center",
              }}
            >
              <FiberManualRecordIcon
                sx={{ fontSize: "8px", mr: 1, color: "#546E7A" }}
              />
              <Typography
                sx={{ letterSpacing: 4, fontSize: "0.7rem", color: "#546E7A" }}
              >
                - - - - - - - - - -
              </Typography>
              <ArrowRightAltIcon
                sx={{ fontSize: "1.1rem", ml: 0.5, color: "#546E7A" }}
              />
            </Box>
          )}
        </Box>
        <Box sx={pillStyle}>
          <LocationOnOutlinedIcon fontSize="small" sx={{ color: "#546E7A" }} />
          <Typography
            variant="body2"
            sx={{ color: "#2C3E50", fontWeight: 500, fontSize: "0.7rem" }}
          >
            {order.address.split(",").slice(-2).join(", ")}
          </Typography>
        </Box>
      </Stack>

      <Box sx={{ textAlign: "right", mb: 2 }}>
        {/* [SỬA] Navigate dùng orderId */}
        <Typography
          onClick={() => navigate(`/history/${order.orderId}`)}
          sx={{
            display: "inline-block",
            color: "#2C3E50",
            fontSize: "0.9rem",
            fontWeight: 700,
            cursor: "pointer",
            textDecoration: "underline",
            fontFamily: '"Lexend", sans-serif',
            "&:hover": { color: "#1a252f" },
          }}
        >
          Xem chi tiết
        </Typography>
      </Box>

      {/* [SỬA] Duyệt qua items */}
      <Stack spacing={2} mb={0}>
        {initialItems.map((item) => (
          <ProductItem key={item.orderItemId} product={item} />
        ))}
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <Stack spacing={2} mt={2}>
            {remainingItems.map((item) => (
              <ProductItem key={item.orderItemId} product={item} />
            ))}
          </Stack>
        </Collapse>
      </Stack>

      {order.items.length > INITIAL_LIMIT && (
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            endIcon={
              isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
            }
            disableRipple
            sx={{
              textTransform: "none",
              color: "#546E7A",
              fontSize: "0.85rem",
              fontWeight: 500,
              outline: "none",
            }}
          >
            {isExpanded
              ? "Thu gọn"
              : `Xem thêm ${order.items.length - INITIAL_LIMIT} sản phẩm`}
          </Button>
        </Box>
      )}

      <Divider sx={{ borderColor: "#eee", my: 2 }} />
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={1}
        mb={2}
      >
        <Typography sx={{ color: "#2F4156", fontSize: "1rem" }}>
          Thành tiền:
        </Typography>
        {/* [SỬA] total */}
        <Typography
          variant="h6"
          sx={{
            fontSize: "1rem",
            color: "#5D5A88",
            fontWeight: 600,
            fontFamily: '"Lexend", sans-serif',
          }}
        >
          {order.total.toLocaleString()}đ
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        {renderActionButtons()}
      </Stack>
    </Box>
  );
};
export default OrderCard;
