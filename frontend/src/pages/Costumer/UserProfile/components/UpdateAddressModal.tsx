import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  TextField,
  Button,
  Stack,
  Switch,
} from "@mui/material";

export interface AddressFormState {
  street: string;
  ward: string;
  district: string;
  city: string;
  country: string;
  isDefault: boolean;
}

interface Props {
  open: boolean;
  onClose: () => void;
  addressString: string;
  isDefault: boolean;
  onDelete: () => void;
  // [MỚI] Hàm callback khi cập nhật thành công
  onUpdate: (data: AddressFormState) => void;
}

const UpdateAddressModal = ({
  open,
  onClose,
  addressString,
  isDefault,
  onDelete,
  onUpdate,
}: Props) => {
  const [formData, setFormData] = useState<AddressFormState>({
    street: "",
    ward: "",
    district: "",
    city: "",
    country: "",
    isDefault: false,
  });

  useEffect(() => {
    if (open) {
      const parts = addressString
        ? addressString.split(",").map((part) => part.trim())
        : [];
      setFormData({
        street: parts[0] || "",
        ward: parts[1] || "",
        district: parts[2] || "",
        city: parts[3] || "",
        country: parts[4] || "",
        isDefault: isDefault,
      });
    }
  }, [open, addressString, isDefault]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // [MỚI] Gọi hàm onUpdate
    onUpdate(formData);
    onClose();
  };

  // ... (Phần Style và Render giữ nguyên không đổi)
  const labelStyle = {
    fontWeight: 400,
    fontSize: "1rem",
    color: "#000",
    fontFamily: '"Lexend", sans-serif',
    minWidth: { xs: "100%", sm: "140px" },
    mt: 1,
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: "20px", p: 2 },
      }}
    >
      <DialogContent sx={{ p: 3 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: "#2C3E50",
            fontFamily: '"Lexend", sans-serif',
            mb: 4,
          }}
        >
          Cập nhật địa chỉ
        </Typography>

        <Stack spacing={2.5}>
          {/* CÁC Ô INPUT (Giữ nguyên) */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 1,
            }}
          >
            <Typography sx={labelStyle}>Đường</Typography>
            <TextField
              fullWidth
              name="street"
              value={formData.street}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "6px" } }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 1,
            }}
          >
            <Typography sx={labelStyle}>Phường</Typography>
            <TextField
              fullWidth
              name="ward"
              value={formData.ward}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "6px" } }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 1,
            }}
          >
            <Typography sx={labelStyle}>Quận</Typography>
            <TextField
              fullWidth
              name="district"
              value={formData.district}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "6px" } }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 1,
            }}
          >
            <Typography sx={labelStyle}>Thành Phố</Typography>
            <TextField
              fullWidth
              name="city"
              value={formData.city}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "6px" } }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 1,
            }}
          >
            <Typography sx={labelStyle}>Quốc gia</Typography>
            <TextField
              fullWidth
              name="country"
              value={formData.country}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "6px" } }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <Typography sx={{ ...labelStyle, mt: 0 }}>
              Địa chỉ mặc định
            </Typography>
            <Switch
              checked={formData.isDefault}
              onChange={(e) =>
                setFormData({ ...formData, isDefault: e.target.checked })
              }
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#2C3E50",
                  "& + .MuiSwitch-track": {
                    backgroundColor: "#2C3E50",
                    opacity: 0.5,
                  },
                },
              }}
            />
          </Box>
        </Stack>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 5 }}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              bgcolor: "#567C8D",
              color: "white",
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "8px",
              px: 4,
              py: 1,
              minWidth: "120px",
              boxShadow: "none",
              fontFamily: '"Lexend", sans-serif',
              "&:hover": { bgcolor: "#456372", boxShadow: "none" },
            }}
          >
            Xác nhận
          </Button>

          <Button
            onClick={onDelete}
            variant="outlined"
            sx={{
              color: "#FF4D4F",
              borderColor: "#FF4D4F",
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "8px",
              px: 4,
              py: 1,
              minWidth: "120px",
              fontFamily: '"Lexend", sans-serif',
              "&:hover": {
                borderColor: "#d9363e",
                bgcolor: "rgba(255, 77, 79, 0.04)",
              },
            }}
          >
            Xóa
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAddressModal;
