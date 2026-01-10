import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Box,
  TextField,
  MenuItem,
  Divider,
  Typography,
  IconButton,
  Chip,
  Select,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type {
  Product,
  ProductFormData,
  SizeOption,
  Colors,
  NewColorInput,
} from "../types";
import {
  updateProduct,
  addProductSize,
  addSizeColor,
  deleteProductSize,
  updateProductColor,
} from "../../../../services/fakeAdminProductServices";
import { COLOR_OPTIONS } from "../constants";
import { useToast } from "../utils";

interface Props {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  onSuccess: () => void;
  onEditColor: (sIdx: number, cIdx: number, size: SizeOption) => void;
}

const ProductEditModal: React.FC<Props> = ({
  open,
  onClose,
  product,
  onSuccess,
  onEditColor,
}) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    productId: "",
    title: "",
    category: "",
    description: "",
    avatar: "",
    tags: [],
  });
  const [sizes, setSizes] = useState<SizeOption[]>([]);
  const [tagInput, setTagInput] = useState("");

  // Add Variant States
  const [newSizeInput, setNewSizeInput] = useState("");
  const [currentSizeIndex, setCurrentSizeIndex] = useState(0);
  const [newColorInput, setNewColorInput] = useState<NewColorInput>({
    color: "Hồng",
    price: "",
    stock: "",
    avatar: "",
  });

  useEffect(() => {
    if (product && open) {
      setFormData({
        productId: product.productId,
        title: product.title,
        category: product.category,
        description: product.description,
        avatar: product.avatar,
        tags: product.tags || [],
      });
      setSizes(JSON.parse(JSON.stringify(product.sizes))); // Deep copy
    }
  }, [product, open]);

  // Need to expose sizes update to parent if ColorEditModal modifies it?
  // Actually simpler: when ColorEditModal saves, it updates backend, then we refresh this modal or parent.
  // But here we are passing sizes down. Let's rely on parent refresh.

  const handleSave = async () => {
    if (!product) return;
    setLoading(true);
    try {
      await updateProduct(product.id, formData);

      // Handle new sizes/colors added in Edit Mode
      // Note: This logic duplicates Products.tsx a bit but keeps modal self-contained
      const originalSizes = product.sizes;
      for (const s of sizes) {
        const existingSize = originalSizes.find((os) => os.sizeID === s.sizeID);
        if (!existingSize) {
          const newSize = await addProductSize(product.id, {
            size: s.size,
            colors: [],
          });
          for (const c of s.colors) await addSizeColor(newSize.sizeID, c);
        } else {
          for (const c of s.colors) {
            const existingColor = existingSize.colors.find(
              (oc) => oc.colorId === c.colorId
            );
            if (!existingColor) await addSizeColor(existingSize.sizeID, c);
            // Update logic is handled in ColorEditModal separately or can be here
          }
        }
      }
      showToast("Cập nhật thành công", "success");
      onSuccess();
      onClose();
    } catch (e) {
      showToast("Lỗi cập nhật", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSize = async (idx: number) => {
    const size = sizes[idx];
    if (!window.confirm("Xóa size này?")) return;
    // Check if it exists in DB (real ID vs temp ID)
    // For fake service, all have IDs.
    // If it is a newly added size not saved yet (temp), just remove from state.
    // But here we loaded from DB.
    try {
      await deleteProductSize(size.sizeID);
      setSizes(sizes.filter((_, i) => i !== idx));
      showToast("Đã xóa size", "success");
      // We should also trigger a background refresh in parent if needed
    } catch (e) {
      showToast("Lỗi xóa size", "error");
    }
  };

  const handleAddSize = () => {
    if (!newSizeInput) return;
    setSizes([
      ...sizes,
      { sizeID: Date.now(), size: newSizeInput, colors: [] },
    ]);
    setNewSizeInput("");
  };

  const handleAddColor = () => {
    if (!newColorInput.price) return;
    const newSizes = [...sizes];
    newSizes[currentSizeIndex].colors.push({
      colorId: Date.now(),
      color: newColorInput.color, // Map logic should be applied if needed
      price: Number(newColorInput.price),
      stock: Number(newColorInput.stock),
      avatar: newColorInput.avatar,
    });
    setSizes(newSizes);
    setNewColorInput({ color: "Hồng", price: "", stock: "", avatar: "" });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, color: "#2C3E50" }}>
        Chỉnh sửa sản phẩm
      </DialogTitle>
      <DialogContent dividers sx={{ pt: 2 }}>
        <Stack spacing={3}>
          {/* Info Section */}
          <Box>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              Thông tin cơ bản
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Mã SP"
                size="small"
                value={formData.productId}
                onChange={(e) =>
                  setFormData({ ...formData, productId: e.target.value })
                }
              />
              <TextField
                label="Tên SP"
                size="small"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <TextField
                select
                label="Category"
                size="small"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <MenuItem value="Classic">Classic</MenuItem>
                <MenuItem value="New">New</MenuItem>
                <MenuItem value="Sale">Sale</MenuItem>
              </TextField>
              <Box>
                <TextField
                  label="Tags"
                  size="small"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && tagInput) {
                      setFormData({
                        ...formData,
                        tags: [...formData.tags, tagInput],
                      });
                      setTagInput("");
                    }
                  }}
                />
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                  {formData.tags.map((t) => (
                    <Chip
                      key={t}
                      label={t}
                      onDelete={() =>
                        setFormData({
                          ...formData,
                          tags: formData.tags.filter((x) => x !== t),
                        })
                      }
                      size="small"
                    />
                  ))}
                </Box>
              </Box>
            </Stack>
          </Box>
          <Divider />
          {/* Variant Section */}
          <Box>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              Biến thể
            </Typography>
            {sizes.map((s, idx) => (
              <Box
                key={idx}
                sx={{
                  border: "1px solid #eee",
                  p: 1.5,
                  borderRadius: 2,
                  mb: 1,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography fontWeight="bold">Size: {s.size}</Typography>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDeleteSize(idx)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
                  {s.colors.map((c, cIdx) => (
                    <Chip
                      key={cIdx}
                      label={`${c.color} (${c.stock})`}
                      size="small"
                      onClick={() => onEditColor(idx, cIdx, s)}
                      sx={{ cursor: "pointer" }}
                    />
                  ))}
                </Box>
              </Box>
            ))}

            {/* Add Variant UI */}
            <Box sx={{ mt: 2, p: 2, bgcolor: "#f9f9f9", borderRadius: 2 }}>
              <Typography variant="caption" fontWeight="bold">
                Thêm Nhanh
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <TextField
                  label="Size mới"
                  size="small"
                  value={newSizeInput}
                  onChange={(e) => setNewSizeInput(e.target.value)}
                />
                <Button variant="outlined" onClick={handleAddSize}>
                  Add
                </Button>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", gap: 1 }}>
                {sizes.map((s, idx) => (
                  <Button
                    key={idx}
                    size="small"
                    variant={currentSizeIndex === idx ? "contained" : "text"}
                    onClick={() => setCurrentSizeIndex(idx)}
                  >
                    {s.size}
                  </Button>
                ))}
              </Box>
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
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
                <TextField
                  placeholder="Giá"
                  size="small"
                  value={newColorInput.price}
                  onChange={(e) =>
                    setNewColorInput({
                      ...newColorInput,
                      price: e.target.value,
                    })
                  }
                  sx={{ width: 80 }}
                />
                <TextField
                  placeholder="Kho"
                  size="small"
                  value={newColorInput.stock}
                  onChange={(e) =>
                    setNewColorInput({
                      ...newColorInput,
                      stock: e.target.value,
                    })
                  }
                  sx={{ width: 60 }}
                />
                <Button variant="contained" onClick={handleAddColor}>
                  +
                </Button>
              </Box>
            </Box>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button variant="contained" onClick={handleSave} disabled={loading}>
          Cập nhật
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductEditModal;
