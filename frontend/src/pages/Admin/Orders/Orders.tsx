import React, { useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Pagination,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";

// Layout
import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";
import SideBar from "../../../components/Admin/SideBar";

// Modular Components
import OrdersTable from "./components/OrdersTable";
import FiltersModal from "./components/FiltersModal";
import OrderDetailDialog from "./components/OrderDetailDialog";

// Hooks
import useOrdersLogic from "./hooks/useOrdersLogic";
import { useOrderDetailLogic } from "./hooks/useOrderDetailLogic";

const Orders: React.FC = () => {
  useEffect(() => {
    document.title = "SHATE - Quản lý đơn hàng";
    window.scrollTo(0, 0);
  }, []);

  /**
   * ===== 1. LOGIC LIST (BẢNG ĐƠN HÀNG) =====
   */
  
  const {
    paginatedOrders,
    loading,
    searchTerm,
    setSearchTerm,
    page,
    totalPages,
    handlePageChange,
    openFilterModal,
    setOpenFilterModal,
    statusFilter,
    setStatusFilter,
    paymentFilter,
    setPaymentFilter,
    priceRange,
    setPriceRange,
    handleOpenDetail,
    handleCloseDetail,
    openDetailModal,
    selectedOrderId,
    editedOrder,
    isEditing,
    setIsEditing,
    handleSaveChanges,
    handleFieldChange,
    setEditedOrder,
  } = useOrdersLogic();

  /**
   * ===== 2. LOGIC DETAIL (GET /orders/:id) =====
   */

  const {
    order: selectedOrder,
    loading: detailLoading,
    isLocked,
  } = useOrderDetailLogic(selectedOrderId || undefined);

  useEffect(() => {
    if (selectedOrder) {
      setEditedOrder(selectedOrder);
      setIsEditing(false);
    }
  }, [selectedOrder, setEditedOrder, setIsEditing]);

  const handleClearFilters = () => {
    setStatusFilter("");
    setPaymentFilter("");
    setPriceRange([0, 50000000]);
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
        <SideBar selectedMenu="Quản lý đơn hàng" />

        <Box
          sx={{
            backgroundColor: "#D3E2E9",
            borderRadius: "24px",
            p: 3,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#2C3E50" }}>
              Quản lý đơn hàng
            </Typography>
            {/* Bạn có thể thêm nút Export hoặc Thêm mới ở đây nếu cần */}
          </Box>

          {/* Filter Bar Section (Mô phỏng ProductFilterBar) */}
          <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "center" }}>
            <TextField
              variant="outlined"
              placeholder="Tìm kiếm đơn hàng, khách hàng, SĐT..."
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                flex: 1,
                backgroundColor: "#FFF",
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "& fieldset": { borderColor: "transparent" },
                  "&:hover fieldset": { borderColor: "transparent" },
                  "&.Mui-focused fieldset": { borderColor: "transparent" },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#999" }} />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              onClick={() => setOpenFilterModal(true)}
              startIcon={<TuneIcon />}
              sx={{
                backgroundColor: "#FFF",
                color: "#2C3E50",
                textTransform: "none",
                boxShadow: "none",
                borderRadius: "8px",
                height: "40px",
                fontWeight: 600,
                px: 3,
                "&:hover": { backgroundColor: "#F5F5F5", boxShadow: "none" },
              }}
            >
              Lọc
            </Button>
          </Box>

          {/* Table Section */}
          <OrdersTable
            orders={paginatedOrders}
            loading={loading}
            onRowClick={handleOpenDetail}
          />

          {/* Pagination Section */}
          <Box
            sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 1 }}
          >
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              shape="rounded"
              color="primary"
            />
          </Box>
        </Box>
      </div>
      <Footer />

      {/* --- MODALS --- */}
      <FiltersModal
        open={openFilterModal}
        onClose={() => setOpenFilterModal(false)}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        paymentFilter={paymentFilter}
        setPaymentFilter={setPaymentFilter}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        onClear={handleClearFilters}
      />

      <OrderDetailDialog
        open={openDetailModal}
        order={selectedOrder}
        editedOrder={editedOrder}
        isEditing={isEditing}
        onClose={handleCloseDetail}
        onEditToggle={setIsEditing}
        onSave={handleSaveChanges}
        onFieldChange={handleFieldChange}
      />
    </div>
  );
};

export default Orders;
