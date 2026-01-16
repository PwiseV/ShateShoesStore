import React from "react";
import { Paper, Box, CircularProgress, Typography } from "@mui/material";
import type { OrderData } from "../types";
import { statusConfig } from "../constants";
import { formatCurrency } from "../utils";

interface Props {
  orders: OrderData[];
  loading: boolean;
  onRowClick: (order: OrderData) => void;
  // Đã xóa props page, totalPages, onPageChange vì Pagination được xử lý ở parent
}

const OrdersTable: React.FC<Props> = ({ orders, loading, onRowClick }) => {
  return (
    <>
      <Box sx={{ overflow: "auto" }}>
        {/* Header Row */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "100px 1fr 110px 110px 110px 130px 90px",
            gap: 1,
            mb: 1,
            px: 1,
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 700,
              color: "#000",
              whiteSpace: "normal",
              overflowWrap: "break-word",
            }}
          >
            Mã đơn hàng
          </Typography>
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 700,
              color: "#000",
              whiteSpace: "normal",
              overflowWrap: "break-word",
            }}
          >
            Tên khách hàng
          </Typography>
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 700,
              color: "#000",
              whiteSpace: "normal",
              overflowWrap: "break-word",
            }}
          >
            Số điện thoại
          </Typography>
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 700,
              color: "#000",
              whiteSpace: "normal",
              overflowWrap: "break-word",
            }}
          >
            Ngày đặt
          </Typography>
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 700,
              color: "#000",
              textAlign: "right",
              whiteSpace: "normal",
              overflowWrap: "break-word",
            }}
          >
            Tổng tiền
          </Typography>
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 700,
              color: "#000",
              whiteSpace: "normal",
              overflowWrap: "break-word",
            }}
          >
            Phương thức thanh toán
          </Typography>
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 700,
              color: "#000",
              textAlign: "center",
              whiteSpace: "normal",
              overflowWrap: "break-word",
            }}
          >
            Trạng thái
          </Typography>
        </Box>

        {/* Loading / Data Rows */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <Paper
              key={order.id || order.orderNumber}
              onClick={() => onRowClick(order)}
              sx={{
                display: "grid",
                gridTemplateColumns: "100px 1fr 110px 110px 110px 130px 90px",
                gap: 1,
                alignItems: "center",
                p: 2,
                mb: 1.5,
                borderRadius: "12px",
                cursor: "pointer",
                transition: "0.2s",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transform: "translateY(-2px)",
                },
              }}
              elevation={0}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#333",
                  whiteSpace: "normal",
                  overflowWrap: "break-word",
                }}
              >
                #{order.orderNumber}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#555",
                  whiteSpace: "normal",
                  overflowWrap: "break-word",
                }}
              >
                {order.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#555",
                  whiteSpace: "normal",
                  overflowWrap: "break-word",
                }}
              >
                {order.phone}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#555",
                  whiteSpace: "normal",
                  overflowWrap: "break-word",
                }}
              >
                {new Date(order.createdAt).toLocaleDateString("vi-VN")}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#5c6ac4",
                  textAlign: "right",
                  whiteSpace: "normal",
                  overflowWrap: "break-word",
                }}
              >
                {formatCurrency(order.total)}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#555",
                  whiteSpace: "normal",
                  overflowWrap: "break-word",
                }}
              >
                {order.paymentMethod}
              </Typography>

              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 600,
                  textAlign: "center",
                  px: 1,
                  py: 0.5,
                  borderRadius: "8px",
                  whiteSpace: "normal",
                  overflowWrap: "break-word",
                  bgcolor: (() => {
                    const c = statusConfig[order.status]?.color;
                    switch (c) {
                      case "warning":
                        return "#FFF8E1"; // Light yellow bg
                      case "info":
                        return "#E3F2FD"; // Light blue bg
                      case "success":
                        return "#E8F5E9"; // Light green bg
                      case "done":
                        return "#F3E5F5"; // Light purple bg
                      case "error":
                        return "#FFEBEE"; // Light red bg
                      default:
                        return "#F5F5F5";
                    }
                  })(),
                  color: (() => {
                    const c = statusConfig[order.status]?.color;
                    switch (c) {
                      case "warning":
                        return "#FBC02D";
                      case "info":
                        return "#2196F3";
                      case "success":
                        return "#4CAF50";
                      case "done":
                        return "#9C27B0";
                      case "error":
                        return "#F44336";
                      default:
                        return "#333";
                    }
                  })(),
                }}
              >
                {statusConfig[order.status]?.label || order.status}
              </Typography>
            </Paper>
          ))
        ) : (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography color="textSecondary">
              Không tìm thấy đơn hàng
            </Typography>
          </Box>
        )}
      </Box>
      {/* Pagination has been moved to parent Orders.tsx */}
    </>
  );
};

export default OrdersTable;
