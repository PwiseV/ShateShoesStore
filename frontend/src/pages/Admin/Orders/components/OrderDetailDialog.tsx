import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import type { OrderData } from "../types";
import { statusConfig, paymentStatusConfig } from "../constants";
import { formatCurrency } from "../utils";
import {
  useOrderDetailLogic,
  mockProducts,
} from "../hooks/useOrderDetailLogic";

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

const OrderDetailDialog: React.FC<Props> = ({
  open,
  order,
  editedOrder,
  isEditing,
  onClose,
  onEditToggle,
  onSave,
  onFieldChange,
}) => {
  const {
    selectedProductId,
    setSelectedProductId,
    newProductQty,
    setNewProductQty,
    handleAddProduct,
    handleUpdateQuantity,
    handleDeleteItem,
    calculateTotal,
  } = useOrderDetailLogic({
    editedOrder,
    onFieldChange,
  });

  if (!order) return null;

  // Dữ liệu hiển thị: Nếu đang edit thì dùng editedOrder, không thì dùng order gốc
  const displayOrder = isEditing && editedOrder ? editedOrder : order;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #eee",
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          {isEditing
            ? `Chỉnh sửa đơn hàng #${displayOrder.orderNumber}`
            : `Chi tiết đơn hàng #${displayOrder.orderNumber}`}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* --- Customer Info Section --- */}
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{ mb: 1, color: "#5c6ac4" }}
            >
              Thông tin khách hàng
            </Typography>
            <Grid container spacing={2}>
              <Grid size={6}>
                <Typography variant="caption" color="textSecondary">
                  Tên khách hàng
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    size="small"
                    value={displayOrder.name}
                    onChange={(e) => onFieldChange("name", e.target.value)}
                  />
                ) : (
                  <Typography fontWeight={500}>{displayOrder.name}</Typography>
                )}
              </Grid>
              <Grid size={6}>
                <Typography variant="caption" color="textSecondary">
                  Số điện thoại
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    size="small"
                    value={displayOrder.phone}
                    onChange={(e) => onFieldChange("phone", e.target.value)}
                  />
                ) : (
                  <Typography fontWeight={500}>{displayOrder.phone}</Typography>
                )}
              </Grid>
              <Grid size={12}>
                <Typography variant="caption" color="textSecondary">
                  Địa chỉ
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    size="small"
                    value={displayOrder.address}
                    onChange={(e) => onFieldChange("address", e.target.value)}
                  />
                ) : (
                  <Typography fontWeight={500}>
                    {displayOrder.address}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* --- Order Info Section --- */}
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{ mb: 1, color: "#5c6ac4" }}
            >
              Thông tin đơn hàng
            </Typography>
            <Grid container spacing={2}>
              <Grid size={6}>
                <Typography variant="caption" color="textSecondary">
                  Trạng thái
                </Typography>
                {isEditing ? (
                  <Select
                    fullWidth
                    size="small"
                    value={displayOrder.status}
                    onChange={(e) => onFieldChange("status", e.target.value)}
                  >
                    {Object.entries(statusConfig).map(([key, config]) => (
                      <MenuItem key={key} value={key}>
                        {config.label}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color:
                        statusConfig[displayOrder.status]?.color === "success"
                          ? "green"
                          : "#f57c00",
                    }}
                  >
                    {statusConfig[displayOrder.status]?.label ||
                      displayOrder.status}
                  </Typography>
                )}
              </Grid>

              {/* --- UPDATE: PAYMENT METHOD SELECT --- */}
              <Grid size={6}>
                <Typography variant="caption" color="textSecondary">
                  Phương thức thanh toán
                </Typography>
                {isEditing ? (
                  <Select
                    fullWidth
                    size="small"
                    value={displayOrder.paymentMethod}
                    onChange={(e) =>
                      onFieldChange("paymentMethod", e.target.value)
                    }
                  >
                    {/* Render từ paymentStatusConfig để chỉ lấy COD và Banking */}
                    {Object.entries(paymentStatusConfig).map(
                      ([key, config]) => (
                        <MenuItem key={key} value={key}>
                          {config.label}
                        </MenuItem>
                      )
                    )}
                  </Select>
                ) : (
                  <Typography fontWeight={500}>
                    {/* Hiển thị label đẹp hơn từ config */}
                    {paymentStatusConfig[displayOrder.paymentMethod]?.label ||
                      displayOrder.paymentMethod}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* --- Product List Section --- */}
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{ mb: 1, color: "#5c6ac4" }}
            >
              Danh sách sản phẩm
            </Typography>
            <TableContainer
              sx={{ border: "1px solid #eee", borderRadius: "8px" }}
            >
              <Table size="small">
                <TableHead sx={{ backgroundColor: "#f9f9f9" }}>
                  <TableRow>
                    <TableCell>Sản phẩm</TableCell>
                    <TableCell align="center">SL</TableCell>
                    <TableCell align="right">Đơn giá</TableCell>
                    <TableCell align="right">Thành tiền</TableCell>
                    {isEditing && (
                      <TableCell align="center">Hành động</TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayOrder.items?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          {item.productName}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {item.sku}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        {isEditing ? (
                          <TextField
                            type="number"
                            size="small"
                            value={item.quantity}
                            onChange={(e) =>
                              handleUpdateQuantity(
                                item.id,
                                Number(e.target.value)
                              )
                            }
                            inputProps={{
                              min: 1,
                              style: { textAlign: "center", width: "40px" },
                            }}
                          />
                        ) : (
                          item.quantity
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(item.price)}
                      </TableCell>
                      <TableCell align="right" fontWeight={600}>
                        {formatCurrency(item.total)}
                      </TableCell>
                      {isEditing && (
                        <TableCell align="center">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                  {(!displayOrder.items || displayOrder.items.length === 0) && (
                    <TableRow>
                      <TableCell colSpan={isEditing ? 5 : 4} align="center">
                        <Typography color="textSecondary" sx={{ py: 2 }}>
                          Chưa có sản phẩm nào
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Total Section */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Typography variant="h6" fontWeight={700} color="#d32f2f">
                Tổng cộng:{" "}
                {formatCurrency(
                  isEditing ? calculateTotal() : displayOrder.total
                )}
              </Typography>
            </Box>

            {/* Add Product Form (Only Editing) */}
            {isEditing && (
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  backgroundColor: "#f0f4f8",
                  borderRadius: 2,
                }}
              >
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Thêm sản phẩm
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Select
                    fullWidth
                    size="small"
                    displayEmpty
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    sx={{ backgroundColor: "#fff", flex: 2 }}
                  >
                    <MenuItem value="" disabled>
                      -- Chọn sản phẩm --
                    </MenuItem>
                    {mockProducts.map((p) => (
                      <MenuItem key={p.id} value={p.id}>
                        {p.name} - {formatCurrency(p.price)}
                      </MenuItem>
                    ))}
                  </Select>
                  <Box sx={{ width: "80px" }}>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      value={newProductQty}
                      onChange={(e) =>
                        setNewProductQty(Math.max(1, Number(e.target.value)))
                      }
                      inputProps={{ min: 1 }}
                      sx={{ backgroundColor: "#fff" }}
                    />
                  </Box>
                  <Button
                    onClick={handleAddProduct}
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                      backgroundColor: "#5c6ac4",
                      "&:hover": { backgroundColor: "#4a5aa8" },
                      textTransform: "none",
                    }}
                  >
                    Thêm
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{ p: "16px", gap: "12px", borderTop: "1px solid #eee" }}
      >
        {!isEditing ? (
          <>
            <Button
              onClick={onClose}
              variant="outlined"
              sx={{ textTransform: "none", color: "#666", borderColor: "#ddd" }}
            >
              Đóng
            </Button>
            <Button
              onClick={() => onEditToggle(true)}
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: "#5c6ac4",
                "&:hover": { backgroundColor: "#4a5aa8" },
              }}
            >
              Chỉnh sửa
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => onEditToggle(false)}
              variant="outlined"
              sx={{ textTransform: "none", color: "#666", borderColor: "#ddd" }}
            >
              Hủy
            </Button>
            <Button
              onClick={onSave}
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: "#5c6ac4",
                "&:hover": { backgroundColor: "#4a5aa8" },
              }}
            >
              Lưu thay đổi
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailDialog;
