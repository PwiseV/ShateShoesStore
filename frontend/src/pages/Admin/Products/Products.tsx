import React, { useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "../../../components/Admin/SideBar";
import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";

/* =======================
   Interfaces
======================= */
interface SizeOption {
  size: string;
  price: number;
  quantity: number;
  colors: string[];
}

interface Product {
  id: number;
  image: string;
  name: string;
  category: string;
  sizes: SizeOption[];
  search: number;
}

const Products: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Lưu size đang chọn cho mỗi product
  const [selectedSizes, setSelectedSizes] = useState<Record<number, number>>(
    {}
  );

  // Dữ liệu mẫu
  const products: Product[] = [
    {
      id: 1,
      image: "/imgs/giay-ballet-no-de-thap-nhieu-mau-nu.avif",
      name: "Nike Air Force 1",
      category: "New",
      search: 12,
      sizes: [
        {
          size: "38",
          price: 1300000,
          quantity: 10,
          colors: ["red", "yellow"],
        },
        {
          size: "39",
          price: 1350000,
          quantity: 5,
          colors: ["green", "orange"],
        },
      ],
    },
    {
      id: 2,
      image: "/imgs/giay-ballet-no-de-thap-nhieu-mau-nu.avif",
      name: "Adidas Stan Smith",
      category: "Sale",
      search: 8,
      sizes: [
        {
          size: "37",
          price: 1200000,
          quantity: 7,
          colors: ["green"],
        },
        {
          size: "38",
          price: 1250000,
          quantity: 3,
          colors: ["red", "yellow"],
        },
      ],
    },
  ];

  const handleSizeChange = (productId: number, sizeIndex: number) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: sizeIndex,
    }));
  };

  const getSelectedSize = (product: Product) => {
    const index = selectedSizes[product.id] ?? 0;
    return product.sizes[index];
  };

  const colorMap: Record<string, string> = {
    red: "#FF6B6B",
    yellow: "#FFD93D",
    green: "#6BCF7F",
    orange: "#FFA500",
  };

  const totalPages = 9;

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          maxWidth: "1400px",
          mx: "auto",
          mt: 4,
          px: 3,
          flex: 1,
        }}
      >
        {/* Sidebar */}
        <SideBar selectedMenu="Quản lý sản phẩm" />

        {/* Content Area */}
        <Box sx={{ flex: 1, pb: 4 }}>
          {/* Header Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#2C3E50" }}>
              Quản lý sản phẩm
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#567C8D",
                color: "white",
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                px: 4,
                py: 1,
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#486172",
                },
              }}
            >
              Thêm mới
            </Button>
          </Box>

          {/* Table Container */}
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            {/* Table Header */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns:
                  "60px 120px 200px 120px 100px 80px 120px 100px 100px",
                backgroundColor: "#567C8D",
                color: "white",
                fontWeight: 600,
                fontSize: "0.95rem",
                p: 2,
              }}
            >
              <Box>#</Box>
              <Box>Hình sản phẩm</Box>
              <Box>Tên sản phẩm</Box>
              <Box>Giá</Box>
              <Box>Loại</Box>
              <Box>Size</Box>
              <Box>Màu sắc</Box>
              <Box>Tìm kiếm</Box>
              <Box>Tùy chọn</Box>
            </Box>

            {/* Table Rows */}
            {products.map((product, index) => (
              <Box
                key={product.id}
                sx={{
                  display: "grid",
                  gridTemplateColumns:
                    "60px 120px 200px 120px 100px 80px 120px 100px 100px",
                  alignItems: "center",
                  p: 2,
                  borderBottom: "1px solid #E8E8E8",
                  "&:hover": {
                    backgroundColor: "#F9F9F9",
                  },
                }}
              >
                <Box sx={{ color: "#666", fontSize: "0.9rem" }}>
                  {(currentPage - 1) * 6 + index + 1}
                </Box>
                <Box>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
                <Box sx={{ fontSize: "0.9rem", color: "#333" }}>
                  {product.name}
                </Box>
                <Box sx={{ fontSize: "0.9rem", color: "#333" }}>
                  {getSelectedSize(product)?.price
                    ? getSelectedSize(product).price.toLocaleString()
                    : "-"}
                </Box>

                <Box sx={{ fontSize: "0.9rem", color: "#666" }}>
                  {product.category}
                </Box>
                <Box>
                  <select
                    value={selectedSizes[product.id] ?? 0}
                    onChange={(e) =>
                      handleSizeChange(product.id, Number(e.target.value))
                    }
                    style={{
                      padding: "6px",
                      borderRadius: "6px",
                      border: "1px solid #CCC",
                    }}
                  >
                    {product.sizes.map((s, idx) => (
                      <option key={idx} value={idx}>
                        {s.size}
                      </option>
                    ))}
                  </select>
                </Box>
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  {getSelectedSize(product).colors.map((color, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        backgroundColor: colorMap[color] || "#CCC",
                      }}
                    />
                  ))}
                </Box>
                <Box sx={{ fontSize: "0.9rem", color: "#666" }}>
                  {product.search}
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    size="small"
                    sx={{
                      color: "#567C8D",
                      "&:hover": { backgroundColor: "#E8F0F2" },
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{
                      color: "#567C8D",
                      "&:hover": { backgroundColor: "#FFE8E8" },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Pagination */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              mt: 3,
            }}
          >
            {[1, 2, 3, "...", 8, 9].map((page, idx) => (
              <Button
                key={idx}
                onClick={() => typeof page === "number" && setCurrentPage(page)}
                disabled={page === "..."}
                sx={{
                  minWidth: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor:
                    currentPage === page ? "#567C8D" : "transparent",
                  color: currentPage === page ? "white" : "#567C8D",
                  fontWeight: 600,
                  border: "1px solid #567C8D",
                  "&:hover": {
                    backgroundColor:
                      currentPage === page ? "#486172" : "#E8F0F2",
                  },
                  "&.Mui-disabled": {
                    color: "#CCC",
                    border: "none",
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Products;
