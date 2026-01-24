import React, { useState } from "react";
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
  onAdd: (newAddress: AddressFormState) => void; // Hàm trả dữ liệu về cha
}

const AddAddressModal = ({ open, onClose, onAdd }: Props) => {
  // State khởi tạo rỗng
  const [formData, setFormData] = useState<AddressFormState>({
    street: "",
    ward: "",
    district: "",
    city: "",
    country: "",
    isDefault: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Gửi dữ liệu ra ngoài cho ProfileInfo xử lý
    onAdd(formData);

    // Reset form và đóng
    setFormData({
      street: "",
      ward: "",
      district: "",
      city: "",
      country: "",
      isDefault: false,
    });
    onClose();
  };

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
        sx: {
          borderRadius: "20px",
          p: 2,
        },
      }}
    >
      <DialogContent sx={{ p: 3 }}>
        {/* TIÊU ĐỀ: THÊM ĐỊA CHỈ */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: "#2C3E50",
            fontFamily: '"Lexend", sans-serif',
            mb: 4,
          }}
        >
          Thêm địa chỉ
        </Typography>

        <Stack spacing={2.5}>
          {/* CÁC Ô INPUT (Trống) */}
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

          {/* SWITCH MẶC ĐỊNH */}
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

        {/* BUTTONS: THÊM & TRỞ VỀ */}
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
            Thêm
          </Button>

          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              color: "#333",
              borderColor: "#ccc",
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "8px",
              px: 4,
              py: 1,
              minWidth: "120px",
              fontFamily: '"Lexend", sans-serif',
              "&:hover": { borderColor: "#999", bgcolor: "transparent" },
            }}
          >
            Trở về
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressModal;
