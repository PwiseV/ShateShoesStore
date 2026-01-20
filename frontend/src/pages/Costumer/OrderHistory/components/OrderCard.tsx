import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  Collapse, // Đảm bảo đã import Collapse
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductItem from "./ProductItem";
import type { Order } from "../OrderHistory";

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ReplayIcon from "@mui/icons-material/Replay";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"; // Icon mũi tên xuống
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"; // Icon mũi tên lên

type Props = {
  order: Order;
};

const OrderCard: React.FC<Props> = ({ order }) => {
  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(false);
  const INITIAL_LIMIT = 3;

  // 1. Màu sắc theo trạng thái
  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return { color: "#27AE60", label: "Thành công", bg: "#EAFAF1" };
      case "cancelled":
        return { color: "#d83830", label: "Đã hủy", bg: "#FEE2E2" };
      case "shipping":
        return { color: "#2980B9", label: "Đang vận chuyển", bg: "#EBF5FB" };
      case "pending":
        return { color: "#FACC15", label: "Chờ xác nhận", bg: "#FEF9C3" };
      default:
        return { color: "#e81d12", label: "Không rõ", bg: "#EEE" };
    }
  };

  const statusStyle = getStatusColor(order.status);

  // Style viên thuốc
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

  // 2. Logic hiển thị nút bấm
  const renderActionButtons = () => {
    switch (order.status) {
      case "pending":
        return (
          <Button
            variant="outlined"
            color="error"
            sx={{
              borderColor: "#E74C3C",
              color: "#DC2626",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "8px",
              px: 4,
              "&:hover": { bgcolor: "#F5EFEB", borderColor: "#C0392B" },
            }}
          >
            Hủy đơn
          </Button>
        );

      case "delivered":
        return (
          <>
            <Button
              variant="contained"
              startIcon={<ReplayIcon fontSize="small" />}
              sx={{
                bgcolor: "#567C8D",
                color: "#fff",
                textTransform: "none",
                fontWeight: 400,
                px: 3,
                borderRadius: "8px",
                boxShadow: "none",
                "&:hover": { bgcolor: "#455A64", boxShadow: "none" },
              }}
            >
              Mua lại
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#567C8D",
                color: "#567C8D",
                textTransform: "none",
                fontWeight: 400,
                px: 3,
                borderRadius: "8px",
                "&:hover": { bgcolor: "#f5f5f5", borderColor: "#bbb" },
              }}
            >
              Đánh giá
            </Button>
          </>
        );

      case "cancelled":
        return (
          <Button
            variant="contained"
            startIcon={<ReplayIcon fontSize="small" />}
            sx={{
              bgcolor: "#546E7A",
              color: "#fff",
              textTransform: "none",
              fontWeight: 400,
              px: 3,
              borderRadius: "8px",
              boxShadow: "none",
              "&:hover": { bgcolor: "#455A64", boxShadow: "none" },
            }}
          >
            Mua lại
          </Button>
        );

      default:
        return null;
    }
  };

  // Cắt danh sách sản phẩm
  const initialProducts = order.products.slice(0, INITIAL_LIMIT);
  const remainingProducts = order.products.slice(INITIAL_LIMIT);

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
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <StorefrontOutlinedIcon sx={{ color: "#555", fontSize: 20 }} />
          <Typography
            fontWeight="400"
            sx={{
              color: "#2F4156",
              fontFamily: '"Lexend", sans-serif',
              fontSize: "1.25rem",
            }}
          >
            Mã đơn hàng: {order.id}
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

      {/* Progress Bar */}
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
            Thủ Đức, Tp Hồ Chí Minh
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#546E7A",
            opacity: 0.6,
            flex: 0.5,
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <FiberManualRecordIcon sx={{ fontSize: "small", mr: 0.2 }} />
          <Typography
            sx={{
              letterSpacing: 1,
              fontSize: "0.8rem",
              whiteSpace: "nowrap",
            }}
          >
            - - - -
          </Typography>
        </Box>
        <Box sx={{ ...pillStyle, bgcolor: "#F8F9FA", border: "none" }}>
          <Typography
            variant="body2"
            sx={{ color: "#546E7A", fontWeight: 500, fontSize: "0.7rem" }}
          >
            Giao hàng dự kiến: 28/09/25
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#546E7A",
            opacity: 0.6,
            flex: 1,
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Typography
            sx={{
              letterSpacing: 1,
              fontSize: "0.7rem",
              whiteSpace: "nowrap",
            }}
          >
            - - - -
          </Typography>
          <ArrowRightAltIcon sx={{ fontSize: "small", ml: 0.2 }} />
        </Box>
        <Box sx={pillStyle}>
          <LocationOnOutlinedIcon fontSize="small" sx={{ color: "#546E7A" }} />
          <Typography
            variant="body2"
            sx={{ color: "#2C3E50", fontWeight: 500, fontSize: "0.7rem" }}
          >
            Bình Sơn, Quãng Ngãi
          </Typography>
        </Box>
      </Stack>

      {/* View Detail Link */}
      <Box sx={{ textAlign: "right", mb: 2 }}>
        <Typography
          onClick={() => navigate(`/history/${order.id}`)}
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

      {/* --- SỬA PHẦN NÀY: Products --- */}
      <Stack spacing={2} mb={0}>
        {/* 1. Hiển thị 4 sản phẩm đầu tiên */}
        {initialProducts.map((prod) => (
          <ProductItem key={prod.id} product={prod} />
        ))}

        {/* 2. Phần mở rộng (ẩn đi nếu chưa bấm Xem thêm) */}
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <Stack spacing={2} mt={2}>
            {remainingProducts.map((prod) => (
              <ProductItem key={prod.id} product={prod} />
            ))}
          </Stack>
        </Collapse>
      </Stack>

      {/* --- THÊM PHẦN NÀY: Nút Xem thêm / Thu gọn --- */}
      {order.products.length > INITIAL_LIMIT && (
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            endIcon={
              isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
            }
            disableRipple
            disableFocusRipple
            disableTouchRipple
            sx={{
              textTransform: "none",
              color: "#546E7A",
              fontSize: "0.85rem",
              fontWeight: 500,
              fontFamily: '"Lexend", sans-serif',
              outline: "none",
              "&:focus": {
                outline: "none !important",
                border: "1px solid #90A4AE", // Giữ nguyên màu viền xám, không đổi màu xanh
                bgcolor: "transparent",
              },
              "&:active": {
                outline: "none !important",
                boxShadow: "none",
                border: "1px solid #90A4AE",
              },
              "&.Mui-focusVisible": {
                outline: "none !important",
                border: "1px solid #90A4AE",
              },
              "&:hover": {
                bgcolor: "transparent",
                textDecoration: "underline",
                outline: "none",
              },
            }}
          >
            {isExpanded
              ? "Thu gọn"
              : `Xem thêm ${order.products.length - INITIAL_LIMIT} sản phẩm`}
          </Button>
        </Box>
      )}

      <Divider sx={{ borderColor: "#eee", my: 2 }} />

      {/* Footer */}
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
        <Typography
          variant="h6"
          sx={{
            fontSize: "1rem",
            color: "#5D5A88",
            fontWeight: 600,
            fontFamily: '"Lexend", sans-serif',
          }}
        >
          {order.totalAmount.toLocaleString()}đ
        </Typography>
      </Stack>

      {/* Action Buttons */}
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        {renderActionButtons()}
      </Stack>
    </Box>
  );
};

export default OrderCard;
