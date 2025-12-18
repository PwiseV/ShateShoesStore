import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// Định nghĩa kiểu dữ liệu (giữ nguyên)
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
  return (
    <Stack
      className={className}
      spacing={3}
      sx={{ fontFamily: '"DM Sans", sans-serif' }} // Áp dụng font chung
    >
      {/* 1. SIZE THAM KHẢO */}
      <Box>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            mb: 1.5,
            color: "#6B8E9B", // Màu xanh xám nhạt cho tiêu đề
            fontSize: "1rem",
            textAlign: "left",
          }}
        >
          Size tham khảo
        </Typography>
        <Stack direction="row" spacing={1.5} flexWrap="wrap">
          {sizes.map((s) => {
            const isSelected = selectedSize === s.id;
            // Logic màu sắc cho từng trạng thái: Selected, Disabled, Normal
            let bgColor = "#fff";
            let textColor = "#333";
            let borderColor = "#E0E0E0";

            if (isSelected) {
              bgColor = "#2C3E50"; // Xanh đậm
              textColor = "#fff";
              borderColor = "transparent";
            } else if (s.disabled) {
              bgColor = "#D9D9D9"; // Xám đục cho disabled (giống ảnh mẫu)
              textColor = "#888";
              borderColor = "transparent";
            }

            return (
              <Button
                key={s.id}
                onClick={() => !s.disabled && onChangeSize?.(s.id)}
                disabled={s.disabled}
                sx={{
                  minWidth: 46, // Độ rộng cố định để tạo hình pill đẹp
                  height: 32,
                  borderRadius: 16, // Bo tròn hoàn toàn (Pill shape)
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
                  // Override style mặc định của nút disabled để giữ màu xám đậm
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

      {/* 2. MÀU SẮC */}
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
                  // Tạo hiệu ứng viền selected:
                  // Nếu selected: có viền trắng (padding) + viền màu bên ngoài
                  // Nếu màu trắng: luôn có viền mờ để không bị lẫn nền
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

      {/* 3. SỐ LƯỢNG (Thiết kế Pill Container) */}
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
            bgcolor: "#F7F8FA", // Màu nền xám nhạt của container
            borderRadius: 20, // Bo tròn container
            p: 0.75, // Padding bên trong
            width: "fit-content",
            border: "1px solid #EAEAEA",
          }}
        >
          {/* Nút Trừ: Nền trắng, shadow nhẹ */}
          <IconButton
            size="small"
            onClick={() => onChangeQuantity?.(Math.max(1, quantity - 1))}
            sx={{
              bgcolor: "#fff",
              color: "#333",
              width: 30,
              height: 30,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)", // Shadow nhẹ tạo độ nổi
              "&:hover": { bgcolor: "#f9f9f9" },
            }}
          >
            <RemoveIcon fontSize="small" sx={{ fontSize: 16 }} />
          </IconButton>

          {/* Số lượng */}
          <Box
            sx={{
              fontWeight: 700,
              fontSize: 15,
              minWidth: 20,
              textAlign: "center",
            }}
          >
            {quantity}
          </Box>

          {/* Nút Cộng: Nền xanh đậm, chữ trắng */}
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
