import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography,
  Box,
  TextField,
  IconButton,
  Avatar,
  InputAdornment,
  Divider,
} from "@mui/material";
import {
  Close as CloseIcon,
  CloudUpload as UploadIcon,
  DeleteOutline as DeleteIcon,
  AttachMoney as MoneyIcon,
  Inventory2 as StockIcon,
  Palette as PaletteIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import type { Colors } from "../types";
import {
  updateProductColor,
  addProductColor,
  deleteProductColor,
} from "../../../../services/adminProductServices";
import { useToast } from "../../../../context/useToast";

interface Props {
  open: boolean;
  onClose: () => void;
  colorData: Colors | null;
  onSuccess: () => void;
  size: string;
  productId: number;
}

const PRIMARY_COLOR = "#567C8D";

const ColorEditModal: React.FC<Props> = ({
  open,
  onClose,
  colorData,
  onSuccess,
  size,
  productId,
}) => {
  const { showToast } = useToast();

  const [formData, setFormData] = useState<Colors>({
    color: "",
    price: 0,
    stock: 0,
    avatar: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (open) {
      if (colorData) {
        setFormData(colorData);
        setPreviewUrl(colorData.avatar || "");
      } else {
        setFormData({ color: "", price: 0, stock: 0, avatar: "" });
        setPreviewUrl("");
      }
      setSelectedFile(null);
    }
  }, [colorData, open]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!formData.color.trim()) {
      showToast("Tên màu không được để trống", "error");
      return;
    }

    try {
      const data = new FormData();
      data.append("size", size);
      data.append("color", formData.color.trim());
      data.append("price", String(formData.price));
      data.append("stock", String(formData.stock));

      if (selectedFile) data.append("avatar", selectedFile);
      else if (formData.avatar) data.append("avatar", formData.avatar);

      if (colorData) {
        await updateProductColor(productId, data);
        showToast("Cập nhật thành công", "success");
      } else {
        await addProductColor(productId, data);
        showToast("Thêm màu mới thành công", "success");
      }
      onClose();
      onSuccess();
      
    } catch (error: any) {
      showToast(error.response?.data?.message || "Lỗi hệ thống", "error");
    }
  };

  const handleDelete = async () => {
    if (!colorData) return;
    if (!window.confirm("Bạn có chắc muốn xóa biến thể màu này?")) return;

    try {
      await deleteProductColor(productId, {
        size,
        color: colorData.color,
      });
      showToast("Xóa màu thành công", "success");
      onSuccess();
    } catch (error: any) {
      showToast(error.response?.data?.message || "Lỗi hệ thống", "error");
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="xs" 
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }
      }}
    >
      {/* Header tinh tế với tone màu chủ đạo */}
      <Box sx={{ 
        p: 2.5, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        bgcolor: `${PRIMARY_COLOR}08`, // 8% opacity của màu chủ đạo
        borderBottom: '1px solid #eceff1'
      }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#37474f' }}>
            {colorData ? "Chỉnh sửa màu sắc" : `Thêm màu (Size ${size})`}
          </Typography>
        </Stack>
        <IconButton onClick={onClose} size="small" sx={{ '&:hover': { color: PRIMARY_COLOR } }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 3 }}>
        <Stack spacing={3} sx={{ mt: 1 }}>
          
          {/* Khu vực Upload Ảnh */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={previewUrl}
                variant="rounded"
                sx={{ 
                  width: 130, 
                  height: 130, 
                  borderRadius: 4, 
                  bgcolor: '#f8fafb',
                  border: `2px dashed ${PRIMARY_COLOR}40`,
                  objectFit: 'cover',
                  transition: '0.3s',
                  '&:hover': { borderColor: PRIMARY_COLOR }
                }}
              >
                {!previewUrl && <PaletteIcon sx={{ fontSize: 40, color: '#cfd8dc' }} />}
              </Avatar>
              <IconButton
                component="label"
                sx={{
                  position: 'absolute', bottom: -8, right: -8,
                  bgcolor: PRIMARY_COLOR, color: "white",
                  boxShadow: '0 4px 10px rgba(86, 124, 141, 0.4)',
                  '&:hover': { bgcolor: '#456371' }
                }}
                size="small"
              >
                <UploadIcon fontSize="small" />
                <input type="file" hidden accept="image/*" onChange={handleFileChange} />
              </IconButton>
            </Box>
            <Typography variant="caption" sx={{ color: '#90a4ae', fontWeight: 500 }}>
              Hình ảnh minh họa cho màu sắc
            </Typography>
          </Box>

          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />

          {/* Form nhập liệu */}
          <Stack spacing={2.5}>
            {!colorData ? (
              <TextField
                label="Tên màu sắc"
                placeholder="VD: white, black, blue..."
                fullWidth size="small"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: PRIMARY_COLOR } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PaletteIcon fontSize="small" sx={{ color: PRIMARY_COLOR }} />
                    </InputAdornment>
                  ),
                }}
              />
            ) : (
               <Box sx={{ p: 1.5, bgcolor: '#f1f5f7', borderRadius: 2, border: `1px solid ${PRIMARY_COLOR}20` }}>
                  <Typography variant="caption" sx={{ color: PRIMARY_COLOR, fontWeight: 700, display: 'block', mb: 0.5 }}>MÀU SẮC ĐANG CHỌN</Typography>
                  <Typography variant="body1" fontWeight={600} color="text.primary">{formData.color}</Typography>
               </Box>
            )}

            <TextField
              label="Giá bán"
              type="number"
              fullWidth size="small"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: PRIMARY_COLOR } }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><MoneyIcon fontSize="small" sx={{ color: PRIMARY_COLOR }} /></InputAdornment>,
                endAdornment: <InputAdornment position="end" sx={{ '& p': { fontSize: 12, fontWeight: 600 } }}>VNĐ</InputAdornment>,
              }}
            />

            <TextField
              label="Số lượng kho"
              type="number"
              fullWidth size="small"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
              sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: PRIMARY_COLOR } }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><StockIcon fontSize="small" sx={{ color: PRIMARY_COLOR }} /></InputAdornment>,
                endAdornment: <InputAdornment position="end" sx={{ '& p': { fontSize: 12, fontWeight: 600 } }}>Cái</InputAdornment>,
              }}
            />
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3, bgcolor: '#fcfdfe', justifyContent: 'space-between', borderTop: '1px solid #f1f5f7' }}>
        <Box>
          {colorData && (
            <Button 
              variant="text" 
              color="error" 
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              sx={{ fontWeight: 600, textTransform: 'none', '&:hover': { bgcolor: '#fff1f0' } }}
            >
              Xóa biến thể
            </Button>
          )}
        </Box>
        
        <Stack direction="row" spacing={1.5}>
          <Button 
            onClick={onClose} 
            variant="outlined" 
            sx={{ 
              borderRadius: 2, 
              textTransform: 'none', 
              color: '#546e7a', 
              borderColor: '#cfd8dc',
              fontWeight: 600,
              '&:hover': { borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR }
            }}
          >
            Hủy bỏ
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}

            sx={{ 
              px: 3.5, 
              borderRadius: 2, 
              textTransform: 'none',
              fontWeight: 700,
              bgcolor: PRIMARY_COLOR,
              boxShadow: `0 4px 12px ${PRIMARY_COLOR}40`,
              '&:hover': { 
                bgcolor: '#456371',
                boxShadow: `0 6px 16px ${PRIMARY_COLOR}50`,
              }
            }}
          >
            {colorData ? "Lưu thay đổi" : "Xác nhận tạo"}
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default ColorEditModal;