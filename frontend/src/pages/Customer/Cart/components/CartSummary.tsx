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
} from "@mui/material";
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
}: Props) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleApply = async () => {
    if (!couponCode.trim()) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Vui lòng nhập mã giảm giá");
      setOpenSnackbar(true);
      return;
    }

    const result = await applyDiscount(couponCode);

    if (result.success) {
      setSnackbarSeverity("success");
      setSnackbarMessage(result.message);
    } else {
      setSnackbarSeverity("error");
      setSnackbarMessage(result.message || "Mã giảm giá không hợp lệ");
    }
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Card sx={{ borderRadius: 2, boxShadow: "none", bgcolor: "#fff" }}>
        <CardContent sx={{ p: 2.5 }}>
          <Typography
            display={"flex"}
            fontSize={15}
            fontWeight={700}
            mb={1}
            sx={{ fontFamily: "'Lexend', sans-serif" }}
          >
            Giảm giá
          </Typography>

          <Box sx={{ display: "flex" }}>
            <TextField
              size="small"
              placeholder="Mã giảm giá"
              fullWidth
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              variant="outlined"
              InputProps={{
                style: { fontFamily: "'Lexend', sans-serif" },
              }}
            />
            <Button
              variant="contained"
              onClick={handleApply}
              disableElevation
              sx={{
                ml: 1,
                height: 38,
                minWidth: 90,
                padding: 0,
                borderRadius: 1,
                bgcolor: "#5f7d8c",
                fontSize: 11,
                fontWeight: 700,
                lineHeight: "38px",
                textTransform: "uppercase",
                fontFamily: "'Lexend', sans-serif",
                "&:hover": { bgcolor: "#546f7c" },
              }}
            >
              Áp dụng
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 2, boxShadow: "none", bgcolor: "#fff" }}>
        <CardContent sx={{ p: 2.5 }}>
          <Typography
            display={"flex"}
            fontSize={15}
            fontWeight={700}
            sx={{ fontFamily: "'Lexend', sans-serif" }}
          >
            Tạm tính
          </Typography>
          <Divider sx={{ mt: 1, mb: 1, color: "#000" }} />

          <SummaryRow label="Tổng số sản phẩm" value={itemsCount} />
          <SummaryRow
            label="Giá gốc"
            value={`${total.toLocaleString("vi-VN")}đ`}
          />
          <SummaryRow
            label="Giảm giá"
            value={`-${discount.toLocaleString("vi-VN")}đ`}
          />

          <Divider sx={{ my: 1.5 }} />

          <SummaryRow
            label="Tổng tiền"
            value={`${finalTotal.toLocaleString("vi-VN")}đ`}
            bold
          />

          <Button
            fullWidth
            variant="contained"
            disableElevation
            sx={{
              mt: 2,
              height: 42,
              borderRadius: 1,
              bgcolor: "#5f7d8c",
              fontWeight: 700,
              fontFamily: "'Lexend', sans-serif",
              "&:hover": { bgcolor: "#546f7c" },
            }}
          >
            Đặt hàng
          </Button>
        </CardContent>
      </Card>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%", fontFamily: "'Lexend', sans-serif" }}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const SummaryRow = ({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: string | number;
  bold?: boolean;
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      mb: 1,
    }}
  >
    <Typography
      fontSize={13}
      color="text.primary"
      fontWeight={700}
      sx={{ fontFamily: "'Lexend', sans-serif" }}
    >
      {label}
    </Typography>
    <Typography
      fontSize={13}
      fontWeight={bold ? 700 : 500}
      sx={{ fontFamily: "'Lexend', sans-serif" }}
    >
      {value}
    </Typography>
  </Box>
);

export default CartSummary;
