import {
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  type SelectChangeEvent,
  Chip,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckIcon from "@mui/icons-material/Check";
import { useState, useEffect } from "react";
import type { CartItem } from "../types";

interface Props {
  item: CartItem;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
  onUpdateVariant: (id: string, newVariantId: string, quantity: number) => void;
}

const CartItemView = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  onToggle,
  onUpdateVariant,
}: Props) => {
  const [selectedSize, setSelectedSize] = useState(item.size);
  const [selectedColor, setSelectedColor] = useState(item.color);
  const [selectedVariantId, setSelectedVariantId] = useState(item.variantId);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setSelectedSize(item.size);
    setSelectedColor(item.color);
    setSelectedVariantId(item.variantId);
    setIsChanged(false);
  }, [item]);

  // Safe guards để tránh lỗi undefined
  if (!item || !item.product) {
    return null;
  }

  const sizes = item.product?.sizes || [];
  const currentSizeObj = sizes.find((s) => s.size === selectedSize);
  const availableColors = currentSizeObj?.colors || [];

  const handleSizeChange = (e: SelectChangeEvent) => {
    const newSize = e.target.value;
    setSelectedSize(newSize);
    const newSizeObj = sizes.find((s) => s.size === newSize);
    if (newSizeObj && newSizeObj.colors.length > 0) {
      const firstColor = newSizeObj.colors[0];
      setSelectedColor(firstColor.color);
      setSelectedVariantId(firstColor.variantId);
    }
    setIsChanged(true);
  };

  const handleColorChange = (e: SelectChangeEvent) => {
    const newVariantId = e.target.value;
    const colorObj = availableColors.find((c) => c.variantId === newVariantId);
    if (colorObj) {
      setSelectedColor(colorObj.color);
      setSelectedVariantId(newVariantId);
      setIsChanged(true);
    }
  };

  const handleConfirmUpdate = () => {
    onUpdateVariant(item.cartItemId, selectedVariantId, item.quantity);
  };

  return (
    <Box
      sx={{
        display: "grid",
        // --- CHỈNH SỬA 1: Điều chỉnh tỷ lệ cột ---
        // Cột 2 (Ảnh): Giữ cố định 100px cho gọn
        // Cột 3 (Info): Tăng lên 3fr (chiếm nhiều chỗ nhất để chứa dropdown)
        gridTemplateColumns: {
          xs: "1fr",
          md: "40px 100px 3fr 1.2fr 1fr 0.5fr",
        },
        gap: 2,
        alignItems: "center",
        p: 2,
        bgcolor: "white",
        borderRadius: 3,
        mb: 2,
        position: "relative",
        border: item.selected ? "1px solid #2F4156" : "1px solid transparent",
        transition: "all 0.2s ease",
      }}
    >
      {item.isAdjust && (
        <Chip
          label="SL đã chỉnh sửa"
          color="warning"
          size="small"
          sx={{ position: "absolute", top: -10, left: 10, zIndex: 1 }}
        />
      )}

      {/* 1. Checkbox */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Checkbox
          checked={item.selected ?? false}
          onChange={() => onToggle(item.cartItemId)}
          color="primary"
        />
      </Box>

      {/* 2. Ảnh sản phẩm */}
      <Box
        sx={{
          width: "100%",
          aspectRatio: "1/1",
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid #eee",
        }}
      >
        <img
          src={item.avatar || item.product?.avatar || '/placeholder.png'}
          alt={item.product?.title || 'Product'}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      {/* 3. Thông tin & Dropdown */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 1,
          width: "100%", // Đảm bảo chiếm hết width của cột
        }}
      >
        <Typography
          fontWeight={600}
          color="#2F4156"
          textAlign="left"
          sx={{
            fontFamily: "'Lexend', sans-serif",
            lineHeight: 1.3,
            // Giới hạn 2 dòng cho tên sản phẩm nếu quá dài
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          {item.product?.title || 'Sản phẩm'}
        </Typography>

        {/* --- CHỈNH SỬA 2: Container Dropdown --- */}
        <Box
          sx={{
            display: "flex",
            gap: 1.5, // Tăng khoảng cách giữa các phần tử
            flexWrap: "nowrap", // QUAN TRỌNG: Không cho xuống dòng
            alignItems: "center",
            width: "100%",
          }}
        >
          <FormControl size="small" variant="standard" sx={{ minWidth: 60 }}>
            <InputLabel>Size</InputLabel>
            <Select
              value={selectedSize}
              onChange={handleSizeChange}
              label="Size"
            >
              {sizes.map((s) => (
                <MenuItem key={s.size} value={s.size}>
                  {s.size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Tăng minWidth để chứa chữ "Xanh Dương" */}
          <FormControl size="small" variant="standard" sx={{ minWidth: 120 }}>
            <InputLabel>Màu</InputLabel>
            <Select
              value={selectedVariantId}
              onChange={handleColorChange}
              label="Màu"
            >
              {availableColors.map((c) => (
                <MenuItem key={c.variantId} value={c.variantId}>
                  {c.color}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {isChanged && (
            <IconButton
              size="small"
              color="primary"
              onClick={handleConfirmUpdate}
              sx={{ bgcolor: "#e3f2fd", flexShrink: 0 }} // flexShrink: 0 để nút không bị co lại
            >
              <CheckIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* 4. Giá tiền */}
      <Typography fontWeight={700} color="#2F4156">
        {item.price.toLocaleString("vi-VN")}đ
      </Typography>

      {/* 5. Bộ điều khiển số lượng & Tồn kho */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #c4d3df",
            borderRadius: "4px",
            bgcolor: "#fff",
          }}
        >
          <IconButton
            size="small"
            onClick={() => onDecrease(item.cartItemId)}
            disabled={item.quantity <= 1}
          >
            <RemoveIcon fontSize="small" style={{ fontSize: 16 }} />
          </IconButton>

          <Typography sx={{ px: 1.5, fontWeight: 600, fontSize: 14 }}>
            {item.quantity}
          </Typography>

          <IconButton
            size="small"
            onClick={() => onIncrease(item.cartItemId)}
            disabled={item.stock <= item.quantity || item.isOutOfStock}
          >
            <AddIcon fontSize="small" style={{ fontSize: 16 }} />
          </IconButton>
        </Box>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontSize: "11px" }}
        >
          (Tồn kho {item.stock})
        </Typography>
      </Box>

      {/* 6. Nút xóa */}
      <IconButton
        color="error"
        onClick={() => onRemove(item.cartItemId)}
        sx={{ "&:hover": { bgcolor: "#ffebee" } }}
      >
        <DeleteOutlineIcon />
      </IconButton>
    </Box>
  );
};

export default CartItemView;
