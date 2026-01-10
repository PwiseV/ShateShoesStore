import React, { useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Grid,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import type { PostFormData } from "../types";
import { CATEGORY_OPTIONS } from "../constants";

interface PostModalProps {
  open: boolean;
  onClose: () => void;
  isEditMode: boolean;
  formData: PostFormData;
  setFormData: React.Dispatch<React.SetStateAction<PostFormData>>;
  onSubmit: () => void;
}

const PostModal: React.FC<PostModalProps> = ({
  open,
  onClose,
  isEditMode,
  formData,
  setFormData,
  onSubmit,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, thumbnail: e.target.files[0].name });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{ sx: { borderRadius: "16px", p: 1 } }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: 700,
          color: "#3B4A6B",
          fontSize: "1.25rem",
        }}
      >
        {isEditMode ? "Chỉnh sửa bài viết" : "Tạo bài viết"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2.5 }}>
          {/* Tiêu đề */}
          <Box>
            <Typography fontWeight={600} fontSize="0.9rem" mb={0.5}>
              Tiêu đề bài viết
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Nhập tiêu đề..."
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              sx={{
                bgcolor: "#fff",
                "& .MuiOutlinedInput-root": { borderRadius: "8px" },
              }}
            />
          </Box>

          {/* Grid Danh mục + Tác giả */}
          <Grid container spacing={3}>
            <Grid size={6}>
              <Typography fontWeight={600} fontSize="0.9rem" mb={0.5}>
                Danh mục
              </Typography>
              <Select
                fullWidth
                size="small"
                displayEmpty
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                sx={{ borderRadius: "8px" }}
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid size={6}>
              <Typography fontWeight={600} fontSize="0.9rem" mb={0.5}>
                Tác giả
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Nhập tên tác giả..."
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                sx={{
                  bgcolor: "#fff",
                  "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                }}
              />
            </Grid>
          </Grid>

          {/* Upload file */}
          <Box>
            <Typography fontWeight={600} fontSize="0.9rem" mb={0.5}>
              Ảnh thumbnail
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Chọn tệp"
                value={formData.thumbnail}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <UploadFileIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                  cursor: "pointer",
                }}
              />
              <input
                type="file"
                hidden
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
              />
            </Box>
          </Box>

          {/* Nội dung */}
          <Box>
            <Typography fontWeight={600} fontSize="0.9rem" mb={0.5}>
              Nội dung chi tiết
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              placeholder="Nhập nội dung bài viết..."
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "12px" },
              }}
            />
          </Box>

          {/* Trạng thái (chỉ hiện khi edit) */}
          {isEditMode && (
            <Box>
              <Typography fontWeight={600} fontSize="0.9rem" mb={0.5}>
                Trạng thái
              </Typography>
              <Select
                fullWidth
                size="small"
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as "active" | "hidden",
                  })
                }
                sx={{ borderRadius: "8px" }}
              >
                <MenuItem value="active">Hiển thị</MenuItem>
                <MenuItem value="hidden">Ẩn</MenuItem>
              </Select>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
        <Button
          variant="contained"
          onClick={onSubmit}
          sx={{
            bgcolor: "#567C8D",
            px: 5,
            py: 1,
            borderRadius: "8px",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { bgcolor: "#4a6b7c" },
          }}
        >
          {isEditMode ? "Lưu thay đổi" : "Tạo bài viết"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostModal;
