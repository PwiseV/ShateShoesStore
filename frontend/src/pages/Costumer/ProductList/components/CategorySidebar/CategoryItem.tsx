import React, { useState } from "react";
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

// Import Type từ Service (Nếu dùng fake thì đổi tên file thành fakeProductListServices)
import type { ParentCategory } from "../../../services/productListServices";

type CategoryItemProps = {
  category: ParentCategory;
  onSelect: (categoryName: string) => void;
};

const CategoryItem: React.FC<CategoryItemProps> = ({ category, onSelect }) => {
  const [open, setOpen] = useState(false);

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
            color: "#2F4156",
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
          {category.category.map((child) => (
            <ListItemButton
              key={child.id}
              sx={{
                pl: 4,
                py: 0.5,
                borderRadius: "8px",
                "&:hover": {
                  bgcolor: "rgba(0,0,0,0.04)",
                  color: "#2C3E50",
                },
              }}
              onClick={() => onSelect(child.name)}
            >
              <ListItemText
                primary={child.name}
                primaryTypographyProps={{
                  fontSize: "0.95rem",
                  color: "#555",
                  fontWeight: 400,
                  fontFamily: '"Lexend", sans-serif',
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </Box>
  );
};

export default CategoryItem;
