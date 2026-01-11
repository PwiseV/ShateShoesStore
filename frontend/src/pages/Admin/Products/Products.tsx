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
import ProductFiltersModal from "./components/ProductFiltersModal";

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

  // --- Edit Color Detail State (Đã bổ sung activeSize và activeProductId) ---
  const [editingColor, setEditingColor] = useState<Colors | null>(null);
  const [activeSize, setActiveSize] = useState<string>("");
  const [activeProductId, setActiveProductId] = useState<number>(0);
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

  const handleEditColorClick = (
    sIdx: number,
    cIdx: number,
    sizeData: any,
    sizeName: string,
    pId: number
  ) => {
    console.log("Cha đã nhận lệnh mở Modal Màu:", { sizeName, pId, cIdx });
    const colorData =
      cIdx === -1 || !sizeData.colors ? null : sizeData.colors[cIdx];
    setEditingColor(colorData);
    setActiveSize(sizeName); 
    setActiveProductId(pId); 

    setOpenColorEdit(true);
  };

  const handleFilterApply = () => {
    setCurrentPage(1);
    fetchProducts(1);
  };

  const handleFilterClear = () => {
    setFilterCategory("All");
    setFilterPriceRange([0, 10000000]);
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

      {/* --- CÁC MODAL QUẢN LÝ --- */}

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

      {/* Modal Chỉnh sửa thông tin sản phẩm & Danh sách Size */}
      <ProductEditModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        product={editingProduct}
        onSuccess={refreshData}
        // Hứng 5 tham số từ ProductEditModal và truyền vào handler
        onEditColor={(sIdx, cIdx, sizeData, sizeName, pId) =>
          handleEditColorClick(sIdx, cIdx, sizeData, sizeName, pId)
        }
      />

      {/* Modal Chỉnh sửa chi tiết Màu & Kho (Biến thể) */}
      <ColorEditModal
        open={openColorEdit}
        onClose={() => setOpenColorEdit(false)}
        colorData={editingColor}
        size={activeSize} // Truyền size đã lưu
        productId={activeProductId} // Truyền productId đã lưu
        onSuccess={() => {
          refreshData();
          setOpenColorEdit(false);
          // Để cập nhật lại UI của Modal ProductEdit, ta nên đóng nó hoặc fetch lại editingProduct
          setOpenEdit(false);
        }}
      />
    </div>
  );
};

export default Products;
