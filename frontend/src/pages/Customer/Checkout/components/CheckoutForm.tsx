// src/pages/Customer/Checkout/components/CheckoutForm.tsx
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  Grid, // Dùng Grid2 để tránh lỗi "item does not exist"
  Button,
  Divider,
} from "@mui/material";
import type { Coupon } from "../types"; // Đảm bảo đường dẫn import types đúng

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
    py: 1.5,
    px: 2,
    fontSize: 14,
    fontFamily: "'Lexend', sans-serif",
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* 1. Thông tin giao hàng */}
      <Card sx={{ borderRadius: 3, boxShadow: "none", bgcolor: "#dbe9f3" }}>
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            mb={2}
            color="#2F4156"
            textAlign={"left"}
            sx={{ fontFamily: "'Lexend', sans-serif" }}
          >
            Thông tin giao hàng
          </Typography>

          {/* SỬA LẠI: Dùng Grid container spacing */}
          <Grid container spacing={2}>
            {/* Họ tên */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                fontWeight={600}
                mb={0.5}
                color="#546e7a"
                textAlign={"left"}
                fontSize={14}
              >
                Họ và tên <span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                fullWidth
                placeholder="Nhập họ tên người nhận"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={pillInputStyle}
              />
            </Grid>

            {/* Số điện thoại */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                fontWeight={600}
                mb={0.5}
                textAlign={"left"}
                color="#546e7a"
                fontSize={14}
              >
                Số điện thoại <span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                fullWidth
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={pillInputStyle}
              />
            </Grid>

            {/* Địa chỉ */}
            <Grid size={{ xs: 12 }}>
              <Typography
                fontWeight={600}
                textAlign={"left"}
                mb={0.5}
                color="#546e7a"
                fontSize={14}
              >
                Địa chỉ nhận hàng <span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                placeholder="Số nhà, tên đường, phường/xã..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                sx={{
                  ...pillInputStyle,
                  "& .MuiOutlinedInput-root": {
                    ...pillInputStyle["& .MuiOutlinedInput-root"],
                    borderRadius: "20px",
                  },
                }}
              />
            </Grid>

            {/* Ghi chú */}
            <Grid size={{ xs: 12 }}>
              <Typography
                fontWeight={600}
                textAlign={"left"}
                mb={0.5}
                color="#546e7a"
                fontSize={14}
              >
                Ghi chú đơn hàng
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                placeholder="Lời nhắn cho shop..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                sx={{
                  ...pillInputStyle,
                  "& .MuiOutlinedInput-root": {
                    ...pillInputStyle["& .MuiOutlinedInput-root"],
                    borderRadius: "20px",
                  },
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* 2. Danh sách Mã giảm giá */}
      <Card sx={{ borderRadius: 3, boxShadow: "none", bgcolor: "#f1f5f9" }}>
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            mb={2}
            textAlign={"left"}
            color="#2F4156"
            sx={{ fontFamily: "'Lexend', sans-serif" }}
          >
            Mã giảm giá khả dụng
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ maxHeight: 300, overflowY: "auto", pr: 1 }}>
            <Grid container spacing={2}>
              {availableCoupons && availableCoupons.length > 0 ? (
                availableCoupons.map((coupon) => (
                  <Grid size={{ xs: 12 }} key={coupon.promotionId}>
                    <Card
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 2,
                        borderRadius: 2,
                        border:
                          selectedCouponId === coupon.promotionId
                            ? "2px solid #2F4156"
                            : "1px solid #e0e0e0",
                        bgcolor: "white",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        "&:hover": { boxShadow: 2 },
                      }}
                      onClick={() => onSelectCoupon(coupon)}
                    >
                      <Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography
                            fontWeight={700}
                            textAlign={"left"}
                            color="#d32f2f"
                            sx={{ fontFamily: "'Lexend', sans-serif" }}
                          >
                            {coupon.code}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              bgcolor: "#ffebee",
                              color: "#c62828",
                              px: 1,
                              py: 0.2,
                              borderRadius: 1,
                              fontSize: 10,
                              fontWeight: 600,
                              textAlign: "left",
                            }}
                          >
                            {coupon.discountType === "percentage"
                              ? "Giảm %"
                              : "Giảm tiền"}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          mt={0.5}
                          textAlign={"left"}
                          fontWeight={500}
                          color="#37474f"
                        >
                          Giảm {/* FIX LỖI: Thêm || 0 */}
                          {coupon.discountType === "percentage"
                            ? `${coupon.discountValue || 0}%`
                            : `${(
                                coupon.discountValue || 0
                              ).toLocaleString()}đ`}
                        </Typography>
                        <Typography
                          variant="caption"
                          textAlign={"left"}
                          color="text.secondary"
                          display="block"
                        >
                          Đơn tối thiểu: {/* FIX LỖI: Thêm || 0 */}
                          {(coupon.minOrderValue || 0).toLocaleString()}đ
                        </Typography>
                      </Box>

                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-end"
                      >
                        <Button
                          variant="contained"
                          size="small"
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
                    <Typography color="text.secondary" textAlign={"left"}>
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
