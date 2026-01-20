import {
  Box,
  Typography,
  IconButton,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  type SelectChangeEvent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import type { CartItem, CartColor } from "../types";

interface Props {
  item: CartItem;
  onIncrease: (id: number | string) => void;
  onDecrease: (id: number | string) => void;
  onRemove: (id: number | string) => void;
  onToggle: (id: number | string) => void;
  onUpdateVariant: (
    id: number | string,
    size: string,
    color: CartColor
  ) => void;
}

const CartItemView = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  onToggle,
  onUpdateVariant,
}: Props) => {
  // 1. Lấy danh sách Sizes từ Product (Theo type mới là .sizes)
  const sizes = item.product.sizes || [];

  // 2. Tìm danh sách màu dựa trên Size đang chọn
  const currentSizeVariant = sizes.find((s) => s.size === item.size);
  const availableColors = currentSizeVariant ? currentSizeVariant.colors : [];

  // 3. Helper để lấy URL ảnh an toàn (vì type avatar có thể là string | object)
  const getAvatarUrl = (avatar?: string | { url: string }): string => {
    if (!avatar) return "";
    if (typeof avatar === "string") return avatar;
    return avatar.url;
  };

  const handleSizeChange = (event: SelectChangeEvent) => {
    const newSize = event.target.value;
    const newSizeVariant = sizes.find((s) => s.size === newSize);

    if (newSizeVariant && newSizeVariant.colors.length > 0) {
      // Mặc định chọn màu đầu tiên của size mới
      const defaultColor = newSizeVariant.colors[0];
      onUpdateVariant(item.id, newSize, defaultColor);
    }
  };

  const handleColorChange = (event: SelectChangeEvent) => {
    const newColorName = event.target.value;
    const newColorObj = availableColors.find((c) => c.color === newColorName);

    if (newColorObj) {
      onUpdateVariant(item.id, item.size, newColorObj);
    }
  };

  const selectStyle = {
    fontFamily: "'Lexend', sans-serif",
    fontSize: "13px",
    height: "32px",
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#c4d3df" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#567C8D" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#2F4156",
    },
  };

  // Ưu tiên ảnh của màu, nếu không có thì lấy ảnh gốc sản phẩm
  const displayImage =
    getAvatarUrl(item.color.avatar) || getAvatarUrl(item.product.avatar);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "auto 80px 1fr",
          sm: "auto 100px 1fr auto auto",
        },
        gap: { xs: 2, sm: 3 },
        py: 3,
        alignItems: "center",
      }}
    >
      {/* Checkbox */}
      <Checkbox
        checked={!!item.selected}
        onChange={() => onToggle(item.id)}
        sx={{ p: 0 }}
      />

      {/* Ảnh */}
      <Box
        component="img"
        src={displayImage}
        alt={item.product.title}
        sx={{ width: 90, height: 90, borderRadius: 2, objectFit: "cover" }}
      />

      {/* Info */}
      <Box sx={{ textAlign: "left" }}>
        <Typography
          fontWeight={700}
          variant="subtitle1"
          color="#567C8D"
          // Đã sửa lỗi syntax ở dòng này
          sx={{ fontFamily: "'Lexend', sans-serif", mb: 1 }}
        >
          {item.product.title}
        </Typography>

        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
          {/* Size Select */}
          <FormControl size="small" sx={{ minWidth: 80 }}>
            <InputLabel
              sx={{ fontSize: 12, top: -4, fontFamily: "'Lexend', sans-serif" }}
            >
              Size
            </InputLabel>
            <Select
              value={item.size}
              label="Size"
              onChange={handleSizeChange}
              sx={selectStyle}
            >
              {sizes.map((s) => (
                <MenuItem
                  key={s.sizeId}
                  value={s.size}
                  sx={{ fontSize: 13, fontFamily: "'Lexend', sans-serif" }}
                >
                  {s.size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Color Select */}
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <InputLabel
              sx={{ fontSize: 12, top: -4, fontFamily: "'Lexend', sans-serif" }}
            >
              Màu
            </InputLabel>
            <Select
              value={item.color.color}
              label="Màu"
              onChange={handleColorChange}
              sx={selectStyle}
            >
              {availableColors.map((c) => (
                <MenuItem
                  key={c.colorId}
                  value={c.color}
                  sx={{ fontSize: 13, fontFamily: "'Lexend', sans-serif" }}
                >
                  {c.color}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Typography
          fontWeight={700}
          color="#2F4156"
          mt={1.5}
          sx={{ fontFamily: "'Lexend', sans-serif" }}
        >
          {item.color.price.toLocaleString("vi-VN")} đ
        </Typography>
      </Box>

      {/* Số lượng + Xóa */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
          justifyContent: "flex-end",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #c4d3df",
            borderRadius: 2,
            overflow: "hidden",
            bgcolor: "white",
          }}
        >
          <IconButton
            size="small"
            onClick={() => onDecrease(item.id)}
            disabled={item.quantity <= 1}
            sx={{ borderRight: "1px solid #c4d3df", borderRadius: 0 }}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>

          <Typography
            sx={{
              px: 2,
              fontWeight: 600,
              minWidth: 40,
              textAlign: "center",
              fontFamily: "'Lexend', sans-serif",
            }}
          >
            {item.quantity}
          </Typography>

          <IconButton
            size="small"
            onClick={() => onIncrease(item.id)}
            sx={{ borderLeft: "1px solid #c4d3df", borderRadius: 0 }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>

        <IconButton
          color="error"
          size="small"
          onClick={() => onRemove(item.id)}
          sx={{ "&:hover": { bgcolor: "rgba(244,67,54,0.1)" } }}
        >
          <DeleteOutlineIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CartItemView;
