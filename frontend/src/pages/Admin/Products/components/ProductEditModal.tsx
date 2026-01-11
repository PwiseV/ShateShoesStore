import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Box,
  TextField,
  MenuItem,
  Typography,
  IconButton,
  Chip,
  Avatar,
  CircularProgress,
  Paper,
  Tooltip,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  AddCircleOutline as AddIcon,
  PhotoCamera as PhotoCameraIcon,
  Close as CloseIcon,
  Info as InfoIcon,
} from "@mui/icons-material";

import type { Product, ProductFormData, SizeOption } from "../types";
import {
  updateProduct,
  getAllCategories,
} from "../../../../services/adminProductServices";
import { useToast } from "../../../../context/useToast.ts";

interface Props {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  onSuccess: () => void;
  onEditColor: (
    sIdx: number,
    cIdx: number,
    sizeData: SizeOption,
    sizeName: string,
    pId: number
  ) => void;
}

const PRIMARY_COLOR = "#567C8D";

const ProductEditModal: React.FC<Props> = ({
  open,
  onClose,
  product,
  onSuccess,
  onEditColor,
}) => {
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [newSizeInput, setNewSizeInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [sizes, setSizes] = useState<(SizeOption & { isNew?: boolean })[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [formData, setFormData] = useState<ProductFormData>({
    code: "",
    title: "",
    category: "",
    description: "",
    avatar: "",
    tags: [],
  });

  useEffect(() => {
    const initData = async () => {
      try {
        const cats = await getAllCategories();
        setCategories(cats.data || cats);
      } catch (error) {
        console.error("Lỗi lấy danh mục", error);
      }
    };

    if (open) {
      initData();
      if (product) {
        setFormData({
          code: product.code || "",
          title: product.title || "",
          category: product.category?.name || "",
          description: product.description || "",
          avatar: product.avatar || "",
          tags: Array.isArray(product.tag)
            ? product.tag.map((t) => (typeof t === "object" ? (t as any).name : t))
            : [],
        });
        setSizes(product.sizes || []);
      }
    }
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [product, open]);

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = tagInput.trim().replace(",", "");
      if (val && !formData.tags.includes(val)) {
        handleInputChange("tags", [...formData.tags, val]);
      }
      setTagInput("");
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    handleInputChange("tags", formData.tags.filter((tag) => tag !== tagToDelete));
  };

  const handleAddSize = () => {
    const val = newSizeInput.trim().toUpperCase();
    if (!val) return;
    if (sizes.some((s) => s.size.toUpperCase() === val)) {
      showToast(`Size "${val}" đã tồn tại!`, "warning");
      return;
    }
    setSizes([...sizes, { size: val, colors: [], isNew: true }]);
    setNewSizeInput("");
  };

  const handleUpdateProduct = async () => {
    if (!product) return;
    setLoading(true);
    try {
      const data = new FormData();
      data.append("code", formData.code);
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);

      if (formData.tags.length > 0) {
        formData.tags.forEach((tag) => data.append("tags", tag));
      } else {
        data.append("tags", "");
      }

      if (selectedFile) data.append("avatar", selectedFile);

      await updateProduct(product.productId, data);
      showToast("Cập nhật thành công!", "success");
      onSuccess();
    } catch (e) {
      showToast("Lỗi khi cập nhật sản phẩm", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box sx={{ p: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #f0f0f0" }}>
        <Typography variant="h6" fontWeight={700}>Chỉnh sửa sản phẩm</Typography>
        <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
      </Box>

      <DialogContent sx={{ p: 4, bgcolor: "#fbfbfb" }}>
        <Stack spacing={4}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
              <InfoIcon fontSize="small" sx={{ color: PRIMARY_COLOR }} /> Thông tin cơ bản
            </Typography>

            <Stack spacing={3}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                {/* PHẦN ẢNH ĐÃ ĐƯỢC KHÔI PHỤC */}
                <Box sx={{ position: "relative", alignSelf: "center" }}>
                  <Avatar
                    src={previewUrl || formData.avatar}
                    variant="rounded"
                    sx={{ width: 140, height: 140, borderRadius: 2, border: "1px solid #eee", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
                  />
                  <IconButton
                    component="label"
                    sx={{ position: "absolute", bottom: -10, right: -10, bgcolor: PRIMARY_COLOR, color: "white", "&:hover": { bgcolor: PRIMARY_COLOR, filter: "brightness(0.9)" } }}
                    size="small"
                  >
                    <PhotoCameraIcon fontSize="small" />
                    <input type="file" hidden accept="image/*" onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) { setSelectedFile(file); setPreviewUrl(URL.createObjectURL(file)); }
                    }} />
                  </IconButton>
                </Box>

                <Stack spacing={2.5} flex={1}>
                  <Stack direction="row" spacing={2}>
                    <TextField label="Mã sản phẩm" fullWidth size="small" value={formData.code} onChange={(e) => handleInputChange("code", e.target.value)} />
                    <TextField select label="Danh mục" fullWidth size="small" value={formData.category} onChange={(e) => handleInputChange("category", e.target.value)}>
                      {categories.map((cat) => (
                        <MenuItem key={cat.name} value={cat.name}>{cat.name}</MenuItem>
                      ))}
                    </TextField>
                  </Stack>
                  <TextField label="Tên sản phẩm" fullWidth size="small" value={formData.title} onChange={(e) => handleInputChange("title", e.target.value)} />
                </Stack>
              </Stack>

              {/* TRƯỜNG DESCRIPTION */}
              <TextField 
                label="Mô tả sản phẩm" 
                fullWidth 
                multiline 
                rows={4} 
                value={formData.description} 
                onChange={(e) => handleInputChange("description", e.target.value)} 
              />

              {/* PHẦN TAGS */}
              <Box>
                <TextField label="Thêm Tags (Enter để thêm)" size="small" fullWidth value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleAddTag} />
                <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 1.5 }}>
                  {formData.tags.map((tag, index) => (
                    <Chip key={index} label={tag} onDelete={() => handleDeleteTag(tag)} size="small" />
                  ))}
                </Stack>
              </Box>

              <Button 
                variant="contained" 
                onClick={handleUpdateProduct} 
                disabled={loading} 
                sx={{ bgcolor: PRIMARY_COLOR, py: 1, fontWeight: 700, "&:hover": { bgcolor: PRIMARY_COLOR, filter: "brightness(0.9)" } }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Cập nhật thông tin chính"}
              </Button>
            </Stack>
          </Paper>

          {/* QUẢN LÝ BIẾN THỂ */}
          <Box>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>Quản lý biến thể</Typography>
            <Box sx={{ display: "flex", gap: 1.5, mb: 3 }}>
              <TextField size="small" fullWidth placeholder="Nhập size mới..." value={newSizeInput} onChange={(e) => setNewSizeInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAddSize()} />
              <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddSize}>Thêm</Button>
            </Box>

            <Stack spacing={2}>
              {sizes.map((s, idx) => (
                <Paper key={idx} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                    <Typography fontWeight={800}>Size: {s.size}</Typography>
                    {s.isNew && (
                      <Tooltip title="Xóa size mới tạo">
                        <IconButton size="small" onClick={() => setSizes(sizes.filter((_, i) => i !== idx))} sx={{ color: "error.light" }}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {s.colors.map((c, cIdx) => (
                      <Chip key={cIdx} label={`${c.color} • ${c.stock}`} variant="outlined"  onClick={() => onEditColor(idx, cIdx, s, s.size, product?.productId || 0)} />
                    ))}
                    <Button size="small" startIcon={<AddIcon fontSize="small" />} onClick={() => onEditColor(idx, -1, s, s.size, product?.productId || 0)}>Thêm màu</Button>
                  </Box>
                </Paper>
              ))}
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ProductEditModal;