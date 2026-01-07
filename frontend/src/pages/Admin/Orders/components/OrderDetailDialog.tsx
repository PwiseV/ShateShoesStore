import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, TextField, Select, MenuItem, Chip, Divider, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { OrderData } from "../types";
import { statusConfig } from "../constants";
import { formatCurrency } from "../utils";

interface Props {
  open: boolean;
  order: OrderData | null;
  editedOrder: OrderData | null;
  isEditing: boolean;
  onClose: () => void;
  onEditToggle: (v: boolean) => void;
  onSave: () => void;
  onFieldChange: (field: keyof OrderData, value: any) => void;
}

const OrderDetailDialog: React.FC<Props> = ({ open, order, editedOrder, isEditing, onClose, onEditToggle, onSave, onFieldChange }) => {
  if (!order || !editedOrder) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: "12px", maxHeight: "90vh", overflow: "auto" } }}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 600, fontSize: "18px" }}>
        Thông tin chi tiết
        <Button onClick={onClose} sx={{ minWidth: "auto", p: 0, color: "#999" }}>
          <CloseIcon />
        </Button>
      </DialogTitle>

      <DialogContent dividers sx={{ p: "24px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: "14px", color: "#333", mb: "12px" }}>Thông tin khách hàng</Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <Box>
                <Typography sx={{ fontSize: "12px", color: "#999", mb: "4px" }}>Họ tên</Typography>
                {isEditing ? <TextField fullWidth size="small" value={editedOrder.name} onChange={(e) => onFieldChange("name", e.target.value)} /> : <Typography sx={{ fontSize: "14px", color: "#333" }}>{order.name}</Typography>}
              </Box>
              <Box>
                <Typography sx={{ fontSize: "12px", color: "#999", mb: "4px" }}>Email</Typography>
                {isEditing ? <TextField fullWidth size="small" value={editedOrder.email} onChange={(e) => onFieldChange("email", e.target.value)} /> : <Typography sx={{ fontSize: "14px", color: "#333" }}>{order.email}</Typography>}
              </Box>
              <Box>
                <Typography sx={{ fontSize: "12px", color: "#999", mb: "4px" }}>Số điện thoại</Typography>
                {isEditing ? <TextField fullWidth size="small" value={editedOrder.phone} onChange={(e) => onFieldChange("phone", e.target.value)} /> : <Typography sx={{ fontSize: "14px", color: "#333" }}>{order.phone}</Typography>}
              </Box>
              <Box>
                <Typography sx={{ fontSize: "12px", color: "#999", mb: "4px" }}>Địa chỉ</Typography>
                {isEditing ? <TextField fullWidth size="small" value={editedOrder.address} onChange={(e) => onFieldChange("address", e.target.value)} /> : <Typography sx={{ fontSize: "14px", color: "#333" }}>{order.address}</Typography>}
              </Box>
            </Box>
          </Box>

          <Divider />

          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: "14px", color: "#333", mb: "12px" }}>Thông tin đơn hàng</Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <Box>
                <Typography sx={{ fontSize: "12px", color: "#999", mb: "4px" }}>Mã đơn hàng</Typography>
                <Typography sx={{ fontSize: "14px", color: "#333" }}>{order.orderNumber}</Typography>
              </Box>

              <Box>
                <Typography sx={{ fontSize: "12px", color: "#999", mb: "4px" }}>Ngày đặt</Typography>
                <Typography sx={{ fontSize: "14px", color: "#333" }}>{order.createdAt}</Typography>
              </Box>

              <Box>
                <Typography sx={{ fontSize: "12px", color: "#999", mb: "4px" }}>Tổng tiền</Typography>
                {isEditing ? <TextField fullWidth size="small" type="number" value={editedOrder.total} onChange={(e) => onFieldChange("total", Number(e.target.value))} /> : <Typography sx={{ fontSize: "14px", color: "#333", fontWeight: 500 }}>{formatCurrency(order.total)}</Typography>}
              </Box>

              <Box>
                <Typography sx={{ fontSize: "12px", color: "#999", mb: "4px" }}>Phương thức thanh toán</Typography>
                {isEditing ? (
                  <Select fullWidth size="small" value={editedOrder.paymentMethod} onChange={(e) => onFieldChange("paymentMethod", e.target.value)}>
                    <MenuItem value="COD">COD</MenuItem>
                    <MenuItem value="Banking">Banking</MenuItem>
                    <MenuItem value="Credit card">Credit card</MenuItem>
                    <MenuItem value="Paypal">Paypal</MenuItem>
                  </Select>
                ) : (
                  <Typography sx={{ fontSize: "14px", color: "#333" }}>{order.paymentMethod}</Typography>
                )}
              </Box>

              <Box sx={{ gridColumn: "1 / -1" }}>
                <Typography sx={{ fontSize: "12px", color: "#999", mb: "4px" }}>Trạng thái</Typography>
                {isEditing ? (
                  <Select fullWidth size="small" value={editedOrder.status} onChange={(e) => onFieldChange("status", e.target.value as OrderData["status"])}>
                    <MenuItem value="pending">Chờ xử lý</MenuItem>
                    <MenuItem value="paid">Đã thanh toán</MenuItem>
                    <MenuItem value="processing">Đang xử lý</MenuItem>
                    <MenuItem value="shipped">Đã gửi hàng</MenuItem>
                    <MenuItem value="delivered">Đã giao</MenuItem>
                    <MenuItem value="cancelled">Đã hủy</MenuItem>
                  </Select>
                ) : (
                  <Chip label={statusConfig[order.status]?.label} size="small" color={statusConfig[order.status]?.color} sx={{ fontWeight: 500 }} />
                )}
              </Box>
            </Box>
          </Box>

          <Divider />

          {order.items && order.items.length > 0 && (
            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: "14px", color: "#333", mb: "12px" }}>Thông tin sản phẩm</Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                      <TableCell sx={{ fontSize: "12px", fontWeight: 600 }}>Tên sản phẩm</TableCell>
                      <TableCell sx={{ fontSize: "12px", fontWeight: 600 }}>Mã sản phẩm</TableCell>
                      <TableCell align="center" sx={{ fontSize: "12px", fontWeight: 600 }}>Số lượng</TableCell>
                      <TableCell align="right" sx={{ fontSize: "12px", fontWeight: 600 }}>Giá</TableCell>
                      <TableCell align="right" sx={{ fontSize: "12px", fontWeight: 600 }}>Tổng tiền</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell sx={{ fontSize: "12px" }}>{item.productName}</TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>{item.sku}</TableCell>
                        <TableCell align="center" sx={{ fontSize: "12px" }}>{item.quantity}</TableCell>
                        <TableCell align="right" sx={{ fontSize: "12px" }}>{formatCurrency(item.price)}</TableCell>
                        <TableCell align="right" sx={{ fontSize: "12px" }}>{formatCurrency(item.total)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: "16px", gap: "12px" }}>
        {!isEditing ? (
          <>
            <Button onClick={onClose} variant="outlined" sx={{ textTransform: "none", color: "#666", borderColor: "#ddd" }}>Đóng</Button>
            <Button onClick={() => onEditToggle(true)} variant="contained" sx={{ textTransform: "none", backgroundColor: "#5c6ac4", "&:hover": { backgroundColor: "#4a5aa8" } }}>Chỉnh sửa</Button>
          </>
        ) : (
          <>
            <Button onClick={() => onEditToggle(false)} variant="outlined" sx={{ textTransform: "none", color: "#666", borderColor: "#ddd" }}>Hủy</Button>
            <Button onClick={onSave} variant="contained" sx={{ textTransform: "none", backgroundColor: "#5c6ac4", "&:hover": { backgroundColor: "#4a5aa8" } }}>Lưu thay đổi</Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailDialog;
