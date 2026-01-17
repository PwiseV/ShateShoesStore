import React, { useEffect, useState } from "react";
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
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import type { OrderData } from "../types";
import { statusConfig, paymentStatusConfig } from "../constants";
import { formatCurrency, formatDateTime } from "../utils";
import { useOrderDetailLogic } from "../hooks/useOrderDetailLogic";
import { updateAdminOrder } from "../../../../services/adminOrdersServices";
import { useToast } from "../../../../context/useToast";


interface Props {
  open: boolean;
  orderId: string | null;
  onClose: () => void;
  onUpdated?: () => void;
}

const OrderDetailDialog: React.FC<Props> = ({
  open,
  orderId,
  onClose,
  onUpdated,
}) => {
  const { order, loading, isLocked } = useOrderDetailLogic(
    open ? orderId : null
  );

  const [editedOrder, setEditedOrder] = useState<OrderData | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (order) {
      setEditedOrder(order);
      setIsEditing(false);
    }
  }, [order]);

  if (!open) return null;

  if (loading || !order || !editedOrder) {
    return (
      <Dialog open={open} fullWidth maxWidth="sm">
        <DialogContent sx={{ py: 6, textAlign: "center" }}>
          <CircularProgress />
          <Typography mt={2}>Đang tải chi tiết đơn hàng...</Typography>
        </DialogContent>
      </Dialog>
    );
  }

  const displayOrder = isEditing ? editedOrder : order;

  const handleFieldChange = (field: keyof OrderData, value: any) => {
    setEditedOrder((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const { showToast } = useToast();

  const handleSave = async () => {
  if (!editedOrder || !order) return;

  try {
    await updateAdminOrder(order.id, {
      name: editedOrder.name,
      phone: editedOrder.phone,
      address: editedOrder.address,
      status: editedOrder.status,
      paymentMethod: editedOrder.paymentMethod,
    });

    showToast("Cập nhật đơn hàng thành công", "success");

    onUpdated?.();   // ✅ reload list
    onClose();       // ✅ ĐÓNG MODAL LUÔN → chặn double fetch
  } catch (err: any) {
    const message =
      err?.response?.data?.message || "Không thể cập nhật đơn hàng";
    showToast(message, "error");
    onClose();     // ✅ ĐÓNG MODAL LUÔN → chặn double fetch
  }
};




  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography fontWeight={700}>
          {isEditing
            ? `Chỉnh sửa đơn hàng #${displayOrder.orderNumber}`
            : `Chi tiết đơn hàng #${displayOrder.orderNumber}`}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {/* KHÁCH HÀNG */}
        <Typography fontWeight={700} color="#5c6ac4" mb={1}>
          Thông tin khách hàng
        </Typography>

        <Box display="flex" gap={2} mb={2}>
          <Box flex={1}>
            <Typography variant="caption">Tên khách hàng</Typography>
            {isEditing ? (
              <TextField
                fullWidth
                size="small"
                value={displayOrder.name}
                onChange={(e) =>
                  handleFieldChange("name", e.target.value)
                }
              />
            ) : (
              <Typography>{displayOrder.name}</Typography>
            )}
          </Box>

          <Box flex={1}>
            <Typography variant="caption">Số điện thoại</Typography>
            {isEditing ? (
              <TextField
                fullWidth
                size="small"
                value={displayOrder.phone}
                onChange={(e) =>
                  handleFieldChange("phone", e.target.value)
                }
              />
            ) : (
              <Typography>{displayOrder.phone}</Typography>
            )}
          </Box>
        </Box>

        <Box mb={2}>
          <Typography variant="caption">Địa chỉ</Typography>
          {isEditing ? (
            <TextField
              fullWidth
              size="small"
              value={displayOrder.address}
              onChange={(e) =>
                handleFieldChange("address", e.target.value)
              }
            />
          ) : (
            <Typography>{displayOrder.address}</Typography>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* ĐƠN HÀNG */}
        <Typography fontWeight={700} color="#5c6ac4" mb={1}>
          Thông tin đơn hàng
        </Typography>

        <Box display="flex" gap={2} mb={2}>
          <Box flex={1}>
            <Typography variant="caption">Ngày đặt</Typography>
            <Typography>
              {formatDateTime(displayOrder.createdAt)}
            </Typography>
          </Box>

          <Box flex={1}>
            <Typography variant="caption">Tổng tiền</Typography>
            <Typography color="error">
              {formatCurrency(displayOrder.total)}
            </Typography>
          </Box>

          <Box flex={1}>
            <Typography variant="caption">Trạng thái</Typography>
            {isEditing ? (
              <Select
                fullWidth
                size="small"
                value={displayOrder.status}
                onChange={(e) =>
                  handleFieldChange("status", e.target.value)
                }
              >
                {Object.entries(statusConfig).map(([k, v]) => (
                  <MenuItem key={k} value={k}>
                    {v.label}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              <Typography>
                {statusConfig[displayOrder.status]?.label}
              </Typography>
            )}
          </Box>
        </Box>

        <Box mb={2}>
          <Typography variant="caption">Thanh toán</Typography>
          {isEditing ? (
            <Select
              fullWidth
              size="small"
              value={displayOrder.paymentMethod}
              onChange={(e) =>
                handleFieldChange("paymentMethod", e.target.value)
              }
            >
              {Object.entries(paymentStatusConfig).map(([k, v]) => (
                <MenuItem key={k} value={k}>
                  {v.label}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <Typography>
              {paymentStatusConfig[displayOrder.paymentMethod]?.label}
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* SẢN PHẨM */}
        <Typography fontWeight={700} color="#5c6ac4" mb={1}>
          Danh sách sản phẩm
        </Typography>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Sản phẩm</TableCell>
              <TableCell align="center">SL</TableCell>
              <TableCell align="right">Đơn giá</TableCell>
              <TableCell align="right">Thành tiền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayOrder.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.product?.title}</TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="right">
                  {formatCurrency(item.price)}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(item.price * item.quantity)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
        {isEditing ? (
          <>
            <Button onClick={() => setIsEditing(false)}>Hủy</Button>
            <Button variant="contained" onClick={handleSave}>
              Lưu thay đổi
            </Button>
          </>
        ) : (
          !isLocked && (
            <Button variant="contained" onClick={() => setIsEditing(true)}>
              Chỉnh sửa
            </Button>
          )
        )}
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailDialog;
