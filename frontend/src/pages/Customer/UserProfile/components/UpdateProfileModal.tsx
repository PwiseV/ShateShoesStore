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

// [SỬA] Interface khớp với Backend
export interface ProfileData {
  username: string;
  displayName: string; // Đổi name -> displayName
  phone: string;
  avatar: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  initialData: ProfileData;
  onUpdate: (data: ProfileData) => void;
}

const UpdateProfileModal = ({
  open,
  onClose,
  initialData,
  onUpdate,
}: Props) => {
  const [formData, setFormData] = useState<ProfileData>(initialData);

  // [MỚI] State lưu file ảnh tạm thời để preview hoặc gửi đi
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string>("");

  useEffect(() => {
    if (open) {
      setFormData(initialData);
      setPreviewAvatar(initialData.avatar);
      setSelectedFile(null);
    }
  }, [open, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewAvatar(URL.createObjectURL(file)); // Preview ảnh mới
    }
  };

  const handleSubmit = () => {
    // Gửi data kèm file (nếu có) ra ngoài
    onUpdate({
      ...formData,
      avatar: selectedFile ? (selectedFile as any) : formData.avatar,
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
      PaperProps={{ sx: { borderRadius: "20px", p: 2 } }}
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

          {/* DISPLAY NAME (Sửa name -> displayName) */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 1,
            }}
          >
            <Typography sx={labelStyle}>Tên hiển thị</Typography>
            <TextField
              fullWidth
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "6px" } }}
            />
          </Box>

          {/* PHONE */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 1,
            }}
          >
            <Typography sx={labelStyle}>Số điện thoại</Typography>
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

          {/* AVATAR */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 1,
            }}
          >
            <Typography sx={labelStyle}>Ảnh đại diện</Typography>
            <Box
              sx={{ flex: 1, display: "flex", gap: 2, alignItems: "center" }}
            >
              {/* Preview ảnh nhỏ */}
              <Box
                component="img"
                src={previewAvatar}
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <Button
                component="label"
                variant="contained"
                sx={{
                  bgcolor: "#C4C4C4",
                  color: "black",
                  textTransform: "none",
                  boxShadow: "none",
                  "&:hover": { bgcolor: "#b0b0b0" },
                }}
              >
                <CloudUploadIcon fontSize="small" sx={{ mr: 1 }} /> Tải ảnh lên
                <input
                  type="file"
                  hidden
                  accept=".jpg, .jpeg, .png, .webp"
                  onChange={handleFileChange}
                />
              </Button>
            </Box>
          </Box>
        </Stack>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 5 }}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              bgcolor: "#567C8D",
              color: "white",
              borderRadius: "8px",
              px: 4,
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
              borderRadius: "8px",
              px: 4,
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
