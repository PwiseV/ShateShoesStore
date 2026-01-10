import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import type { Colors } from "../types";
import {
  updateProductColor,
  deleteProductColor,
} from "../../../../services/fakeAdminProductServices";
import { useToast } from "../utils";

interface Props {
  open: boolean;
  onClose: () => void;
  colorData: Colors | null;
  onSuccess: () => void; // Refresh parent
}

const ColorEditModal: React.FC<Props> = ({
  open,
  onClose,
  colorData,
  onSuccess,
}) => {
  const { showToast } = useToast();
  const [editingColor, setEditingColor] = useState<Colors | null>(null);

  useEffect(() => {
    setEditingColor(colorData);
  }, [colorData]);

  const handleSave = async () => {
    if (!editingColor) return;
    try {
      await updateProductColor(editingColor.colorId, {
        price: editingColor.price,
        stock: editingColor.stock,
        avatar: editingColor.avatar,
      });
      showToast("Đã lưu chi tiết màu", "success");
      onSuccess();
      onClose();
    } catch (e) {
      showToast("Lỗi lưu màu", "error");
    }
  };

  const handleDelete = async () => {
    if (!editingColor || !window.confirm("Xóa màu này?")) return;
    try {
      await deleteProductColor(editingColor.colorId);
      showToast("Đã xóa màu", "success");
      onSuccess();
      onClose();
    } catch (e) {
      showToast("Lỗi xóa màu", "error");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingColor) {
      const reader = new FileReader();
      reader.onload = (evt) =>
        setEditingColor({
          ...editingColor,
          avatar: evt.target?.result as string,
        });
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>Chỉnh sửa màu</DialogTitle>
      <DialogContent dividers>
        {editingColor && (
          <Stack spacing={2}>
            <Typography variant="subtitle2">
              Màu: <b>{editingColor.color}</b>
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  border: "1px dashed #ccc",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  bgcolor: "#f9f9f9",
                }}
              >
                {editingColor.avatar ? (
                  <img
                    src={editingColor.avatar}
                    alt="Color"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: "0.6rem" }}
                  >
                    No Img
                  </Typography>
                )}
              </Box>
              <Button
                component="label"
                variant="outlined"
                size="small"
                sx={{ textTransform: "none" }}
              >
                Thay đổi hình{" "}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
            </Box>
            <TextField
              label="Giá"
              type="number"
              fullWidth
              size="small"
              value={editingColor.price}
              onChange={(e) =>
                setEditingColor({
                  ...editingColor,
                  price: Number(e.target.value),
                })
              }
            />
            <TextField
              label="Tồn kho"
              type="number"
              fullWidth
              size="small"
              value={editingColor.stock}
              onChange={(e) =>
                setEditingColor({
                  ...editingColor,
                  stock: Number(e.target.value),
                })
              }
            />
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleDelete}>
          Xóa
        </Button>
        <Button onClick={onClose}>Hủy</Button>
        <Button variant="contained" onClick={handleSave}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ColorEditModal;
