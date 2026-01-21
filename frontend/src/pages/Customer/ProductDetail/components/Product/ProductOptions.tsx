import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
// 1. Import TextField
import TextField from "@mui/material/TextField";

export type OptionValue = {
  id: string;
  label: string;
  disabled?: boolean;
  swatch?: string;
};

export type ProductOptionsProps = {
  sizes: OptionValue[];
  colors: OptionValue[];
  selectedSize?: string;
  selectedColor?: string;
  quantity?: number;
  onChangeSize?: (id: string) => void;
  onChangeColor?: (id: string) => void;
  onChangeQuantity?: (qty: number) => void;
  className?: string;
};

const ProductOptions: React.FC<ProductOptionsProps> = ({
  sizes,
  colors,
  selectedSize,
  selectedColor,
  quantity = 1,
  onChangeSize,
  onChangeColor,
  onChangeQuantity,
  className,
}) => {
  // 2. Hàm xử lý nhập input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Nếu xóa hết thì tạm thời về 1 để tránh lỗi
    if (val === "") {
      onChangeQuantity?.(1);
      return;
    }
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 1) {
      onChangeQuantity?.(num);
    }
  };

  return (
    <Stack
      className={className}
      spacing={3}
      sx={{ fontFamily: '"Lexend", sans-serif' }}
    >
      {/* 1. SIZE THAM KHẢO (Giữ nguyên) */}
      <Box>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            mb: 1.5,
            color: "#6B8E9B",
            fontSize: "1rem",
            textAlign: "left",
          }}
        >
          Size tham khảo
        </Typography>
        <Stack direction="row" spacing={1.5} flexWrap="wrap">
          {sizes.map((s) => {
            const isSelected = selectedSize === s.id;
            let bgColor = "#fff";
            let textColor = "#333";
            let borderColor = "#E0E0E0";

            if (isSelected) {
              bgColor = "#2C3E50";
              textColor = "#fff";
              borderColor = "transparent";
            } else if (s.disabled) {
              bgColor = "#D9D9D9";
              textColor = "#888";
              borderColor = "transparent";
            }

            return (
              <Button
                key={s.id}
                onClick={() => !s.disabled && onChangeSize?.(s.id)}
                disabled={s.disabled}
                sx={{
                  minWidth: 46,
                  height: 32,
                  borderRadius: 16,
                  border: "1px solid",
                  borderColor: borderColor,
                  bgcolor: bgColor,
                  color: textColor,
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  boxShadow: "none",
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: isSelected
                      ? "#1a252f"
                      : s.disabled
                      ? "#D9D9D9"
                      : "#f5f5f5",
                    borderColor: borderColor,
                    boxShadow: "none",
                  },
                  "&.Mui-disabled": {
                    bgcolor: "#D9D9D9",
                    color: "#999",
                    border: "none",
                  },
                }}
              >
                {s.label}
              </Button>
            );
          })}
        </Stack>
      </Box>

      {/* 2. MÀU SẮC (Giữ nguyên) */}
      <Box>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            mb: 1.5,
            color: "#6B8E9B",
            fontSize: "1rem",
            textAlign: "left",
          }}
        >
          Màu sắc
        </Typography>
        <Stack direction="row" spacing={2}>
          {colors.map((c) => {
            const isSelected = selectedColor === c.id;
            const isWhite =
              c.swatch?.toLowerCase() === "#ffffff" ||
              c.swatch?.toLowerCase() === "#fff";

            return (
              <Box
                key={c.id}
                onClick={() => onChangeColor?.(c.id)}
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  bgcolor: c.swatch,
                  cursor: "pointer",
                  boxShadow: isSelected
                    ? `0 0 0 2px #fff, 0 0 0 4px ${isWhite ? "#ccc" : c.swatch}`
                    : isWhite
                    ? "inset 0 0 0 1px rgba(0,0,0,0.15)"
                    : "none",
                  transition: "all 0.2s",
                }}
              />
            );
          })}
        </Stack>
      </Box>

      {/* 3. SỐ LƯỢNG (Đã cập nhật TextField nhưng giữ Design cũ) */}
      <Box>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            mb: 1.5,
            color: "#6B8E9B",
            fontSize: "1rem",
            textAlign: "left",
          }}
        >
          Số lượng
        </Typography>

        {/* Container màu xám nhạt hình viên thuốc */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{
            bgcolor: "#F7F8FA",
            borderRadius: 20,
            p: 0.75,
            width: "fit-content",
            border: "1px solid #EAEAEA",
          }}
        >
          {/* Nút Trừ: Nền trắng */}
          <IconButton
            size="small"
            onClick={() => onChangeQuantity?.(Math.max(1, quantity - 1))}
            sx={{
              bgcolor: "#fff",
              color: "#333",
              width: 30,
              height: 30,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              "&:hover": { bgcolor: "#f9f9f9" },
            }}
          >
            <RemoveIcon fontSize="small" sx={{ fontSize: 16 }} />
          </IconButton>

          {/* Ô Nhập Liệu (TextField thay cho Box text tĩnh) */}
          <TextField
            value={quantity}
            onChange={handleInputChange}
            variant="standard" // Bỏ border mặc định
            inputProps={{
              type: "number",
              min: 1,
              style: {
                textAlign: "center",
                fontWeight: 700,
                fontSize: "15px", // Khớp font size cũ
                padding: 0,
                fontFamily: '"Lexend", sans-serif',
              },
            }}
            sx={{
              width: 40, // Độ rộng vừa đủ
              // Ẩn các gạch chân của Input standard
              "& .MuiInput-underline:before": { borderBottom: "none" },
              "& .MuiInput-underline:after": { borderBottom: "none" },
              "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                borderBottom: "none",
              },
              // Ẩn mũi tên tăng giảm của trình duyệt
              "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                {
                  "-webkit-appearance": "none",
                  margin: 0,
                },
              "& input[type=number]": {
                "-moz-appearance": "textfield",
              },
            }}
          />

          {/* Nút Cộng: Nền xanh đậm */}
          <IconButton
            size="small"
            onClick={() => onChangeQuantity?.(quantity + 1)}
            sx={{
              bgcolor: "#2C3E50",
              color: "#fff",
              width: 30,
              height: 30,
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              "&:hover": { bgcolor: "#1a252f" },
            }}
          >
            <AddIcon fontSize="small" sx={{ fontSize: 16 }} />
          </IconButton>
        </Stack>
      </Box>
    </Stack>
  );
};

export default ProductOptions;
