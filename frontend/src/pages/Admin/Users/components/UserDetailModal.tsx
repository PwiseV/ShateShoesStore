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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import type { User, OrderHistoryItem } from "../type";
// import Grid from "@mui/material/Grid";

// Mock Data
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
  onSave: (updatedUser: User) => void;
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

  // --- LOGIC ROLE ---
  // Kiểm tra role để ẩn/hiện layout
  const isAdmin = formData.role === "Admin";

  const handleChange = (field: keyof User, value: any) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  // Cập nhật địa chỉ theo index (Update trường street)
  const handleAddressChange = (index: number, newVal: string) => {
    setFormData((prev) => {
      if (!prev) return null;
      const newAddresses = [...prev.addresses];
      if (newAddresses[index]) {
        newAddresses[index] = { ...newAddresses[index], street: newVal };
      }
      return { ...prev, addresses: newAddresses };
    });
  };

  const handleSave = () => {
    if (formData) {
      onSave(formData);
      setIsEditing(false);
    }
  };

  const getStatusLabel = (status: string) =>
    status === "active" ? "Khả dụng" : "Bị chặn";
  const getStatusColor = (status: string) =>
    status === "active" ? "#2ecc71" : "#e74c3c";

  // Helper render
  const renderField = (
    label: string,
    value: string | number,
    fieldKey?: keyof User,
    isAddress = false
  ) => {
    return (
      <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
        <Typography sx={{ width: "140px", fontWeight: 700, color: "#2C3E50" }}>
          {label}
        </Typography>
        {isEditing && fieldKey ? (
          isAddress ? (
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
          )
        ) : (
          <Typography sx={{ color: "#555", flex: 1, fontWeight: 500 }}>
            {value}
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={isAdmin ? "sm" : "md"}
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
          {/* Cột Trái: Thông tin User */}
          <Grid size={12} md={isAdmin ? 12 : 6}>
            <Box
              sx={{
                p: 3,
                bgcolor: "#F8F9FA",
                borderRadius: "16px",
                height: "100%",
              }}
            >
              {/* MỚI: Hiển thị Username */}
              <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{ width: "140px", fontWeight: 700, color: "#2C3E50" }}
                >
                  Username
                </Typography>
                <Typography sx={{ color: "#2C3E50", flex: 1, fontWeight: 700 }}>
                  {formData.username}
                </Typography>
              </Box>
              {renderField("Họ tên", formData.displayName, "displayName")}
              {renderField("Email", formData.email, "email")}
              {renderField("Số điện thoại", formData.phone, "phone")}
              {renderField(
                "Ngày đăng ký",
                formData.created_at
                  ? new Date(formData.created_at).toLocaleDateString()
                  : "N/A"
              )}

              {renderField(
                "Địa chỉ",
                formData.addresses.length > 0
                  ? `${formData.addresses[0].street}, ${formData.addresses[0].city}`
                  : "Chưa cập nhật",
                "addresses",
                true
              )}

              {/* --- LOGIC ĐỊA CHỈ NHIỀU DÒNG (UPDATE) --- */}
              <Box sx={{ mb: 2, display: "flex", alignItems: "flex-start" }}>
                <Box sx={{ flex: 1 }}>
                  {formData.addresses && formData.addresses.length > 0 ? (
                    formData.addresses.map((addr, index) => (
                      <Box key={index} sx={{ mb: 1.5 }}>
                        {isEditing ? (
                          <Box>
                            <TextField
                              fullWidth
                              size="small"
                              variant="outlined"
                              value={addr.street}
                              onChange={(e) =>
                                handleAddressChange(index, e.target.value)
                              }
                              sx={{
                                bgcolor: "#EFEFEF",
                                borderRadius: 1,
                                "& fieldset": { border: "none" },
                              }}
                              placeholder={`Địa chỉ ${index + 1}`}
                            />
                            {/* Hiển thị Quận/TP bên dưới để user biết đang sửa cái nào */}
                            <Typography
                              sx={{
                                fontSize: "11px",
                                color: "#888",
                                mt: 0.5,
                                ml: 1,
                              }}
                            >
                              {addr.ward}, {addr.district}, {addr.city}
                            </Typography>
                          </Box>
                        ) : (
                          // Chế độ Xem: Hiển thị list
                          <Box sx={{ borderBottom: "1px dashed #eee", pb: 1 }}>
                            <Typography sx={{ color: "#555", fontWeight: 500 }}>
                              {index + 1}. {addr.street}
                            </Typography>
                            <Typography
                              sx={{ color: "#777", fontSize: "12px" }}
                            >
                              {addr.ward}, {addr.district}, {addr.city}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    ))
                  ) : (
                    <Typography
                      sx={{ color: "#999", fontStyle: "italic", mt: 1 }}
                    >
                      Chưa cập nhật địa chỉ
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* --- PHẦN VAI TRÒ (ĐÃ SỬA LỖI HIỂN THỊ) --- */}
              <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{ width: "140px", fontWeight: 700, color: "#2C3E50" }}
                >
                  Vai trò
                </Typography>
                {isEditing ? (
                  <Select
                    // UPDATE: Ép kiểu giá trị để khớp với MenuItem
                    // Nếu role là 'Admin' thì hiển thị admin, còn lại (null, undefined, user...) đều hiển thị customer
                    value={formData.role === "Admin" ? "Admin" : "Customer"}
                    onChange={(e) => handleChange("role", e.target.value)}
                    size="small"
                    sx={{
                      bgcolor: "#EFEFEF",
                      borderRadius: 1,
                      "& fieldset": { border: "none" },
                      minWidth: 150,
                    }}
                  >
                    <MenuItem value="Customer">Khách hàng</MenuItem>
                    <MenuItem value="Admin">Quản trị viên</MenuItem>
                  </Select>
                ) : (
                  <Typography sx={{ fontWeight: 600, color: "#333" }}>
                    {formData.role === "Admin" ? "Quản trị viên" : "Khách hàng"}
                  </Typography>
                )}
              </Box>

              {/* Phần Tình trạng */}
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
                      "& fieldset": { border: "none" },
                      minWidth: 150,
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

              {/* Chỉ hiện thống kê đơn hàng nếu KHÔNG phải Admin */}
              {!isAdmin && (
                <>
                  {renderField("Số đơn hàng", formData.orderCount || 3)}
                  {renderField(
                    "Tổng tiền",
                    (formData.totalSpent || 1500000).toLocaleString() + " đ"
                  )}
                </>
              )}
            </Box>
          </Grid>

          {/* Cột Phải: Lịch sử mua hàng (Chỉ hiện nếu KHÔNG phải Admin) */}
          {!isAdmin && (
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

        {/* Footer Buttons */}
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
