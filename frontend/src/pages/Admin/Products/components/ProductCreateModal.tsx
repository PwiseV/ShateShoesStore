import React, { useState, useEffect, type ChangeEvent } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  Stack,
  Chip,
  Typography,
  Select,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import type {
  ProductFormData,
  NewColorInput,
  SizeOption,
  Colors,
} from "../types";
import { COLOR_OPTIONS, COLOR_MAP, COLOR_DISPLAY_MAP } from "../constants";
import {
  createProduct,
  addProductSize,
  addSizeColor,
} from "../../../../services/fakeAdminProductServices";
import { useToast } from "../utils";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ProductCreateModal: React.FC<Props> = ({ open, onClose, onSuccess }) => {
  const { showToast } = useToast();
  const [modalStep, setModalStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    productId: "",
    title: "",
    category: "Classic",
    description: "",
    avatar: "",
    tags: [],
  });
  const [sizes, setSizes] = useState<SizeOption[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [currentSizeIndex, setCurrentSizeIndex] = useState(0);

  // Inputs
  const [newSizeInput, setNewSizeInput] = useState("");
  const [newColorInput, setNewColorInput] = useState<NewColorInput>({
    color: "Hồng",
    price: "",
    stock: "",
    avatar: "",
  });
  const [colorPreviewUrl, setColorPreviewUrl] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      setModalStep(1);
      setFormData({
        productId: "",
        title: "",
        category: "Classic",
        description: "",
        avatar: "",
        tags: [],
      });
      setSizes([]);
      setFormErrors({});
    }
  }, [open]);

  // --- Handlers ---
  const handleFormChange = (field: string, value: any) =>
    setFormData((p) => ({ ...p, [field]: value }));

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = tagInput.trim();
      if (val && !formData.tags.includes(val)) {
        setFormData((p) => ({ ...p, tags: [...p.tags, val] }));
        setTagInput("");
      }
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) =>
        handleFormChange("avatar", e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAddSize = () => {
    if (!newSizeInput.trim()) return setFormErrors({ size: "Nhập kích cỡ" });
    const newSize: SizeOption = {
      sizeID: Date.now(),
      size: newSizeInput,
      colors: [],
    };
    setSizes([...sizes, newSize]);
    setCurrentSizeIndex(sizes.length);
    setNewSizeInput("");
    setFormErrors({});
  };

  const handleAddColor = () => {
    if (!newColorInput.price || !newColorInput.stock)
      return setFormErrors({ color: "Nhập giá và tồn kho" });
    const currentSize = sizes[currentSizeIndex];
    if (!currentSize) return;

    const newColor: Colors = {
      colorId: Date.now(),
      color: COLOR_MAP[newColorInput.color] || newColorInput.color,
      price: Number(newColorInput.price),
      stock: Number(newColorInput.stock),
      avatar: newColorInput.avatar,
    };
    const updatedSizes = [...sizes];
    updatedSizes[currentSizeIndex].colors.push(newColor);
    setSizes(updatedSizes);
    setNewColorInput({ color: "Hồng", price: "", stock: "", avatar: "" });
    setColorPreviewUrl("");
  };

  const handleSubmit = async () => {
    if (sizes.length === 0 || sizes.some((s) => s.colors.length === 0))
      return setFormErrors({ submit: "Cần ít nhất 1 size và 1 màu" });
    setLoading(true);
    try {
      const newProduct = await createProduct({ ...formData, sizes: [] });
      for (const size of sizes) {
        const createdSize = await addProductSize(newProduct.id, {
          size: size.size,
          colors: [],
        });
        for (const color of size.colors) {
          await addSizeColor(createdSize.sizeID, { ...color });
        }
      }
      showToast("Tạo thành công", "success");
      onSuccess();
      onClose();
    } catch (e) {
      showToast("Lỗi tạo sản phẩm", "error");
    } finally {
      setLoading(false);
    }
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.productId) errs.productId = "Bắt buộc";
    if (!formData.title) errs.title = "Bắt buộc";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>
        {modalStep === 1
          ? "Thêm SP Mới"
          : modalStep === 2
          ? "Thêm Size"
          : "Thêm Màu"}
      </DialogTitle>
      <DialogContent dividers>
        {modalStep === 1 && (
          <Stack spacing={2}>
            <TextField
              label="Mã SP"
              size="small"
              value={formData.productId}
              onChange={(e) => handleFormChange("productId", e.target.value)}
              error={!!formErrors.productId}
            />
            <TextField
              label="Tên SP"
              size="small"
              value={formData.title}
              onChange={(e) => handleFormChange("title", e.target.value)}
              error={!!formErrors.title}
            />
            <TextField
              select
              label="Category"
              size="small"
              value={formData.category}
              onChange={(e) => handleFormChange("category", e.target.value)}
            >
              <MenuItem value="Classic">Classic</MenuItem>
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Sale">Sale</MenuItem>
            </TextField>
            <TextField
              label="Tags (Enter)"
              size="small"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
            />
            <Box sx={{ display: "flex", gap: 1 }}>
              {formData.tags.map((t) => (
                <Chip
                  key={t}
                  label={t}
                  onDelete={() =>
                    setFormData((p) => ({
                      ...p,
                      tags: p.tags.filter((x) => x !== t),
                    }))
                  }
                  size="small"
                />
              ))}
            </Box>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
            >
              Upload Ảnh{" "}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>
            {formData.avatar && (
              <img
                src={formData.avatar}
                alt="Preview"
                style={{ height: 80, objectFit: "contain" }}
              />
            )}
          </Stack>
        )}
        {modalStep === 2 && (
          <Stack spacing={2}>
            {sizes.map((s, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  bgcolor: "#f5f5f5",
                  p: 1,
                  borderRadius: 1,
                }}
              >
                <Typography>{s.size}</Typography>
                <Button
                  size="small"
                  color="error"
                  onClick={() => setSizes(sizes.filter((_, i) => i !== idx))}
                >
                  Xóa
                </Button>
              </Box>
            ))}
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                label="Size mới"
                fullWidth
                size="small"
                value={newSizeInput}
                onChange={(e) => setNewSizeInput(e.target.value)}
              />
              <Button variant="contained" onClick={handleAddSize}>
                Thêm
              </Button>
            </Box>
          </Stack>
        )}
        {modalStep === 3 && (
          <Stack spacing={2}>
            <Typography variant="subtitle2">
              Chọn Size:{" "}
              <span style={{ color: "#567C8D" }}>
                {sizes[currentSizeIndex]?.size}
              </span>
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {sizes.map((s, idx) => (
                <Button
                  key={idx}
                  variant={currentSizeIndex === idx ? "contained" : "outlined"}
                  onClick={() => setCurrentSizeIndex(idx)}
                  size="small"
                >
                  {s.size}
                </Button>
              ))}
            </Box>
            {sizes[currentSizeIndex]?.colors.map((c, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  bgcolor: "#f5f5f5",
                  p: 1,
                  borderRadius: 1,
                }}
              >
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    bgcolor: COLOR_DISPLAY_MAP[c.color] || "#ccc",
                  }}
                />
                <Typography flex={1}>
                  {c.color} - {c.price.toLocaleString()}đ (SL: {c.stock})
                </Typography>
                <Button
                  size="small"
                  color="error"
                  onClick={() => {
                    const newSizes = [...sizes];
                    newSizes[currentSizeIndex].colors = newSizes[
                      currentSizeIndex
                    ].colors.filter((_, i) => i !== idx);
                    setSizes(newSizes);
                  }}
                >
                  Xóa
                </Button>
              </Box>
            ))}
            <Box sx={{ border: "1px dashed #ccc", p: 2, borderRadius: 1 }}>
              <Typography variant="caption" fontWeight={600}>
                Thêm màu mới
              </Typography>
              <Stack spacing={1.5} mt={1}>
                <Select
                  size="small"
                  value={newColorInput.color}
                  onChange={(e) =>
                    setNewColorInput({
                      ...newColorInput,
                      color: e.target.value,
                    })
                  }
                >
                  {COLOR_OPTIONS.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <TextField
                    label="Giá"
                    type="number"
                    size="small"
                    value={newColorInput.price}
                    onChange={(e) =>
                      setNewColorInput({
                        ...newColorInput,
                        price: e.target.value,
                      })
                    }
                  />
                  <TextField
                    label="Kho"
                    type="number"
                    size="small"
                    value={newColorInput.stock}
                    onChange={(e) =>
                      setNewColorInput({
                        ...newColorInput,
                        stock: e.target.value,
                      })
                    }
                  />
                </Box>
                <Button component="label" size="small" variant="outlined">
                  Ảnh màu {colorPreviewUrl && "(Đã chọn)"}{" "}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const r = new FileReader();
                        r.onload = (evt) => {
                          setColorPreviewUrl(evt.target?.result as string);
                          setNewColorInput({
                            ...newColorInput,
                            avatar: evt.target?.result as string,
                          });
                        };
                        r.readAsDataURL(file);
                      }
                    }}
                  />
                </Button>
                <Button
                  variant="contained"
                  onClick={handleAddColor}
                  size="small"
                >
                  Thêm Màu Này
                </Button>
              </Stack>
            </Box>
          </Stack>
        )}
        {formErrors.submit && (
          <Typography color="error" mt={2}>
            {formErrors.submit}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={
            modalStep === 1 ? onClose : () => setModalStep(modalStep - 1)
          }
        >
          Quay lại
        </Button>
        {modalStep < 3 && (
          <Button
            variant="contained"
            onClick={() => {
              if (modalStep === 1 ? validateStep1() : sizes.length > 0)
                setModalStep(modalStep + 1);
            }}
          >
            Tiếp tục
          </Button>
        )}
        {modalStep === 3 && (
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            Hoàn tất
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ProductCreateModal;
