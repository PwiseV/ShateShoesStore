import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import type { User, OrderHistoryItem } from "../types";

// Mock Data Lịch sử mua hàng
const MOCK_HISTORY: OrderHistoryItem[] = [
  {
    orderId: "ORD001",
    date: "Aug 29, 2025",
    total: 500000,
    status: "Delivered",
  },
  {
    orderId: "ORD002",
    date: "Sep 15, 2025",
    total: 1200000,
    status: "Shipping",
  },
  {
    orderId: "ORD003",
    date: "Oct 10, 2025",
    total: 350000,
    status: "Processing",
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
  user: User | null;
  initialMode?: "view" | "edit";
  onSave: (userId: string, updatedData: Partial<User>) => void;
}

const UserDetailModal: React.FC<Props> = ({
  open,
  onClose,
  user,
  initialMode = "view",
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);

  useEffect(() => {
    if (open && user) {
      setFormData({ ...user });
      setIsEditing(initialMode === "edit");
    }
  }, [open, user, initialMode]);

  if (!user || !formData) return null;

  // --- LOGIC UI ---
  const isRoleAdmin = formData.role === "admin";
  const shouldHideHistory = isRoleAdmin && !isEditing;

  const handleChange = (field: keyof User, value: any) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSave = () => {
    if (formData) {
      // --- FIX QUAN TRỌNG: Dùng userId thay vì username ---
      onSave(formData.userId, formData);
      setIsEditing(false);
    }
  };

  const getStatusLabel = (status: string) =>
    status === "active" ? "Khả dụng" : "Bị chặn";
  const getStatusColor = (status: string) =>
    status === "active" ? "#2ecc71" : "#e74c3c";

  // Helper render Input
  const renderField = (
    label: string,
    value: string | number,
    fieldKey?: keyof User,
    disabled = false
  ) => (
    <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
      <Typography sx={{ width: "140px", fontWeight: 700, color: "#2C3E50" }}>
        {label}
      </Typography>
      {isEditing && fieldKey && !disabled ? (
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          value={value}
          onChange={(e) => handleChange(fieldKey, e.target.value)}
          sx={{
            bgcolor: "#EFEFEF",
            borderRadius: 1,
            "& fieldset": { border: "none" },
          }}
        />
      ) : (
        <Typography sx={{ color: "#555", flex: 1, fontWeight: 500 }}>
          {value}
        </Typography>
      )}
    </Box>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={shouldHideHistory ? "sm" : "md"}
      fullWidth
      PaperProps={{
        sx: { borderRadius: "24px", p: 2, fontFamily: "'Lexend', sans-serif" },
      }}
    >
      <DialogContent>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#6A5ACD" }}>
            Thông tin chi tiết
          </Typography>
          {!isEditing && (
            <IconButton onClick={onClose} sx={{ color: "#999" }}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>

        <Grid container spacing={4}>
          {/* CỘT TRÁI: THÔNG TIN */}
          <Grid size={12} md={shouldHideHistory ? 12 : 6}>
            <Box
              sx={{
                p: 3,
                bgcolor: "#F8F9FA",
                borderRadius: "16px",
                height: "100%",
              }}
            >
              {/* Username (Read-only) */}
              <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{ width: "140px", fontWeight: 700, color: "#2C3E50" }}
                >
                  Username
                </Typography>
                <Typography sx={{ color: "#2C3E50", fontWeight: 700 }}>
                  {formData.username}
                </Typography>
              </Box>

              {renderField("Họ tên", formData.displayName, "displayName")}
              {renderField("Email", formData.email, "email")}
              {renderField("Số điện thoại", formData.phone, "phone")}
              {renderField(
                "Ngày đăng ký",
                formData.createdAt
                  ? new Date(formData.createdAt).toLocaleDateString()
                  : "N/A"
              )}

              {/* DANH SÁCH ĐỊA CHỈ (READ-ONLY) */}
              <Box sx={{ mb: 2, mt: 2 }}>
                <Typography sx={{ fontWeight: 700, color: "#2C3E50", mb: 1 }}>
                  Danh sách địa chỉ
                </Typography>
                <Box sx={{ maxHeight: 200, overflowY: "auto", pr: 1 }}>
                  {formData.addresses && formData.addresses.length > 0 ? (
                    formData.addresses.map((addr, idx) => (
                      <Box
                        key={addr.addressId || idx}
                        sx={{
                          mb: 1.5,
                          p: 1.5,
                          border: "1px dashed #ccc",
                          borderRadius: "8px",
                          bgcolor: "#fff",
                          position: "relative",
                        }}
                      >
                        {addr.isDefault && (
                          <Chip
                            label="Mặc định"
                            size="small"
                            color="warning"
                            sx={{
                              position: "absolute",
                              right: 8,
                              top: 8,
                              height: 20,
                              fontSize: 10,
                            }}
                            icon={<StarIcon style={{ width: 12 }} />}
                          />
                        )}
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#333",
                          }}
                        >
                          {addr.street}
                        </Typography>
                        <Typography sx={{ fontSize: "12px", color: "#666" }}>
                          {addr.ward}, {addr.district}, {addr.city}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography sx={{ color: "#999", fontStyle: "italic" }}>
                      Chưa cập nhật địa chỉ
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* ROLE SELECT (SỬA ROLE) */}
              <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{ width: "140px", fontWeight: 700, color: "#2C3E50" }}
                >
                  Vai trò
                </Typography>
                {isEditing ? (
                  <Select
                    value={formData.role} // Giá trị 'admin' hoặc 'customer'
                    onChange={(e) => handleChange("role", e.target.value)}
                    size="small"
                    sx={{
                      bgcolor: "#EFEFEF",
                      borderRadius: 1,
                      minWidth: 150,
                      "& fieldset": { border: "none" },
                    }}
                  >
                    <MenuItem value="customer">Khách hàng</MenuItem>
                    <MenuItem value="admin">Quản trị viên</MenuItem>
                  </Select>
                ) : (
                  <Chip
                    label={
                      formData.role === "admin" ? "Quản trị viên" : "Khách hàng"
                    }
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                )}
              </Box>

              {/* STATUS SELECT */}
              <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{ width: "140px", fontWeight: 700, color: "#2C3E50" }}
                >
                  Tình trạng
                </Typography>
                {isEditing ? (
                  <Select
                    value={formData.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                    size="small"
                    sx={{
                      bgcolor: "#EFEFEF",
                      borderRadius: 1,
                      minWidth: 150,
                      "& fieldset": { border: "none" },
                    }}
                  >
                    <MenuItem value="active">Khả dụng</MenuItem>
                    <MenuItem value="blocked">Bị chặn</MenuItem>
                  </Select>
                ) : (
                  <Typography
                    sx={{
                      color: getStatusColor(formData.status),
                      fontWeight: 600,
                    }}
                  >
                    {getStatusLabel(formData.status)}
                  </Typography>
                )}
              </Box>

              {!shouldHideHistory && (
                <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid #eee" }}>
                  {renderField(
                    "Số đơn hàng",
                    formData.orderCount || 0,
                    undefined,
                    true
                  )}
                  {renderField(
                    "Tổng tiền",
                    (formData.totalSpent || 0).toLocaleString() + " đ",
                    undefined,
                    true
                  )}
                </Box>
              )}
            </Box>
          </Grid>

          {/* CỘT PHẢI: LỊCH SỬ (Ẩn nếu là Admin View Mode) */}
          {!shouldHideHistory && (
            <Grid size={12} md={6}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#6A5ACD", mb: 2 }}
              >
                Lịch sử hoạt động
              </Typography>
              <TableContainer
                component={Paper}
                elevation={0}
                sx={{ bgcolor: "#F8F9FA", borderRadius: "16px" }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Mã đơn</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Ngày mua</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Giá tiền</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Tình trạng</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {MOCK_HISTORY.map((row) => (
                      <TableRow key={row.orderId}>
                        <TableCell>{row.orderId}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.total.toLocaleString()}</TableCell>
                        <TableCell>
                          <span
                            style={{
                              color:
                                row.status === "Delivered"
                                  ? "#2ecc71"
                                  : "#f1c40f",
                              fontWeight: 600,
                            }}
                          >
                            {row.status === "Delivered"
                              ? "Đã giao"
                              : "Đang giao"}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          )}
        </Grid>

        {/* Footer */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
          {isEditing ? (
            <>
              <Button
                variant="contained"
                onClick={handleSave}
                sx={{
                  fontWeight: "bold",
                  borderRadius: "20px",
                  px: 4,
                }}
              >
                Lưu
              </Button>
              <Button
                variant="contained"
                onClick={() => setIsEditing(false)}
                sx={{
                  bgcolor: "#bbb",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: "20px",
                  px: 4,
                  "&:hover": { bgcolor: "#999" },
                }}
              >
                Hủy bỏ
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                onClick={() => setIsEditing(true)}
                sx={{
                  fontWeight: "bold",
                  borderRadius: "20px",
                  px: 4,
                }}
              >
                Chỉnh sửa
              </Button>
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailModal;
