import React from "react";
import { Box, TextField, InputAdornment, Button, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from '@mui/icons-material/Tune';
import OrdersTable from "./OrdersTable";
import FiltersModal from "./FiltersModal";
import OrderDetailDialog from "./OrderDetailDialog";
import type { OrderData } from "../types";

interface MainContentProps {
  orders: OrderData[];
  loading: boolean;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onRowClick: (order: OrderData) => void;
  page: number;
  totalPages: number;
  onPageChange: (e: any, v: number) => void;
  openFilterModal: boolean;
  onOpenFilterModal: (open: boolean) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  paymentFilter: string;
  setPaymentFilter: (payment: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  onClearFilters: () => void;
  openDetailModal: boolean;
  selectedOrder: OrderData | null;
  editedOrder: OrderData | null;
  isEditing: boolean;
  onCloseDetail: () => void;
  onEditToggle: (v: boolean) => void;
  onSaveChanges: () => void;
  onFieldChange: (field: keyof OrderData, value: any) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  orders,
  loading,
  searchTerm,
  onSearchChange,
  onRowClick,
  page,
  totalPages,
  onPageChange,
  openFilterModal,
  onOpenFilterModal,
  statusFilter,
  setStatusFilter,
  paymentFilter,
  setPaymentFilter,
  priceRange,
  setPriceRange,
  onClearFilters,
  openDetailModal,
  selectedOrder,
  editedOrder,
  isEditing,
  onCloseDetail,
  onEditToggle,
  onSaveChanges,
  onFieldChange,
}) => {
  return (
    <Box sx={{ width: "100%", overflow: "auto", minHeight: 0 }}>
      <Box component="section" sx={{ bgcolor: "#faf7ff", borderRadius: "16px", p: 2, boxShadow: "0 6px 18px rgba(92,106,196,0.06)", overflow: "hidden" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography sx={{ fontSize: "22px", fontWeight: 700, color: "#5D5A88" }}>Quản lý đơn hàng</Typography>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center", width: "420px" }}>
            <TextField
              placeholder="Tìm kiếm..."
              variant="outlined"
              size="small"
              fullWidth
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon sx={{ color: "#999" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                bgcolor: "#fff",
                borderRadius: "24px",
                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.03)",
              }}
            />
          </Box>
        </Box>

        <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onOpenFilterModal(true)}
            endIcon={<TuneIcon />}
            sx={{ textTransform: "none", color: "#000", borderRadius: "24px", bgcolor: "#FFDDDD", boxShadow: "0 4px 12px rgba(108,99,255,0.3)", '&:hover': { bgcolor: "#FFDDD" } }}
          >
            Lọc
          </Button>
        </Box>

        <OrdersTable
          orders={orders}
          loading={loading}
          onRowClick={onRowClick}
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </Box>

      {/* Filter Modal */}
      <FiltersModal
        open={openFilterModal}
        onClose={() => onOpenFilterModal(false)}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        paymentFilter={paymentFilter}
        setPaymentFilter={setPaymentFilter}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        onClear={onClearFilters}
      />

      {/* Detail Modal */}
      <OrderDetailDialog
        open={openDetailModal}
        order={selectedOrder}
        editedOrder={editedOrder}
        isEditing={isEditing}
        onClose={onCloseDetail}
        onEditToggle={onEditToggle}
        onSave={onSaveChanges}
        onFieldChange={onFieldChange}
      />
    </Box>
  );
};

export default MainContent;
