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
  IconButton,
  Avatar,
} from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
  Close as CloseIcon,
  AddBox as AddBoxIcon,
  LocalOffer as TagIcon,
  Category as CategoryIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import type { ProductFormData } from "../types";
import {
  createProduct,
  getAllCategories,
} from "../../../../services/adminProductServices";
import { useToast } from "../../../../context/useToast.ts";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PRIMARY_COLOR = "#567C8D";

const ProductCreateModal: React.FC<Props> = ({ open, onClose, onSuccess }) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [categories, setCategories] = useState<any[]>([]); // Đổi thành any[] để linh hoạt với dữ liệu API

  const [formData, setFormData] = useState<ProductFormData>({
    code: "",
    title: "",
    category: "", // Để trống ban đầu để người dùng chọn
    description: "",
    avatar: "",
    tags: [],
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const initData = async () => {
      try {
        const cats = await getAllCategories();
        // Xử lý dữ liệu trả về linh hoạt: cats.data hoặc cats
        const categoryList = Array.isArray(cats) ? cats : cats.data || [];
        setCategories(categoryList);
        
        // Gán mặc định nếu có danh sách
        if (categoryList.length > 0) {
          const firstCatName = typeof categoryList[0] === 'string' ? categoryList[0] : categoryList[0].name;
          setFormData(prev => ({ ...prev, category: firstCatName }));
        }
      } catch (error) {
        console.error("Lỗi lấy danh mục", error);
      }
    };

    if (open) {
      initData();
      setFormData({
        code: "",
        title: "",
        category: "",
        description: "",
        avatar: "",
        tags: [],
      });
      setMainImageFile(null);
      setPreviewUrl("");
      setFormErrors({});
    }
    
    return () => { if (previewUrl) URL.revokeObjectURL(previewUrl); };
  }, [open]);

  const handleFormChange = (field: string, value: any) => {
    setFormData((p) => ({ ...p, [field]: value }));
    // Xóa lỗi khi người dùng nhập liệu
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

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
      setMainImageFile(file);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!formData.code || !formData.title) {
      return setFormErrors({
        code: !formData.code ? "Mã sản phẩm không được để trống" : "",
        title: !formData.title ? "Tên sản phẩm không được để trống" : "",
      });
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("code", formData.code);
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("description", formData.description || "");
      formData.tags.forEach((tag) => data.append("tags[]", tag));

      if (mainImageFile) {
        data.append("avatar", mainImageFile);
      }

      await createProduct(data);
      showToast("Tạo sản phẩm thành công", "success");
      onSuccess();
      onClose();
    } catch (e) {
      showToast("Lỗi khi tạo sản phẩm", "error");
    } finally {
      setLoading(false);
    }
  };

  // Style chung cho TextField
  const fieldSx = {
    "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: PRIMARY_COLOR },
    "& .MuiInputLabel-root.Mui-focused": { color: PRIMARY_COLOR },
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, boxShadow: "0 20px 60px rgba(0,0,0,0.12)" },
      }}
    >
      <Box
        sx={{
          p: 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: `${PRIMARY_COLOR}08`,
          borderBottom: "1px solid #eceff1",
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Typography variant="h6" fontWeight={700} color="#37474f">
            Thêm Sản Phẩm Mới
          </Typography>
        </Stack>
        <IconButton onClick={onClose} size="small" sx={{ "&:hover": { color: "error.main", bgcolor: 'error.lighter' } }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 3, bgcolor: "#fbfcfd" }}>
        <Stack spacing={3} sx={{ mt: 1 }}>
          {/* Upload Area */}
          <Box
            sx={{
              border: `2px dashed ${mainImageFile ? PRIMARY_COLOR : "#cfd8dc"}`,
              borderRadius: 3,
              p: 2,
              textAlign: "center",
              bgcolor: mainImageFile ? `${PRIMARY_COLOR}03` : "white",
              transition: "0.3s",
              "&:hover": { borderColor: PRIMARY_COLOR },
            }}
          >
            {previewUrl ? (
              <Box sx={{ position: "relative", display: "inline-block", width: '100%' }}>
                <img
                  src={previewUrl}
                  alt="preview"
                  style={{ width: "100%", maxHeight: 180, objectFit: "contain", borderRadius: 8 }}
                />
                <Button
                  component="label"
                  size="small"
                  variant="contained"
                  sx={{ position: "absolute", bottom: 8, right: 8, bgcolor: PRIMARY_COLOR, "&:hover": { bgcolor: "#456371" } }}
                >
                  Thay đổi
                  <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                </Button>
              </Box>
            ) : (
              <Button
                component="label"
                sx={{ py: 4, width: "100%", flexDirection: "column", gap: 1, color: "text.secondary", textTransform: "none" }}
              >
                <CloudUploadIcon sx={{ fontSize: 40, color: PRIMARY_COLOR, mb: 1 }} />
                <Typography variant="body2" fontWeight={600}>Tải ảnh đại diện sản phẩm</Typography>
                <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
              </Button>
            )}
          </Box>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Mã sản phẩm"
              size="small"
              fullWidth
              value={formData.code}
              onChange={(e) => handleFormChange("code", e.target.value)}
              error={!!formErrors.code}
              helperText={formErrors.code}
              sx={fieldSx}
            />

            <TextField
              select
              label="Danh mục"
              size="small"
              fullWidth
              value={formData.category}
              onChange={(e) => handleFormChange("category", e.target.value)}
              InputProps={{
                startAdornment: <CategoryIcon fontSize="small" sx={{ mr: 1, color: PRIMARY_COLOR }} />,
              }}
              sx={fieldSx}
            >
              {categories.map((cat, idx) => {
                const name = typeof cat === 'string' ? cat : cat.name;
                const id = typeof cat === 'string' ? idx : cat.id || idx;
                return (
                  <MenuItem key={id} value={name}>{name}</MenuItem>
                );
              })}
            </TextField>
          </Stack>

          <TextField
            label="Tên sản phẩm"
            size="small"
            fullWidth
            value={formData.title}
            onChange={(e) => handleFormChange("title", e.target.value)}
            error={!!formErrors.title}
            helperText={formErrors.title}
            sx={fieldSx}
          />

          <TextField
            label="Mô tả tóm tắt"
            size="small"
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => handleFormChange("description", e.target.value)}
            InputProps={{
              startAdornment: <DescriptionIcon fontSize="small" sx={{ mr: 1, mt: 0.5, alignSelf: "flex-start", color: PRIMARY_COLOR }} />,
            }}
            sx={fieldSx}
          />

          <Box>
            <TextField
              label="Tags sản phẩm"
              size="small"
              fullWidth
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Nhập tag và nhấn Enter..."
              InputProps={{
                startAdornment: <TagIcon fontSize="small" sx={{ mr: 1, color: PRIMARY_COLOR }} />,
              }}
              sx={fieldSx}
            />
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1.5 }}>
              {formData.tags.map((t) => (
                <Chip
                  key={t}
                  label={t}
                  size="small"
                  onDelete={() => handleFormChange("tags", formData.tags.filter((x) => x !== t))}
                  sx={{
                    borderRadius: 1.5,
                    bgcolor: `${PRIMARY_COLOR}15`,
                    color: PRIMARY_COLOR,
                    fontWeight: 600,
                    "& .MuiChip-deleteIcon": { color: PRIMARY_COLOR, "&:hover": { color: "#37474f" } },
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2.5, bgcolor: "#fff", borderTop: "1px solid #eceff1" }}>
        <Button onClick={onClose} sx={{ fontWeight: 700, color: "text.secondary", textTransform: "none" }}>
          Hủy bỏ
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            minWidth: 140,
            borderRadius: 2,
            fontWeight: 700,
            textTransform: "none",
            bgcolor: PRIMARY_COLOR,
            boxShadow: `0 4px 12px ${PRIMARY_COLOR}30`,
            "&:hover": { bgcolor: "#456371", boxShadow: `0 6px 16px ${PRIMARY_COLOR}40` },
          }}
        >
          {loading ? "Đang lưu..." : "Lưu sản phẩm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductCreateModal;