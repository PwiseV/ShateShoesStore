import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import type { ParentCategory } from "../../../services/productListServices";

type CategoryItemProps = {
  category: ParentCategory;
  onSelect: (slug: string) => void;
  selectedCategory: string;
};

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  onSelect,
  selectedCategory,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasSelectedChild = category.category.some(
      (child) => child.slug === selectedCategory
    );
    if (hasSelectedChild) setOpen(true);
  }, [category, selectedCategory]);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ mb: 1 }}>
      {/* 1. CẤP CHA  */}
      <ListItemButton
        onClick={handleClick}
        sx={{
          py: 1,
          borderRadius: "8px",
          display: "flex",
          justifyContent: "space-between",
          "&:hover": {
            bgcolor: "rgba(0,0,0,0.04)",
            color: "#2C3E50",
          },
        }}
      >
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: 600,
            fontFamily: '"Lexend", sans-serif',
            color: "#2C3E50",
          }}
        >
          {category.name}
        </Typography>

        {open ? (
          <ExpandLess sx={{ color: "#718096", fontSize: 20 }} />
        ) : (
          <ExpandMore sx={{ color: "#718096", fontSize: 20 }} />
        )}
      </ListItemButton>

      {/* 2. CẤP CON */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {category.category.map((child) => {
            // So sánh theo SLUG
            const isSelected = selectedCategory === child.slug;
            return (
              <ListItemButton
                key={child.id}
                onClick={() => onSelect(child.slug)} // Truyền slug
                sx={{
                  pl: 4,
                  py: 0.5,
                  borderRadius: "8px",
                  color: "#2C3E50",
                  bgcolor: isSelected ? "rgba(0,0,0,0.08)" : "transparent", // Highlight
                  "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
                }}
              >
                <ListItemText
                  primary={child.name}
                  primaryTypographyProps={{
                    fontWeight: isSelected ? 600 : 400,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </Box>
  );
};
export default CategoryItem;
