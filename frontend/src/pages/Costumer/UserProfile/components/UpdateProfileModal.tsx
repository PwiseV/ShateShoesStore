import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export interface ProfileData {
  username: string;
  name: string;
  phone: string;
  avatar: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  initialData: ProfileData;
  // [MỚI] Hàm callback khi cập nhật thành công
  onUpdate: (data: ProfileData) => void;
}

const UpdateProfileModal = ({
  open,
  onClose,
  initialData,
  onUpdate,
}: Props) => {
  const [formData, setFormData] = useState<ProfileData>(initialData);

  useEffect(() => {
    if (open) {
      setFormData(initialData);
    }
  }, [open, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // [MỚI] Gọi hàm onUpdate thay vì chỉ console.log
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
        sx: {
          borderRadius: "20px",
          p: 2,
        },
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
          Cập nhật thông tin
        </Typography>

        <Stack spacing={3}>
          {/* USERNAME */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 1,
            }}
          >
            <Typography sx={labelStyle}>Username</Typography>
            <TextField
              fullWidth
              name="username"
              value={formData.username}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "6px" } }}
            />
          </Box>

          {/* NAME */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 1,
            }}
          >
            <Typography sx={labelStyle}>Name</Typography>
            <TextField
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "6px" } }}
            />
          </Box>

          {/* PHONE NUMBER */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 1,
            }}
          >
            <Typography sx={labelStyle}>Phone number</Typography>
            <TextField
              fullWidth
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "6px" } }}
            />
          </Box>

          {/* ẢNH ĐẠI DIỆN */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 1,
            }}
          >
            <Typography sx={labelStyle}>Ảnh đại diện</Typography>
            <Box sx={{ flex: 1 }}>
              <Button
                component="label"
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "#C4C4C4",
                  color: "black",
                  textTransform: "none",
                  fontWeight: 500,
                  borderRadius: "8px",
                  py: 1.2,
                  boxShadow: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  fontFamily: '"Lexend", sans-serif',
                  "&:hover": { bgcolor: "#b0b0b0", boxShadow: "none" },
                }}
              >
                <CloudUploadIcon fontSize="small" />
                Tải ảnh lên
                <input type="file" hidden accept=".jpg, .jpeg, .png" />
              </Button>
            </Box>
          </Box>
        </Stack>

        {/* CÁC NÚT HÀNH ĐỘNG */}
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

export default UpdateProfileModal;
