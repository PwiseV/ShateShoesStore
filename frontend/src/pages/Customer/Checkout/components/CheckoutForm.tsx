// src/pages/Customer/Checkout/components/CheckoutForm.tsx
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  Grid, // Import Grid2 và đổi tên thành Grid để dùng
  Button,
  Divider,
} from "@mui/material";
import type { Coupon } from "../types";

interface Props {
  name: string;
  setName: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  address: string;
  setAddress: (val: string) => void;
  note: string;
  setNote: (val: string) => void;
  availableCoupons: Coupon[];
  onSelectCoupon: (coupon: Coupon) => void;
  selectedCouponId?: string | number;
}

// Style chung cho Input "viên thuốc"
const pillInputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "30px",
    bgcolor: "white",
    boxShadow: "none",
    "& fieldset": {
      border: "1px solid transparent",
    },
    "&:hover fieldset": {
      borderColor: "#b0bec5",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2F4156",
    },
  },
  "& .MuiInputBase-input": {
    padding: "12px 24px",
    fontSize: "14px",
    fontFamily: "'Lexend', sans-serif",
  },
};

// Style cho TextArea
const textAreaStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
    bgcolor: "white",
    padding: "16px",
    "& fieldset": {
      border: "1px solid transparent",
    },
    "&:hover fieldset": {
      borderColor: "#b0bec5",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2F4156",
    },
  },
  "& .MuiInputBase-input": {
    fontFamily: "'Lexend', sans-serif",
    fontSize: "14px",
  },
};

const CheckoutForm = ({
  name,
  setName,
  phone,
  setPhone,
  address,
  setAddress,
  note,
  setNote,
  availableCoupons,
  onSelectCoupon,
  selectedCouponId,
}: Props) => {
  return (
    <Box>
      <Card
        sx={{
          bgcolor: "#cfdde6",
          borderRadius: 4,
          boxShadow: "none",
          mb: 4,
          overflow: "visible",
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          {/* Header Section */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              fontWeight={700}
              color="#2F4156"
              textAlign={"left"}
              sx={{ fontFamily: "'Lexend', sans-serif" }}
            >
              Thông tin người nhận hàng
            </Typography>
            <Divider sx={{ borderColor: "#aab4be", mt: 1, opacity: 0.5 }} />
          </Box>

          {/* Form Fields */}
          {/* LƯU Ý: Dùng Grid container spacing={3} */}
          <Grid container spacing={3}>
            {/* Hàng 1: Tên & SĐT - Sửa: size={{ xs: 12, md: 6 }} */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                fontWeight={700}
                color="#2F4156"
                mb={1}
                fontSize={14}
                textAlign={"left"}
                sx={{ fontFamily: "'Lexend', sans-serif" }}
              >
                Họ và tên
              </Typography>
              <TextField
                fullWidth
                placeholder="Nhập họ tên"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={pillInputStyle}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                fontWeight={700}
                color="#2F4156"
                mb={1}
                fontSize={14}
                textAlign={"left"}
                sx={{ fontFamily: "'Lexend', sans-serif" }}
              >
                Số điện thoại
              </Typography>
              <TextField
                fullWidth
                placeholder="Nhập số điện thoại"
                variant="outlined"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={pillInputStyle}
              />
            </Grid>

            {/* Hàng 2: Địa chỉ - Sửa: size={{ xs: 12 }} */}
            <Grid size={{ xs: 12 }}>
              <Typography
                fontWeight={700}
                color="#2F4156"
                mb={1}
                fontSize={14}
                textAlign={"left"}
                sx={{ fontFamily: "'Lexend', sans-serif" }}
              >
                Địa chỉ
              </Typography>
              <TextField
                fullWidth
                placeholder="Số nhà, đường, phường, quận, tỉnh"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                sx={pillInputStyle}
              />
            </Grid>

            {/* Hàng 3: Ghi chú - Sửa: size={{ xs: 12 }} */}
            <Grid size={{ xs: 12 }}>
              <Typography
                fontWeight={700}
                color="#2F4156"
                mb={1}
                fontSize={14}
                textAlign={"left"}
                sx={{ fontFamily: "'Lexend', sans-serif" }}
              >
                Ghi chú
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                placeholder="Nhập ghi chú cho người giao hàng..."
                variant="outlined"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                sx={textAreaStyle}
              />
            </Grid>
          </Grid>

          {/* Coupon Section */}
          <Box sx={{ mt: 5 }}>
            <Grid container spacing={2}>
              {availableCoupons.length > 0 ? (
                availableCoupons.map((coupon) => (
                  // Sửa: size={{ xs: 12, md: 6 }}
                  <Grid size={{ xs: 12, md: 6 }} key={coupon.promotionId}>
                    <Card
                      sx={{
                        p: 2.5,
                        borderRadius: 4,
                        bgcolor: "white",
                        border:
                          selectedCouponId === coupon.promotionId
                            ? "2px solid #2F4156"
                            : "1px solid transparent",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        "&:hover": { transform: "translateY(-2px)" },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        minHeight: "120px",
                        position: "relative",
                        overflow: "visible",
                      }}
                      onClick={() => onSelectCoupon(coupon)}
                    >
                      <Box>
                        <Typography
                          fontWeight={800}
                          color="#2F4156"
                          fontSize={16}
                          sx={{ fontFamily: "'Lexend', sans-serif" }}
                        >
                          {coupon.code}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            display: "block",
                            mt: 0.5,
                            fontSize: 12,
                            fontFamily: "'Lexend', sans-serif",
                          }}
                        >
                          {coupon.description}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ fontSize: 11, mt: 0.5, display: "block" }}
                        >
                          Đơn tối thiểu: {coupon.minOrderValue.toLocaleString()}
                          đ
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          mt: 2,
                        }}
                      >
                        <Button
                          size="small"
                          variant="contained"
                          sx={{
                            bgcolor:
                              selectedCouponId === coupon.promotionId
                                ? "#2F4156"
                                : "#546e7a",
                            borderRadius: 1,
                            textTransform: "uppercase",
                            fontWeight: 700,
                            fontSize: 12,
                            px: 2,
                            "&:hover": { bgcolor: "#2F4156" },
                          }}
                        >
                          {selectedCouponId === coupon.promotionId
                            ? "Đã chọn"
                            : "Áp dụng"}
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid size={{ xs: 12 }}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "white",
                      borderRadius: 3,
                      textAlign: "center",
                    }}
                  >
                    <Typography color="text.secondary">
                      Không có mã giảm giá khả dụng
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CheckoutForm;
