import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography"; // Import Typography

import ProductGallery, { type GalleryImage } from "./ProductGallery";
import ProductInfo, { type ProductRating } from "./ProductInfo";
import ProductOptions, { type OptionValue } from "./ProductOptions";

// ... (Giữ nguyên props)
export type ProductFormProps = {
  name: string;
  price: number;
  images: GalleryImage[];
  breadcrumbs?: string[];
  badges?: string[];
  rating?: ProductRating;
  description?: string[];
  sizes: OptionValue[];
  colors: OptionValue[];
  onSubmit?: (payload: any) => void;
  onBuyNow?: () => void;
};

const ProductForm: React.FC<ProductFormProps> = ({
  name,
  price,
  images,
  breadcrumbs,
  badges,
  rating,
  description,
  sizes,
  colors,
  onSubmit,
  onBuyNow,
}) => {
  const [size, setSize] = useState<string>("36"); // Default giống ảnh
  const [color, setColor] = useState<string>("blue");
  const [quantity, setQuantity] = useState(1);

  // Format giá tiền
  const formattedPrice = new Intl.NumberFormat("vi-VN").format(price) + " đ";

  return (
    <Stack spacing={4}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={5}>
        {/* CỘT TRÁI: ẢNH (Chiếm 55%) */}
        <Box sx={{ flex: 1.2 }}>
          <ProductGallery images={images} />
        </Box>

        {/* CỘT PHẢI: NỘI DUNG (Chiếm 45%) */}
        <Stack spacing={3} sx={{ flex: 1 }}>
          {/* 1. Thông tin trên cùng */}
          <ProductInfo
            name={name}
            // Price không truyền vào đây nữa
            breadcrumbs={breadcrumbs}
            badges={badges}
            rating={rating}
            description={description}
          />

          {/* 2. Các tùy chọn (Size, Màu, SL) */}
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

          {/* 3. GIÁ TIỀN (Đặt ở đây mới đúng thiết kế) */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: "2F4156",
              fontSize: "2rem",
              mt: 1,
              textAlign: "left",
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            {formattedPrice}
          </Typography>

          {/* 4. Box Khuyến mãi */}
          <Box
            sx={{
              borderRadius: 2,
              p: 2.5,
              bgcolor: "#2C3E50",
              color: "#fff",
              fontFamily: '"Lexend", sans-serif',
              textAlign: "left",
            }}
          >
            <Box sx={{ fontWeight: 700, mb: 0.5, fontSize: "0.95rem" }}>
              Giảm 10% cho khách hàng mới
            </Box>
            <Box sx={{ opacity: 0.8, fontSize: 13, lineHeight: 1.5 }}>
              Vì những ấn tượng đầu tiên luôn đặc biệt, [Tên thương hiệu] dành
              tặng bạn ưu đãi 10% cho lần mua sắm đầu tiên – như một món quà nhỏ
              gửi đến người phụ nữ biết trân trọng vẻ đẹp tinh tế.
            </Box>
          </Box>

          {/* 5. Nút bấm */}
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={onBuyNow}
              sx={{
                bgcolor: "#6B8E9B",
                py: 1.5,
                fontWeight: 700,
                textTransform: "none",
                fontSize: "1rem",
                boxShadow: "none",
                fontFamily: '"DM Sans", sans-serif',
                "&:hover": { bgcolor: "#557280" },
              }}
            >
              Mua ngay
            </Button>
            <Button
              variant="outlined"
              fullWidth
              size="large"
              onClick={() => onSubmit?.({ size, color, quantity })}
              sx={{
                bgcolor: "#fff",
                color: "#567C8D",
                borderColor: "#567C8D",
                fontWeight: 700,
                textTransform: "none",
                py: 1.5,
                fontFamily: '"DM Sans", sans-serif',
                "&:hover": { borderColor: "#333", bgcolor: "transparent" },
              }}
            >
              Thêm vào giỏ hàng
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProductForm;
