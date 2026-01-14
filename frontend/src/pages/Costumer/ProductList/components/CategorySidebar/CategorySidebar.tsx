import React from "react";
import { Box, ListItemButton, Typography } from "@mui/material";
import CategoryItem from "./CategoryItem";
import type { ParentCategory } from "../../../services/productListServices";
import GridViewIcon from "@mui/icons-material/GridView"; // Icon cho đẹp

type Props = {
  categories: ParentCategory[];
  onSelect: (cat: string) => void;
  selectedCategory: string; // [THÊM] Prop này để biết đang chọn mục nào
};

const CategorySidebar = ({ categories, onSelect, selectedCategory }: Props) => {
  return (
    <Box sx={{ width: "100%", bgcolor: "transparent" }}>
      {/* --- 1. MỤC "TẤT CẢ" (Thêm mới) --- */}
      <ListItemButton
        onClick={() => onSelect("")} // Truyền rỗng để reset filter
        sx={{
          py: 1,
          mb: 1, // Cách các mục dưới 1 chút
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          // Logic đổi màu: Nếu selectedCategory là rỗng -> Highlight màu đỏ
          bgcolor: selectedCategory === "" ? "rgba(0,0,0,0.04)" : "transparent",
          "&:hover": {
            bgcolor: "rgba(0,0,0,0.04)",
          },
        }}
      >
        <GridViewIcon sx={{ fontSize: 20 }} />
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: 700,
            fontFamily: '"Lexend", sans-serif',
          }}
        >
          Tất cả sản phẩm
        </Typography>
      </ListItemButton>

      {/* --- 2. DANH SÁCH DANH MỤC TỪ API --- */}
      {categories.map((parentCat) => (
        <CategoryItem
          key={parentCat.id}
          category={parentCat}
          onSelect={onSelect}
        />
      ))}
    </Box>
  );
};

export default CategorySidebar;
