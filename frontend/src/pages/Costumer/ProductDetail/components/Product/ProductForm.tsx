import React, { useState, useMemo } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import ProductGallery, { type GalleryImage } from "./ProductGallery";
import ProductInfo, { type ProductRating } from "./ProductInfo";
import ProductOptions, { type OptionValue } from "./ProductOptions";

// --- 1. SỬA IMPORT: Lấy tất cả Type từ service chính ---
import {
  type BackendSizeVariant,
  type Promotion, // Import Promotion từ đây luôn
} from "../../../../../services/productDetailsServices";

export type ProductFormProps = {
  name: string;
  defaultPrice: number;
  images: GalleryImage[];
  breadcrumbs?: string[];
  badges?: string[];
  rating: { value: number; count: number };
  description?: string[];
  sizes: OptionValue[];
  colors: OptionValue[];
  variantsData: BackendSizeVariant[];

  // Prop Promotion
  promotion: Promotion | null;

  onSubmit?: (payload: any) => void;
  onBuyNow?: () => void;

  // --- PROPS WISHLIST ---
  isLiked: boolean;
  onToggleLike: () => void;
};

const ProductForm: React.FC<ProductFormProps> = ({
  name,
  defaultPrice,
  images,
  breadcrumbs,
  badges,
  rating,
  description,
  sizes,
  colors,
  variantsData,
  promotion,
  onSubmit,
  onBuyNow,
  isLiked,
  onToggleLike,
}) => {
  const [size, setSize] = useState<string>(sizes.length > 0 ? sizes[0].id : "");
  const [color, setColor] = useState<string>(
    colors.length > 0 ? colors[0].id : ""
  );
  const [quantity, setQuantity] = useState(1);

  // --- 2. CẬP NHẬT LOGIC TÌM VARIANT (An toàn hơn) ---
  const currentVariant = useMemo(() => {
    // Ép kiểu String cho size để so sánh ("36" === "36")
    const selectedSizeObj = variantsData.find(
      (s) => String(s.size) === String(size)
    );
    if (!selectedSizeObj) return null;

    // So sánh màu không phân biệt hoa thường
    const selectedColorObj = selectedSizeObj.colors.find(
      (c) => c.color.toLowerCase() === color.toLowerCase()
    );
    return selectedColorObj || null;
  }, [size, color, variantsData]);

  // Logic hiển thị giá & stock
  // Nếu không tìm thấy variant (vd chưa chọn màu), fallback về giá mặc định
  const displayPrice = currentVariant ? currentVariant.price : defaultPrice;
  const currentStock = currentVariant ? currentVariant.stock : 0;
  const isOutOfStock = currentStock <= 0;

  const formattedPrice =
    new Intl.NumberFormat("vi-VN").format(displayPrice) + " đ";

  return (
    <Stack spacing={4}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={5}>
        <Box sx={{ flex: 1.2 }}>
          <ProductGallery images={images} />
        </Box>

        <Stack spacing={3} sx={{ flex: 1 }}>
          <ProductInfo
            name={name}
            breadcrumbs={breadcrumbs}
            badges={badges}
            rating={rating}
            description={description}
            // TRUYỀN XUỐNG PRODUCT INFO
            isLiked={isLiked}
            onToggleLike={onToggleLike}
          />

          <ProductOptions
            sizes={sizes}
            colors={colors}
            selectedSize={size}
            selectedColor={color}
            quantity={quantity}
            onChangeSize={setSize}
            onChangeColor={setColor}
            onChangeQuantity={setQuantity}
          />

          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: "#2C3E50",
                fontSize: "2.5rem",
                mt: 1,
                textAlign: "left",
                fontFamily: '"DM Sans", sans-serif',
              }}
            >
              {formattedPrice}
            </Typography>
          </Box>

          {/* --- HIỂN THỊ KHUYẾN MÃI TỪ API --- */}
          {promotion && (
            <Box
              sx={{
                borderRadius: 2,
                p: 3,
                bgcolor: "#2C3E50",
                color: "#fff",
                textAlign: "left",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  fontFamily: '"Lexend", sans-serif',
                }}
              >
                {promotion.description}
              </Typography>

              {promotion.longDescription && (
                <Typography
                  variant="body2"
                  sx={{ opacity: 0.9, lineHeight: 1.5, fontSize: "0.9rem" }}
                >
                  {promotion.longDescription}
                </Typography>
              )}
            </Box>
          )}

          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              fullWidth
              size="large"
              disabled={isOutOfStock}
              onClick={() =>
                onSubmit?.({
                  sizeId: size,
                  colorName: color,
                  variantId: currentVariant?.colorId,
                  price: displayPrice,
                  quantity,
                })
              }
              sx={{
                bgcolor: "#fff",
                color: "#546E7A",
                borderColor: "#546E7A",
                borderWidth: "1px",
                borderRadius: "4px",
                fontWeight: 700,
                fontSize: "1rem",
                textTransform: "none",
                py: 1.5,
                fontFamily: '"DM Sans", sans-serif',
                "&:hover": {
                  bgcolor: "#F5F7FA",
                  borderColor: "#546E7A",
                  borderWidth: "1px",
                },
                "&.Mui-disabled": { borderColor: "#ddd", color: "#ddd" },
              }}
            >
              {isOutOfStock ? "Tạm hết hàng" : "Thêm vào giỏ hàng"}
            </Button>

            <Button
              variant="contained"
              fullWidth
              size="large"
              disabled={isOutOfStock}
              onClick={onBuyNow}
              sx={{
                bgcolor: "#546E7A",
                color: "#fff",
                borderRadius: "4px",
                fontWeight: 700,
                fontSize: "1rem",
                textTransform: "none",
                py: 1.5,
                boxShadow: "none",
                fontFamily: '"DM Sans", sans-serif',
                "&:hover": { bgcolor: "#455A64", boxShadow: "none" },
                "&.Mui-disabled": { bgcolor: "#eee", color: "#999" },
              }}
            >
              Mua ngay
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProductForm;
