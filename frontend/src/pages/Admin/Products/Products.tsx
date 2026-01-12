import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Pagination, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// Layout & Components
import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";
import SideBar from "../../../components/Admin/SideBar";
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
  const [openEdit, setOpenEdit] = useState(false);
  const [openColorEdit, setOpenColorEdit] = useState(false);

  // --- Data States ---
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingColor, setEditingColor] = useState<Colors | null>(null);
  const [activeSize, setActiveSize] = useState<string>("");
  const [activeProductId, setActiveProductId] = useState<number>(0);

  // --- QUAN TRỌNG: Tự động cập nhật dữ liệu Modal cha khi refreshData ---
  useEffect(() => {
    if (openEdit && editingProduct) {
      const updated = products.find(p => p.productId === editingProduct.productId);
      if (updated) {
        setEditingProduct(updated); // Cập nhật lại state để Modal cha thấy data mới
      }
    }
  }, [products]); // Chạy mỗi khi danh sách sản phẩm thay đổi

  useEffect(() => {
    document.title = "SHATE - Quản lý sản phẩm";
    window.scrollTo(0, 0);
  }, []);

  // --- Handlers ---
  const handleSearch = () => {
    setCurrentPage(1);
    fetchProducts(1);
  };

  const handleEditProductClick = (product: Product) => {
    setEditingProduct(product);
    setOpenEdit(true);
  };

  const handleEditColorClick = (sIdx: number, cIdx: number, sizeData: any, sizeName: string, pId: number) => {
    const colorData = cIdx === -1 || !sizeData.colors ? null : sizeData.colors[cIdx];
    setEditingColor(colorData);
    setActiveSize(sizeName); 
    setActiveProductId(pId); 
    setOpenColorEdit(true);
  };

  // Thành công khi sửa Thông tin chính -> Đóng modal
  const handleMainSuccess = () => {
    refreshData();
    setOpenEdit(false);
  };

  // Thành công khi sửa Biến thể (Màu/Kho) -> KHÔNG đóng modal cha
  const handleVariantSuccess = () => {
    refreshData(); // Gọi để useEffect trên cập nhật dữ liệu mới
    setOpenColorEdit(false); // Chỉ đóng modal con
  };

  const handleFilterClear = () => {
    setFilterCategory("All");
    setFilterPriceRange([0, 10000000]);
  };

  return (
    <div style={{ background: "#F5EFEB", borderRadius: "40px", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <div style={{ maxWidth: "1200px", margin: "2rem auto", width: "100%", display: "grid", gridTemplateColumns: "260px 1fr", gap: "2rem", padding: "0 2rem", boxSizing: "border-box" }}>
        <SideBar selectedMenu="Quản lý sản phẩm" />

        <Box sx={{ backgroundColor: "#D3E2E9", borderRadius: "24px", p: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#2C3E50" }}>Quản lý sản phẩm</Typography>
            <Button variant="contained" startIcon={<AddIcon />} sx={{ backgroundColor: "#567C8D" }} onClick={() => setOpenCreate(true)}>Thêm mới</Button>
          </Box>

          <ProductFilterBar
            keyword={keyword} setKeyword={setKeyword} onSearch={handleSearch}
            onOpenFilter={() => setOpenFilter(true)}
            isFiltered={filterCategory !== "All" || filterPriceRange[0] !== 0 || filterPriceRange[1] !== 10000000}
          />

          <ProductTable loading={loading} products={products} currentPage={currentPage} pageSize={10} onEdit={handleEditProductClick} onDelete={handleDeleteProduct} />

          <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 1 }}>
            <Pagination count={totalPages} page={currentPage} onChange={(_, p) => setCurrentPage(p)} shape="rounded" color="primary" />
          </Box>
        </Box>
      </div>
      <Footer />

      {/* --- CÁC MODAL QUẢN LÝ --- */}
      <ProductFiltersModal open={openFilter} onClose={() => setOpenFilter(false)} categoryFilter={filterCategory} setCategoryFilter={setFilterCategory} priceRange={filterPriceRange} setPriceRange={setFilterPriceRange} onClear={handleFilterClear} />
      
      <ProductCreateModal open={openCreate} onClose={() => setOpenCreate(false)} onSuccess={refreshData} />

      {/* Modal Cha - Chỉnh sửa thông tin chính */}
      <ProductEditModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        product={editingProduct}
        onSuccess={handleMainSuccess}
        onEditColor={handleEditColorClick}
      />

      {/* Modal Con - Chỉnh sửa Màu & Kho */}
      <ColorEditModal
        open={openColorEdit}
        onClose={() => setOpenColorEdit(false)}
        colorData={editingColor}
        size={activeSize}
        productId={activeProductId}
        onSuccess={handleVariantSuccess} // Sử dụng hàm success dành riêng cho biến thể
      />
    </div>
  );
};

export default Products;