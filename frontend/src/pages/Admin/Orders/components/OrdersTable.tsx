import React from "react";
import { Paper, Box, Pagination, CircularProgress, Typography } from "@mui/material";
import type { OrderData } from "../types";
import { paymentStatusConfig, statusConfig } from "../constants";
import { formatCurrency } from "../utils";

interface Props {
  orders: OrderData[];
  loading: boolean;
  onRowClick: (order: OrderData) => void;
  page: number;
  totalPages: number;
  onPageChange: (e: any, v: number) => void;
}

const OrdersTable: React.FC<Props> = ({ orders, loading, onRowClick, page, totalPages, onPageChange }) => {
  return (
    <>
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ display: "grid", gridTemplateColumns: "100px 1fr 110px 110px 110px 130px 90px", gap: 1, mb: 1, px: 1, alignItems: 'center' }}>
          <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#000", whiteSpace: "normal", overflowWrap: "break-word" }}>Mã đơn hàng</Typography>
          <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#000", whiteSpace: "normal", overflowWrap: "break-word" }}>Tên khách hàng</Typography>
          <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#000", whiteSpace: "normal", overflowWrap: "break-word" }}>Số điện thoại</Typography>
          <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#000", whiteSpace: "normal", overflowWrap: "break-word" }}>Ngày đặt</Typography>
          <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#000", textAlign: "right", whiteSpace: "normal", overflowWrap: "break-word" }}>Tổng tiền</Typography>
          <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#000", whiteSpace: "normal", overflowWrap: "break-word" }}>Phương thức thanh toán</Typography>
          <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#000", textAlign: "center", whiteSpace: "normal", overflowWrap: "break-word" }}>Trạng thái</Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress />
          </Box>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <Paper
              key={order.id}
              onClick={() => onRowClick(order)}
              sx={{
                p: 1.5,
                mb: 1.25,
                height: 60,
                cursor: "pointer",
                borderRadius: "12px",
                display: "grid",
                gridTemplateColumns: "100px 1fr 110px 110px 110px 130px 90px",
                alignItems: "center",
                gap: 1,
                boxShadow: "0 1px 6px rgba(16,24,40,0.04)",
                '&:hover': { boxShadow: '0 6px 18px rgba(92,106,196,0.08)' },
              }}
            >
              <Typography sx={{ fontSize: 14, fontWeight: 600, whiteSpace: "normal", overflowWrap: "break-word" }}>{order.orderNumber}</Typography>
              <Typography sx={{ fontSize: 14, whiteSpace: "normal", overflowWrap: "break-word" }}>{order.name}</Typography>
              <Typography sx={{ fontSize: 14, whiteSpace: "normal", overflowWrap: "break-word" }}>{order.phone}</Typography>
              <Typography sx={{ fontSize: 14, whiteSpace: "normal", overflowWrap: "break-word" }}>{order.createdAt 
    ? new Date(order.createdAt).toLocaleDateString('vi-VN').replace(/\//g, '-') 
    : "N/A"}</Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 600, textAlign: "right", whiteSpace: "normal", overflowWrap: "break-word" }}>{formatCurrency(order.total)}</Typography>
              <Typography sx={{ fontSize: 14, color: "#111", fontWeight: 500, whiteSpace: "normal", overflowWrap: "break-word" }}>{paymentStatusConfig[order.paymentMethod]?.label || order.paymentMethod}</Typography>
              <Typography sx={{ fontSize: 14, textAlign: "center", whiteSpace: "normal", overflowWrap: "break-word", fontWeight: 600, color: (() => {
                const c = statusConfig[order.status]?.color;
                switch (c) {
                  case "warning":
                    return "#C7BE41";
                  case "info":
                    return "#5691F6";
                  case "success":
                    return "#3CE039";
                  case "done":
                    return "#D977F4";
                  case "error":
                    return "#F12A14";
                  default:
                    return "#333";
                }
              })() }}>{statusConfig[order.status]?.label || order.status}</Typography>
            </Paper>
          ))
        ) : (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography color="textSecondary">Không tìm thấy đơn hàng</Typography>
          </Box>
        )}
      </Box>

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: "26px", mb: "10px" }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={onPageChange}
            color="standard"
            sx={{
              '& .MuiPaginationItem-root': { minWidth: 36, height: 36, borderRadius: '50%', fontWeight: 600, color: '#8a8a8a' },
              '& .MuiPaginationItem-root.Mui-selected': { backgroundColor: '#efe9ff', color: '#5c6ac4' }
            }}
          />
        </Box>
      )}
    </>
  );
};

export default OrdersTable;
