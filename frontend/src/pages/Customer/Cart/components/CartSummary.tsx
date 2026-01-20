import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  Snackbar,
  Alert,
  Chip,
  IconButton,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber"; // Icon vé
import { useState } from "react";

interface Props {
  total: number;
  discount: number;
  finalTotal: number;
  itemsCount: number;
  couponCode: string;
  setCouponCode: (code: string) => void;
  applyDiscount: (
    code: string
  ) => Promise<{ success: boolean; discount: number; message: string }>;
  couponMessage: string;
  removeDiscount: () => void;
}

const CartSummary = ({
  total,
  discount,
  finalTotal,
  itemsCount,
  couponCode,
  setCouponCode,
  applyDiscount,
  removeDiscount,
}: Props) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info"
  >("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleApply = async () => {
    if (!couponCode.trim()) {
      showSnackbar("error", "Vui lòng nhập mã giảm giá");
      return;
    }
    const result = await applyDiscount(couponCode);
    showSnackbar(result.success ? "success" : "error", result.message);
  };

  const handleRemoveCoupon = () => {
    removeDiscount();
    showSnackbar("info", "Đã gỡ mã giảm giá");
  };

  const showSnackbar = (
    severity: "success" | "error" | "info",
    message: string
  ) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Box>
      <Card
        sx={{
          bgcolor: "#F0F4F8",
          borderRadius: 4,
          boxShadow: "none",
          border: "1px solid #E1E6EB",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            color="#2F4156"
            sx={{ fontFamily: "'Lexend', sans-serif", mb: 2 }}
          >
            Tổng quan đơn hàng
          </Typography>

          <Divider sx={{ borderColor: "#DDE3E9", mb: 3 }} />

          {/* === SECTION: MÃ GIẢM GIÁ === */}
          <Box mb={3}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <LocalOfferIcon sx={{ color: "#2F4156", fontSize: 18 }} />
              <Typography
                fontWeight={600}
                sx={{
                  fontFamily: "'Lexend', sans-serif",
                  fontSize: 14,
                  color: "#2F4156",
                }}
              >
                Mã giảm giá
              </Typography>
            </Box>

            {discount > 0 ? (
              // === UI KHI ĐÃ ÁP MÃ (Thẻ Ticket) ===
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  bgcolor: "#E3F2FD", // Xanh nhạt
                  p: "12px 16px",
                  borderRadius: 2,
                  border: "1px dashed #2196F3", // Viền đứt nét xanh dương
                }}
              >
                <Box display="flex" alignItems="center" gap={1.5}>
                  <ConfirmationNumberIcon sx={{ color: "#2196F3" }} />
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: "'Lexend', sans-serif",
                        fontWeight: 700,
                        color: "#1565C0",
                        fontSize: 14,
                        lineHeight: 1.2,
                        textTransform: "uppercase",
                      }}
                    >
                      {couponCode}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "'Lexend', sans-serif",
                        fontSize: 12,
                        color: "#1E88E5",
                        fontWeight: 500,
                      }}
                    >
                      Tiết kiệm {discount.toLocaleString("vi-VN")}đ
                    </Typography>
                  </Box>
                </Box>

                <IconButton
                  size="small"
                  onClick={handleRemoveCoupon}
                  sx={{
                    color: "#ef5350",
                    bgcolor: "white",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                    "&:hover": { bgcolor: "#ffebee" },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ) : (
              // === UI KHI NHẬP MÃ (Input Group) ===
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  placeholder="Nhập mã ưu đãi"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  variant="outlined"
                  // Bỏ size="small" để dễ custom height hơn, hoặc giữ nguyên nhưng override CSS
                  fullWidth
                  sx={{
                    bgcolor: "white",
                    "& .MuiOutlinedInput-root": {
                      height: "45px", // [Quan trọng] Set chiều cao cố định bằng nút
                      borderRadius: "8px",
                      fontFamily: "'Lexend', sans-serif",
                      fontSize: 14,
                      paddingRight: 0,
                      "& fieldset": { borderColor: "#cfd8dc" },
                      "&:hover fieldset": { borderColor: "#90A4AE" },
                      "&.Mui-focused fieldset": {
                        borderColor: "#2F4156",
                        borderWidth: "1.5px",
                      },
                    },
                    "& input": {
                      height: "100%", // Input con ăn theo chiều cao cha
                      boxSizing: "border-box", // Đảm bảo padding không làm vỡ layout
                      padding: "0 14px", // Chỉ padding ngang, vertical để flex lo
                    },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleApply}
                  disabled={!couponCode.trim()}
                  disableElevation
                  sx={{
                    height: "45px", // [Quan trọng] Set chiều cao bằng Input
                    borderRadius: "8px",
                    textTransform: "none",
                    fontFamily: "'Lexend', sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    bgcolor: "#2F4156",
                    minWidth: "100px", // Rộng hơn xíu cho thoáng
                    whiteSpace: "nowrap", // Chống xuống dòng chữ "Áp dụng"
                    "&:hover": { bgcolor: "#1e2a38" },
                    "&:disabled": { bgcolor: "#cfd8dc", color: "#90a4ae" },
                  }}
                >
                  Áp dụng
                </Button>
              </Box>
            )}
          </Box>

          <Divider
            sx={{ borderStyle: "dashed", borderColor: "#cfd8dc", mb: 3 }}
          />

          {/* === SECTION: TÍNH TIỀN === */}
          <Box>
            <SummaryRow
              label={`Tạm tính (${itemsCount} sản phẩm)`}
              value={`${total.toLocaleString("vi-VN")} đ`}
            />

            {discount > 0 && (
              <SummaryRow
                label="Giảm giá"
                value={`- ${discount.toLocaleString("vi-VN")} đ`}
                color="#2e7d32" // Xanh lá đậm hơn chút
              />
            )}

            <Box mt={2} mb={1}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-end"
              >
                <Typography
                  fontSize={15}
                  color="#2F4156"
                  fontWeight={600}
                  sx={{ fontFamily: "'Lexend', sans-serif" }}
                >
                  Tổng cộng
                </Typography>
                <Box textAlign="right">
                  <Typography
                    fontSize={20}
                    fontWeight={800}
                    color="#d32f2f" // Đỏ nổi bật
                    sx={{ fontFamily: "'Lexend', sans-serif", lineHeight: 1 }}
                  >
                    {finalTotal.toLocaleString("vi-VN")} đ
                  </Typography>
                  <Typography
                    variant="caption"
                    color="#78909c"
                    sx={{ fontFamily: "'Lexend', sans-serif" }}
                  >
                    (Đã bao gồm VAT)
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Nút Thanh toán */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5, // Cao hơn chút
              borderRadius: "10px", // Bo tròn nhiều hơn
              bgcolor: "#2F4156",
              fontWeight: 700,
              fontSize: 16,
              fontFamily: "'Lexend', sans-serif",
              boxShadow: "0 4px 12px rgba(47, 65, 86, 0.2)", // Đổ bóng nhẹ
              "&:hover": {
                bgcolor: "#1e2a38",
                boxShadow: "0 6px 16px rgba(47, 65, 86, 0.3)",
              },
              textTransform: "none",
            }}
          >
            Đặt hàng
          </Button>
        </CardContent>
      </Card>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{
            width: "100%",
            fontFamily: "'Lexend', sans-serif",
            fontWeight: 500,
          }}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

// Component con render dòng tiền
const SummaryRow = ({
  label,
  value,
  color = "#455a64", // Màu chữ mặc định xám xanh đậm
}: {
  label: string;
  value: string;
  color?: string;
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      mb: 1.5,
      alignItems: "center",
    }}
  >
    <Typography
      fontSize={14}
      color="#546e7a"
      sx={{ fontFamily: "'Lexend', sans-serif" }}
    >
      {label}
    </Typography>
    <Typography
      fontSize={15}
      fontWeight={600}
      color={color}
      sx={{ fontFamily: "'Lexend', sans-serif" }}
    >
      {value}
    </Typography>
  </Box>
);

export default CartSummary;
