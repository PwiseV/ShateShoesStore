import React from "react";
import { Paper, Box, Chip, Pagination, CircularProgress, Typography } from "@mui/material";
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
      <Box>
        <Box sx={{ display: "grid", gridTemplateColumns: "140px 1fr 140px 140px 120px 160px 120px", gap: 1, mb: 1, px: 1 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#666" }}>Mã đơn hàng</Typography>
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#666" }}>Tên khách hàng</Typography>
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#666" }}>Số điện thoại</Typography>
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#666" }}>Ngày đặt</Typography>
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#666", textAlign: "right" }}>Tổng tiền</Typography>
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#666" }}>Phương thức thanh toán</Typography>
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#666", textAlign: "center" }}>Trạng thái</Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress />
          </Box>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <Paper key={order.id} onClick={() => onRowClick(order)} sx={{ p: 1.5, mb: 1.25, cursor: "pointer", borderRadius: "12px", display: "grid", gridTemplateColumns: "140px 1fr 140px 140px 120px 160px 120px", alignItems: "center", boxShadow: "0 1px 6px rgba(16,24,40,0.04)", '&:hover': { boxShadow: '0 6px 18px rgba(92,106,196,0.08)' } }}>
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{order.orderNumber}</Typography>
              <Typography sx={{ fontSize: 14 }}>{order.name}</Typography>
              <Typography sx={{ fontSize: 14 }}>{order.phone}</Typography>
              <Typography sx={{ fontSize: 14 }}>{order.createdAt}</Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 600, textAlign: "right" }}>{formatCurrency(order.total)}</Typography>
              <Box>
                <Typography sx={{ fontSize: 14, color: "#111", fontWeight: 500 }}>{paymentStatusConfig[order.paymentMethod]?.label || order.paymentMethod}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Chip label={statusConfig[order.status]?.label || order.status} size="small" color={statusConfig[order.status]?.color || "default"} variant="filled" sx={{ fontWeight: 500 }} />
              </Box>
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
