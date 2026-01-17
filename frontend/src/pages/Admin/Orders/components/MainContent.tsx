import React from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";

import OrdersTable from "./OrdersTable";
import FiltersModal from "./FiltersModal";
import OrderDetailDialog from "./OrderDetailDialog";

import type { OrderData, OrderStatus, PaymentMethod } from "../types";

interface MainContentProps {
  orders: OrderData[];
  loading: boolean;

  searchTerm: string;
  onSearchChange: (term: string) => void;

  onRowClick: (order: OrderData) => void;

  openFilterModal: boolean;
  onOpenFilterModal: (open: boolean) => void;

  statusFilter?: OrderStatus;
  setStatusFilter: (v?: OrderStatus) => void;

  paymentFilter?: PaymentMethod;
  setPaymentFilter: (v?: PaymentMethod) => void;

  priceRange: [number, number];
  setPriceRange: (v: [number, number]) => void;

  onClearFilters: () => void;

  openDetailModal: boolean;
  selectedOrderId: string | null;
  onCloseDetail: () => void;
  onUpdated: () => void;
}

const MainContent: React.FC<MainContentProps> = ({
  orders,
  loading,
  searchTerm,
  onSearchChange,
  onRowClick,

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
  selectedOrderId,
  onCloseDetail,
  onUpdated,
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ p: 2, borderRadius: 3, bgcolor: "#faf7ff" }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography fontSize={22} fontWeight={700}>
            Quản lý đơn hàng
          </Typography>

          <TextField
            size="small"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: 360, bgcolor: "#fff", borderRadius: 3 }}
          />
        </Box>

        {/* Filter */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            endIcon={<TuneIcon />}
            onClick={() => onOpenFilterModal(true)}
            sx={{ bgcolor: "#FFDDDD", color: "#000" }}
          >
            Lọc
          </Button>
        </Box>

        {/* Table */}
        <OrdersTable
          orders={orders}
          loading={loading}
          onRowClick={onRowClick}
        />
      </Box>

      {/* Modals */}
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

      <OrderDetailDialog
        open={openDetailModal}
        orderId={selectedOrderId}
        onClose={onCloseDetail}
        onUpdated={onUpdated}
      />
    </Box>
  );
};

export default MainContent;
