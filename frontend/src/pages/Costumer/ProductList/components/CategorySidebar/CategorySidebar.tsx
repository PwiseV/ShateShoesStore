import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, ListItemButton, Typography } from "@mui/material";
import CategoryItem from "./CategoryItem";
import type { ParentCategory } from "../../../services/productListServices";
import GridViewIcon from "@mui/icons-material/GridView";

type Props = {
  categories: ParentCategory[];
  //onSelect: (cat: string) => void;
  selectedCategory: string;
};

const CategorySidebar = ({ categories, selectedCategory }: Props) => {
  const navigate = useNavigate();

  // Hàm xử lý: Chuyển hướng URL thay vì set state
  const handleSelectCategory = (slug: string) => {
    if (slug === "") {
      navigate("/products");
    } else {
      navigate(`/products/${slug}`);
    }
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "transparent" }}>
      {/* --- 1. MỤC "TẤT CẢ" (Thêm mới) --- */}
      <ListItemButton
        onClick={() => handleSelectCategory("")} // Truyền rỗng để reset filter
        sx={{
          py: 1,
          mb: 1,
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
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
          onSelect={handleSelectCategory}
          selectedCategory={selectedCategory}
        />
      ))}
    </Box>
  );
};

export default CategorySidebar;
