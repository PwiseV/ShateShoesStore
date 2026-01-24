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

// Components
import OrdersTable from "./components/OrdersTable";
import FiltersModal from "./components/FiltersModal";
import OrderDetailDialog from "./components/OrderDetailDialog";

// Hooks
import useOrdersLogic from "./hooks/useOrdersLogic";

const Orders: React.FC = () => {
  useEffect(() => {
    document.title = "SHATE - Quản lý đơn hàng";
    window.scrollTo(0, 0);
  }, []);

  const {
    // data
    paginatedOrders,
    loading,
    page,
    totalPages,

    // search & filter
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    paymentFilter,
    setPaymentFilter,
    priceRange,
    setPriceRange,

    // modal
    openFilterModal,
    setOpenFilterModal,
    openDetailModal,
    selectedOrderId,

    // actions
    handleOpenDetail,
    handleCloseDetail,
    handlePageChange,
    fetchOrders,
  } = useOrdersLogic();

  const handleClearFilters = () => {
    setStatusFilter(undefined);
    setPaymentFilter(undefined);
    setPriceRange([0, 50000000]);
  };

  return (
    <div
      style={{
        background: "#F5EFEB",
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
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5" fontWeight={700} color="#2C3E50">
              Quản lý đơn hàng
            </Typography>
          </Box>

          {/* Search & Filter */}
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Tìm kiếm đơn hàng, khách hàng, SĐT..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                backgroundColor: "#FFF",
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "& fieldset": { borderColor: "transparent" },
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
              startIcon={<TuneIcon />}
              onClick={() => setOpenFilterModal(true)}
              sx={{
                backgroundColor: "#FFF",
                color: "#2C3E50",
                textTransform: "none",
                boxShadow: "none",
                borderRadius: "8px",
                px: 3,
                "&:hover": { backgroundColor: "#F5F5F5" },
              }}
            >
              Lọc
            </Button>
          </Box>

          {/* Table */}
          <OrdersTable
            orders={paginatedOrders}
            loading={loading}
            onRowClick={handleOpenDetail}
          />

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
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

      {/* Filters Modal */}
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

      {/* Detail Modal */}
      <OrderDetailDialog
        open={openDetailModal}
        orderId={selectedOrderId}
        onClose={handleCloseDetail}
        onUpdated={fetchOrders}
      />
    </div>
  );
};

export default Orders;
