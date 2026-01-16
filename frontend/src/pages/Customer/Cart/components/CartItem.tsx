import {
  Box,
  Typography,
  IconButton,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  type SelectChangeEvent, // Fix lỗi verbatimModuleSyntax
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
  // 1. Lấy danh sách Size Options từ Product
  const sizeOptions = item.product.sizeOptions || [];

  // 2. Tìm danh sách màu dựa trên Size đang chọn
  const currentSizeOption = sizeOptions.find((opt) => opt.size === item.size);
  const availableColors = currentSizeOption ? currentSizeOption.colors : [];

  // 3. Xử lý đổi Size
  const handleSizeChange = (event: SelectChangeEvent) => {
    const newSize = event.target.value;
    const newSizeOption = sizeOptions.find((opt) => opt.size === newSize);

    if (newSizeOption && newSizeOption.colors.length > 0) {
      // Logic: Khi đổi size, tự động reset về màu đầu tiên của size đó
      const defaultColorForNewSize = newSizeOption.colors[0];
      onUpdateVariant(item.id, newSize, defaultColorForNewSize);
    }
  };

  // 4. Xử lý đổi Màu
  const handleColorChange = (event: SelectChangeEvent) => {
    const newColorName = event.target.value;
    // Tìm object CartColor đầy đủ dựa trên tên màu
    const newColorObj = availableColors.find((c) => c.color === newColorName);

    if (newColorObj) {
      onUpdateVariant(item.id, item.size, newColorObj);
    }
  };

  // Style cho Select Box
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

  // Xác định ảnh hiển thị: Ưu tiên ảnh của màu, nếu không có lấy ảnh product
  // Lưu ý: Kiểm tra xem Product gốc của bạn dùng 'avatar' hay 'image'. Code này giả định bạn đã map đúng.
  // @ts-ignore: Bỏ qua check type strict nếu base product chưa có avatar (xử lý ở runtime)
  const displayImage = item.color.avatar || item.product.image;
  // @ts-ignore
  const displayTitle = item.product.title || item.product.name;

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
      {/* Checkbox chọn sản phẩm */}
      <Checkbox
        checked={!!item.selected}
        onChange={() => onToggle(item.id)}
        sx={{ p: 0 }}
      />

      {/* Ảnh sản phẩm */}
      <Box
        component="img"
        src={displayImage}
        alt={displayTitle}
        sx={{ width: 90, height: 90, borderRadius: 2, objectFit: "cover" }}
      />

      {/* Thông tin & Dropdown */}
      <Box sx={{ textAlign: "left" }}>
        <Typography
          fontWeight={700}
          variant="subtitle1"
          color="#567C8D"
          sx={{ fontFamily: "'Lexend', sans-serif", mb: 1 }}
        >
          {displayTitle}
        </Typography>

        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
          {/* Dropdown Size */}
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
              {sizeOptions.map((opt) => (
                <MenuItem
                  key={opt.size}
                  value={opt.size}
                  sx={{ fontSize: 13, fontFamily: "'Lexend', sans-serif" }}
                >
                  {opt.size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Dropdown Màu */}
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
              {availableColors.map((col) => (
                <MenuItem
                  key={col.color}
                  value={col.color}
                  sx={{ fontSize: 13, fontFamily: "'Lexend', sans-serif" }}
                >
                  {col.color}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Giá tiền của biến thể */}
        <Typography
          fontWeight={700}
          color="#2F4156"
          mt={1.5}
          sx={{ fontFamily: "'Lexend', sans-serif" }}
        >
          {item.color.price.toLocaleString("vi-VN")} đ
        </Typography>
      </Box>

      {/* Bộ đếm số lượng */}
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

        {/* Nút xóa */}
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
