import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, TextField, Select, MenuItem, Divider, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import type { OrderData } from "../types";
import { statusConfig } from "../constants";
import { formatCurrency } from "../utils";
import { useOrderDetailLogic, mockProducts } from "../hooks/useOrderDetailLogic";

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
  const { selectedProductId, setSelectedProductId, newProductQty, setNewProductQty, handleAddProduct, handleUpdateQuantity, handleDeleteItem, calculateTotal } = useOrderDetailLogic({
    editedOrder,
    onFieldChange,
  });

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
          {/* Top section: Customer info and Order info side-by-side */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {/* Customer Info */}
            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: "14px", color: "#333", mb: "12px" }}>Thông tin khách hàng</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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

            {/* Order Info */}
            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: "14px", color: "#333", mb: "12px" }}>Thông tin đơn hàng</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
                  <Typography sx={{ fontSize: "14px", color: "#333", fontWeight: 500 }}>{formatCurrency(calculateTotal())}</Typography>
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

                <Box>
                  <Typography sx={{ fontSize: "12px", color: "#999", mb: "4px" }}>Trạng thái</Typography>
                  {isEditing ? (
                    <Select fullWidth size="small" value={editedOrder.status} onChange={(e) => onFieldChange("status", e.target.value as OrderData["status"])}>
                      <MenuItem value="waittingApproval">Chờ duyệt</MenuItem>
                      <MenuItem value="processing">Đang xử lý</MenuItem>
                      <MenuItem value="shipped">Đã gửi hàng</MenuItem>
                      <MenuItem value="delivered">Đã giao</MenuItem>
                      <MenuItem value="cancelled">Đã hủy</MenuItem>
                    </Select>
                  ) : (
                    <Typography sx={{ fontSize: 14, fontWeight: 600, whiteSpace: "normal", overflowWrap: "break-word", color: (() => {
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
                  )}
                </Box>
              </Box>
            </Box>
          </Box>

          <Divider />

          {order.items && order.items.length > 0 && (
            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: "14px", color: "#333", mb: "12px" }}>Thông tin sản phẩm</Typography>
              <TableContainer sx={{ borderRadius: "8px", backgroundColor: "#f9f9f9", mb: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                      <TableCell sx={{ fontSize: "12px", fontWeight: 600 }}>Tên sản phẩm</TableCell>
                      <TableCell sx={{ fontSize: "12px", fontWeight: 600 }}>Mã sản phẩm</TableCell>
                      <TableCell align="center" sx={{ fontSize: "12px", fontWeight: 600 }}>Số lượng</TableCell>
                      <TableCell align="right" sx={{ fontSize: "12px", fontWeight: 600 }}>Giá</TableCell>
                      <TableCell align="right" sx={{ fontSize: "12px", fontWeight: 600 }}>Tổng tiền</TableCell>
                      <TableCell align="center" sx={{ fontSize: "12px", fontWeight: 600, width: "40px" }}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {editedOrder.items?.map((item) => (
                      <TableRow key={item.id} sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}>
                        <TableCell sx={{ fontSize: "12px", color: "#333" }}>{item.productName}</TableCell>
                        <TableCell sx={{ fontSize: "12px", color: "#333" }}>{item.sku}</TableCell>
                        <TableCell align="center">
                          {isEditing ? (
                            <TextField
                              type="number"
                              size="small"
                              value={item.quantity}
                              onChange={(e) => handleUpdateQuantity(item.id, Math.max(1, Number(e.target.value)))}
                              sx={{ width: "60px" }}
                              inputProps={{ min: 1 }}
                            />
                          ) : (
                            <Typography sx={{ fontSize: "12px", color: "#333" }}>{item.quantity}</Typography>
                          )}
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: "12px", color: "#333" }}>{formatCurrency(item.price)}</TableCell>
                        <TableCell align="right" sx={{ fontSize: "12px", color: "#333", fontWeight: 500 }}>{formatCurrency(item.total)}</TableCell>
                        <TableCell align="center" sx={{ fontSize: "12px", cursor: "pointer", color: "#999" }}>
                          {isEditing && (
                            <IconButton size="small" onClick={() => handleDeleteItem(item.id)} sx={{ p: 0, "&:hover": { color: "#e74c3c" } }}>
                              <DeleteIcon sx={{ fontSize: "18px" }} />
                            </IconButton>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {isEditing && (
                <Box sx={{ display: "flex", gap: 1, alignItems: "flex-end" }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: "12px", color: "#999", mb: "4px" }}>Chọn sản phẩm</Typography>
                    <Select fullWidth size="small" value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)}>
                      <MenuItem value="">-- Chọn sản phẩm --</MenuItem>
                      {mockProducts.map((p) => (
                        <MenuItem key={p.id} value={p.id}>
                          {p.name} - {formatCurrency(p.price)}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <Box sx={{ width: "80px" }}>
                    <Typography sx={{ fontSize: "12px", color: "#999", mb: "4px" }}>Số lượng</Typography>
                    <TextField fullWidth size="small" type="number" value={newProductQty} onChange={(e) => setNewProductQty(Math.max(1, Number(e.target.value)))} inputProps={{ min: 1 }} />
                  </Box>
                  <Button onClick={handleAddProduct} variant="contained" startIcon={<AddIcon />} sx={{ backgroundColor: "#5c6ac4", "&:hover": { backgroundColor: "#4a5aa8" }, textTransform: "none" }}>
                    Thêm
                  </Button>
                </Box>
              )}
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
