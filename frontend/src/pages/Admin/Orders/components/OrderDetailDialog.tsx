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
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { OrderData } from "../types";
import { statusConfig, paymentStatusConfig } from "../constants";
import { formatCurrency, formatDateTime } from "../utils"; // Đảm bảo import formatDateTime

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
  if (!order) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Chi tiết đơn hàng</DialogTitle>
      <DialogContent
        sx={{
          py: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography color="textSecondary">
          Đang tải chi tiết đơn hàng...
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

  const canEdit = ["pending", "processing"].includes(order.status);
  const displayOrder = isEditing && editedOrder ? editedOrder : order;
  const getAvailableStatuses = (currentStatus: string) => {
    // Định nghĩa thứ tự quy trình chuẩn
    const flow = ["pending", "processing", "shipped", "delivered"];
    const currentIndex = flow.indexOf(currentStatus);

    // Lọc ra các status hợp lệ từ config
    return Object.entries(statusConfig).filter(([key]) => {
      // 1. Luôn hiển thị status hiện tại của đơn hàng (để Select hiển thị đúng giá trị)
      if (key === currentStatus) return true;

      // 2. Nếu đơn hàng hiện tại là Cancelled hoặc Delivered -> Không cho chọn gì khác (Logic này đã chặn ở nút Edit, nhưng check thêm cho chắc)
      if (currentStatus === "cancelled" || currentStatus === "delivered")
        return false;

      // 3. Logic cho "Cancelled" (Đã hủy)
      // Cho phép hủy ở mọi bước TRỪ KHI đã giao hàng
      if (key === "cancelled") {
        return currentStatus !== "delivered";
      }

      // 4. Logic dòng chảy xuôi (Forward only)
      const targetIndex = flow.indexOf(key);

      // Nếu status đích không nằm trong flow (lỗi config?) -> bỏ qua
      if (targetIndex === -1) return false;

      // Chỉ cho phép đi tới (index lớn hơn index hiện tại)
      return targetIndex > currentIndex;
    });
  };

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
          {/* --- PHẦN 1: THÔNG TIN KHÁCH HÀNG (Có thể sửa) --- */}
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

          {/* --- PHẦN 2: THÔNG TIN ĐƠN HÀNG --- */}
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{ mb: 1, color: "#5c6ac4" }}
            >
              Thông tin đơn hàng
            </Typography>

            {/* A. Các trường READ-ONLY (Luôn chỉ xem) */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid size={4}>
                <Typography variant="caption" color="textSecondary">
                  Mã đơn hàng
                </Typography>
                <Typography fontWeight={700}>
                  {displayOrder.orderNumber}
                </Typography>
              </Grid>
              <Grid size={4}>
                <Typography variant="caption" color="textSecondary">
                  Ngày đặt hàng
                </Typography>
                <Typography fontWeight={600}>
                  {formatDateTime(displayOrder.createdAt)}
                </Typography>
              </Grid>
              <Grid size={4}>
                <Typography variant="caption" color="textSecondary">
                  Tổng tiền đơn hàng
                </Typography>
                <Typography fontWeight={700} color="#d32f2f">
                  {formatCurrency(displayOrder.total)}
                </Typography>
              </Grid>
            </Grid>

            {/* B. Các trường CÓ THỂ SỬA (Status, Payment) */}
            <Grid container spacing={2}>
              {/* Trạng thái */}
              <Grid size={4}>
                <Typography variant="caption" color="textSecondary">
                  Trạng thái
                </Typography>
                {isEditing ? (
                  <Select
                    fullWidth
                    size="small"
                    value={displayOrder.status}
                    onChange={(e) => onFieldChange("status", e.target.value)}
                    sx={{ borderRadius: "8px" }}
                  >
                    {/* Render danh sách status đã được lọc theo logic Flow */}
                    {getAvailableStatuses(order.status).map(([key, config]) => (
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
                          : statusConfig[displayOrder.status]?.color === "error"
                          ? "red"
                          : "#f57c00",
                    }}
                  >
                    {statusConfig[displayOrder.status]?.label ||
                      displayOrder.status}
                  </Typography>
                )}
              </Grid>

              {/* Phương thức thanh toán */}
              <Grid size={4}>
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
                    {paymentStatusConfig[displayOrder.paymentMethod]?.label ||
                      displayOrder.paymentMethod}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* --- PHẦN 3: DANH SÁCH SẢN PHẨM (READ-ONLY) --- */}
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
                  </TableRow>
                </TableHead>
                <TableBody>
  {displayOrder.items?.map((item, idx) => {
    const price = item.price ?? 0;
    const quantity = item.quantity ?? 0;
    const total = price * quantity;

    return (
      <TableRow key={item.id || idx}>
        <TableCell>
          <Typography variant="body2" fontWeight={600}>
            {item.product?.title}
          </Typography>
          {item.sku && (
            <Typography variant="caption" color="textSecondary">
              {item.sku}
            </Typography>
          )}
        </TableCell>

        <TableCell align="center">{quantity}</TableCell>

        <TableCell align="right">
          {formatCurrency(price)}
        </TableCell>

        <TableCell align="right">
          <Typography fontWeight={600}>
            {formatCurrency(total)}
          </Typography>
        </TableCell>
      </TableRow>
    );
  })}

  {(!displayOrder.items || displayOrder.items.length === 0) && (
    <TableRow>
      <TableCell colSpan={4} align="center">
        <Typography color="textSecondary" sx={{ py: 2 }}>
          Chưa có sản phẩm nào
        </Typography>
      </TableCell>
    </TableRow>
  )}
</TableBody>

              </Table>
            </TableContainer>

            {/* Total Section Footer */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Typography variant="h6" fontWeight={700} color="#d32f2f">
                Tổng cộng: {formatCurrency(displayOrder.total)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{ p: "16px", gap: "12px", borderTop: "1px solid #eee" }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ textTransform: "none", color: "#666", borderColor: "#ddd" }}
        >
          Đóng
        </Button>

        {isEditing ? (
          <>
            <Button
              onClick={() => onEditToggle(false)}
              variant="outlined"
              sx={{ textTransform: "none", color: "#666", borderColor: "#ddd" }}
            >
              Hủy bỏ
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
        ) : (
          canEdit && (
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
          )
        )}
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailDialog;
