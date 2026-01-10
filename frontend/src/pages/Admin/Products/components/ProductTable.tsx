import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Product } from "../types";
import { TABLE_GRID, COLOR_DISPLAY_MAP } from "../constants";

interface ProductTableProps {
  loading: boolean;
  products: Product[];
  currentPage: number;
  pageSize: number;
  onEdit: (p: Product) => void;
  onDelete: (id: number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  loading,
  products,
  currentPage,
  pageSize,
  onEdit,
  onDelete,
}) => {
  // Local state for table interaction (size/color selection per row)
  const [selectedSizes, setSelectedSizes] = useState<Record<number, number>>(
    {}
  );
  const [selectedColors, setSelectedColors] = useState<Record<number, number>>(
    {}
  );

  const handleSizeChange = (productId: number, sizeIndex: number) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: sizeIndex }));
    setSelectedColors((prev) => ({ ...prev, [productId]: 0 }));
  };

  return (
    <>
      {/* Header */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: TABLE_GRID,
          backgroundColor: "#567C8D",
          color: "white",
          py: 1.5,
          px: 1,
          borderRadius: "12px 12px 0 0",
          fontWeight: 600,
          fontSize: "0.8rem",
          textAlign: "center",
        }}
      >
        <Box>#</Box>
        <Box>Mã SP</Box>
        <Box>Hình</Box>
        <Box>Tên sản phẩm</Box>
        <Box>Giá</Box>
        <Box>Loại</Box>
        <Box>Size</Box>
        <Box>Màu sắc</Box>
        <Box>Tồn kho</Box>
        <Box>Tùy chỉnh</Box>
      </Box>

      {/* Body */}
      <Stack spacing={1.5} sx={{ mt: 1.5 }}>
        {loading && <CircularProgress sx={{ alignSelf: "center", my: 2 }} />}
        {!loading && products.length === 0 && (
          <Typography align="center" color="text.secondary" py={4}>
            Không tìm thấy sản phẩm nào
          </Typography>
        )}

        {!loading &&
          products.map((product, index) => {
            const sizeIdx = selectedSizes[product.id] ?? 0;
            const currentSize = product.sizes[sizeIdx] || {
              size: "N/A",
              colors: [],
            };
            const colorIdx = selectedColors[product.id] ?? 0;
            const currentColor =
              currentSize.colors[colorIdx] || currentSize.colors[0];
            const displayImage = currentColor?.avatar || product.avatar;

            return (
              <Box
                key={product.id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: TABLE_GRID,
                  backgroundColor: "white",
                  py: 2,
                  px: 1,
                  borderRadius: "12px",
                  alignItems: "center",
                  textAlign: "center",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                }}
              >
                <Typography color="#7f8c8d">
                  {index + 1 + (currentPage - 1) * pageSize}
                </Typography>
                <Typography fontWeight={600} fontSize="0.85rem" color="#2C3E50">
                  {product.productId}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src={displayImage}
                    alt=""
                    style={{
                      width: 45,
                      height: 45,
                      borderRadius: 4,
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Typography
                  fontWeight={600}
                  textAlign="left"
                  pl={1}
                  fontSize="0.9rem"
                  color="#2C3E50"
                >
                  {product.title}
                </Typography>
                <Typography fontWeight={700} fontSize="0.9rem" color="#2C3E50">
                  {currentColor?.price.toLocaleString() || "---"}
                </Typography>
                <Typography color="#7f8c8d" fontSize="0.85rem">
                  {product.category}
                </Typography>

                <Select
                  value={sizeIdx}
                  onChange={(e) =>
                    handleSizeChange(product.id, Number(e.target.value))
                  }
                  size="small"
                  sx={{ height: 28, fontSize: "0.75rem", color: "#2C3E50" }}
                >
                  {product.sizes.map((s, idx) => (
                    <MenuItem key={s.sizeID} value={idx}>
                      {s.size}
                    </MenuItem>
                  ))}
                </Select>

                <Box
                  sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}
                >
                  {currentSize.colors.map((c, idx) => (
                    <Box
                      key={c.colorId}
                      onClick={() =>
                        setSelectedColors((p) => ({ ...p, [product.id]: idx }))
                      }
                      sx={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        bgcolor: COLOR_DISPLAY_MAP[c.color] || "#ccc",
                        border:
                          (selectedColors[product.id] ?? 0) === idx
                            ? "2px solid #2C3E50"
                            : "1px solid #ddd",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </Box>

                <Typography fontWeight={700} color="#2C3E50">
                  {currentColor?.stock || 0}
                </Typography>
                <Box>
                  <IconButton
                    size="small"
                    sx={{ color: "#567C8D" }}
                    onClick={() => onEdit(product)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{ color: "#567C8D" }}
                    onClick={() => onDelete(product.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            );
          })}
      </Stack>
    </>
  );
};

export default ProductTable;
