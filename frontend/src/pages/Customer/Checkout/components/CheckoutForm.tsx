import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import type { ShippingInfo } from "../types";

interface Props {
  shippingInfo: ShippingInfo;
  onChange: (field: keyof ShippingInfo, value: string) => void;
  errors?: Partial<Record<keyof ShippingInfo, string>>;
}

/**
 * Style cho pill input + error border
 */
const inputStyle = {
  bgcolor: "#fff",
  borderRadius: "999px",
  "& .MuiOutlinedInput-notchedOutline": {
    border: "1px solid transparent",
  },
  "&.Mui-error .MuiOutlinedInput-notchedOutline": {
    borderColor: "#d32f2f",
  },
};

const errorTextStyle = {
  fontSize: 12,
  color: "#d32f2f",
  mt: 0.5,
  textAlign: "left",
};

const CheckoutForm = ({ shippingInfo, onChange, errors }: Props) => {
  return (
    <Card sx={{ bgcolor: "#e0e0e0", borderRadius: 4, boxShadow: "none" }}>
      <CardContent sx={{ p: 4 }}>
        {/* Title */}
        <Typography
          fontWeight={700}
          fontSize={16}
          textAlign="left"
          color="#2F4156"
          mb={3}
        >
          Thông tin người nhận hàng
        </Typography>

        {/* ===== Name + Phone ===== */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2,
          }}
        >
          {/* ===== Full name ===== */}
          <Box>
            <Typography fontSize={13} mb={0.5} textAlign="left">
              Họ và tên
            </Typography>

            <TextField
              fullWidth
              value={shippingInfo.fullName}
              onChange={(e) => onChange("fullName", e.target.value)}
              error={!!errors?.fullName}
              sx={inputStyle}
            />

            {errors?.fullName && (
              <Typography sx={errorTextStyle}>
                {errors.fullName}
              </Typography>
            )}
          </Box>

          {/* ===== Phone ===== */}
          <Box>
            <Typography fontSize={13} mb={0.5} textAlign="left">
              Số điện thoại
            </Typography>

            <TextField
              fullWidth
              value={shippingInfo.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              error={!!errors?.phone}
              sx={inputStyle}
            />

            {errors?.phone && (
              <Typography sx={errorTextStyle}>
                {errors.phone}
              </Typography>
            )}
          </Box>
        </Box>

        {/* ===== Address ===== */}
        <Box mt={2}>
          <Typography fontSize={13} mb={0.5} textAlign="left">
            Địa chỉ
          </Typography>

          <TextField
            fullWidth
            value={shippingInfo.address}
            onChange={(e) => onChange("address", e.target.value)}
            error={!!errors?.address}
            sx={inputStyle}
          />

          {errors?.address && (
            <Typography sx={errorTextStyle}>
              {errors.address}
            </Typography>
          )}
        </Box>

        {/* ===== Note (không validate) ===== */}
        <Box mt={2}>
          <Typography fontSize={13} mb={0.5} textAlign="left">
            Ghi chú
          </Typography>

          <TextField
            fullWidth
            multiline
            minRows={4}
            value={shippingInfo.note}
            onChange={(e) => onChange("note", e.target.value)}
            sx={{
              bgcolor: "#fff",
              borderRadius: 3,
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CheckoutForm;
