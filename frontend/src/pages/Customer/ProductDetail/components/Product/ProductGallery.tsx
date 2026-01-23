import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export type GalleryImage = {
  id: string;
  src: string;
  alt?: string;
};

export type ProductGalleryProps = {
  images: GalleryImage[];
  initialIndex?: number;
  className?: string;
  onChange?: (index: number) => void;
  selectedIndex?: number;
};

const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  initialIndex = 0,
  className,
  onChange,
  selectedIndex,
}) => {
  const safeIndex = Math.min(initialIndex, Math.max(0, images.length - 1));
  const [index, setIndex] = useState(safeIndex);

  React.useEffect(() => {
    if (typeof selectedIndex === "number" && selectedIndex >= 0) {
      setIndex(selectedIndex);
    }
  }, [selectedIndex]);

  const handleSelect = (i: number) => {
    setIndex(i);
    onChange?.(i);
  };

  const current = images[index];

  return (
    <Stack className={className} spacing={2} sx={{ width: "100%" }}>
      {/* 1. ẢNH LỚN: Kích thước gốc Figma 711x600 */}
      <Box
        sx={{
          width: "100%",
          // Thiết lập tỷ lệ khung hình chuẩn Figma:
          aspectRatio: "711 / 600",
          borderRadius: 4, // Bo góc lớn (khoảng 16px - 24px)
          overflow: "hidden",
          bgcolor: "#f0f0f0", // Màu nền chờ khi ảnh load
          position: "relative",
          "& img": {
            width: "100%",
            height: "100%",
            objectFit: "cover", // Cắt ảnh để lấp đầy khung mà không méo
            display: "block",
            transition: "transform 0.3s ease", // Hiệu ứng zoom nhẹ khi hover (tùy chọn)
          },
          "&:hover img": {
            transform: "scale(1.02)",
          },
        }}
      >
        {current && <img src={current.src} alt={current.alt ?? ""} />}
      </Box>

      {/* 2. LIST ẢNH NHỎ: Kích thước gốc Figma 215x200 */}
      <Stack direction="row" spacing={2}>
        {images.map((img, i) => {
          const isSelected = i === index;
          return (
            <Box
              key={img.id}
              onClick={() => handleSelect(i)}
              sx={{
                flex: 1, // Chia đều không gian chiều ngang
                // Thiết lập tỷ lệ khung hình chuẩn Figma cho ảnh nhỏ:
                aspectRatio: "215 / 200",
                borderRadius: 3, // Bo góc vừa (khoảng 12px)
                overflow: "hidden",
                cursor: "pointer",
                position: "relative",
                // Xử lý viền khi được chọn (Active state)
                border: "2px solid",
                borderColor: isSelected ? "#6B8E9B" : "transparent", // Màu xanh xám chủ đạo
                opacity: isSelected ? 1 : 0.7, // Làm mờ nhẹ ảnh chưa chọn
                transition: "all 0.2s",
                "& img": {
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                },
                "&:hover": {
                  opacity: 1,
                },
              }}
            >
              <img src={img.src} alt={img.alt ?? ""} />
            </Box>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default ProductGallery;
