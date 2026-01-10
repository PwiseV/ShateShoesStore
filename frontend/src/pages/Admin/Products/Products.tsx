import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Pagination, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// Layout
import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";
import SideBar from "../../../components/Admin/SideBar";

// Modular Components
import ProductFilterBar from "./components/ProductFilterBar";
import ProductTable from "./components/ProductTable";
import ProductCreateModal from "./components/ProductCreateModal";
import ProductEditModal from "./components/ProductEditModal";
import ColorEditModal from "./components/ColorEditModal";
import ProductFiltersModal from "./components/ProductFiltersModal"; // Assuming this exists from previous step

// Hooks & Types
import { useProductData } from "./hooks/useProductData";
import type { Product, Colors } from "../Products/types";

const Products: React.FC = () => {
  useEffect(() => {
    document.title = "SHATE - Quản lý sản phẩm";
    window.scrollTo(0, 0);
  }, []);

  // --- Logic & State from Hook ---
  const {
    products,
    loading,
    currentPage,
    totalPages,
    keyword,
    filterCategory,
    filterPriceRange,
    setKeyword,
    setFilterCategory,
    setFilterPriceRange,
    setCurrentPage,
    handleDeleteProduct,
    refreshData,
    fetchProducts,
  } = useProductData();

  // --- Modal States ---
  const [openCreate, setOpenCreate] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  // Edit Product State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [openEdit, setOpenEdit] = useState(false);

  // Edit Color Detail State
  const [editingColor, setEditingColor] = useState<Colors | null>(null);
  const [openColorEdit, setOpenColorEdit] = useState(false);

  // Handlers
  const handleSearch = () => {
    setCurrentPage(1);
    fetchProducts(1);
  };

  const handleEditProductClick = (product: Product) => {
    setEditingProduct(product);
    setOpenEdit(true);
  };

  const handleEditColorClick = (sIdx: number, cIdx: number) => {
    // Note: We need the actual product to get color data.
    // Since ProductEditModal is open, editingProduct is set.
    if (editingProduct && editingProduct.sizes[sIdx]) {
      setEditingColor(editingProduct.sizes[sIdx].colors[cIdx]);
      setOpenColorEdit(true);
    }
  };

  const handleFilterApply = () => {
    setCurrentPage(1);
    fetchProducts(1);
  };

  const handleFilterClear = () => {
    setFilterCategory("All");
    setFilterPriceRange([0, 10000000]);
    // fetchProducts triggered by useEffect
  };

  return (
    <div
      style={{
        background: "#F5EFEB",
        borderRadius: "40px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <div
        style={{
          maxWidth: "1200px",
          margin: "2rem auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          gap: "2rem",
          padding: "0 2rem",
          boxSizing: "border-box",
        }}
      >
        <SideBar selectedMenu="Quản lý sản phẩm" />

        <Box
          sx={{
            backgroundColor: "#D3E2E9",
            borderRadius: "24px",
            p: 3,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#2C3E50" }}>
              Quản lý sản phẩm
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ backgroundColor: "#567C8D" }}
              onClick={() => setOpenCreate(true)}
            >
              Thêm mới
            </Button>
          </Box>

          <ProductFilterBar
            keyword={keyword}
            setKeyword={setKeyword}
            onSearch={handleSearch}
            onOpenFilter={() => setOpenFilter(true)}
            isFiltered={
              filterCategory !== "All" ||
              filterPriceRange[0] !== 0 ||
              filterPriceRange[1] !== 10000000
            }
          />

          <ProductTable
            loading={loading}
            products={products}
            currentPage={currentPage}
            pageSize={10}
            onEdit={handleEditProductClick}
            onDelete={handleDeleteProduct}
          />

          <Box
            sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 1 }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, p) => setCurrentPage(p)}
              shape="rounded"
              color="primary"
            />
          </Box>
        </Box>
      </div>
      <Footer />

      {/* --- MODALS --- */}
      <ProductFiltersModal
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        categoryFilter={filterCategory}
        setCategoryFilter={setFilterCategory}
        priceRange={filterPriceRange}
        setPriceRange={setFilterPriceRange}
        onClear={handleFilterClear}
      />

      <ProductCreateModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSuccess={refreshData}
      />

      <ProductEditModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        product={editingProduct}
        onSuccess={refreshData}
        onEditColor={(sIdx, cIdx) => handleEditColorClick(sIdx, cIdx)}
      />

      <ColorEditModal
        open={openColorEdit}
        onClose={() => setOpenColorEdit(false)}
        colorData={editingColor}
        onSuccess={() => {
          // Khi sửa màu xong, cần refresh lại data tổng (bao gồm cả modal edit đang mở nếu có)
          refreshData();
          // Optional: Reload editingProduct state if needed, or rely on parent fetch
          // Simple way: Close edit modal too or re-fetch product details
          setOpenEdit(false);
        }}
      />
    </div>
  );
};

export default Products;
