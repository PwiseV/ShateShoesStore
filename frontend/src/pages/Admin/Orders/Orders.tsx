import React, { useState, useEffect } from "react";
import { Box, TextField, InputAdornment, Button, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../../../components/Admin/Header";
import SideBar from "../../../components/Admin/SideBar";

import FiltersModal from "./components/FiltersModal";
import OrdersTable from "./components/OrdersTable";
import OrderDetailDialog from "./components/OrderDetailDialog";
// formatCurrency used in child components; not needed here
import type { OrderData } from "./types";



const Orders: React.FC = () => {
  const [orders, setOrders] = useState<OrderData[]>([
    {
      id: "1",
      orderNumber: "ORD001",
      name: "Phạm Minh Phát",
      email: "phatminh@gmail.com",
      phone: "1234567890",
      address: "X12 khu Ủ, tp HCM",
      createdAt: "Jun 12,2023",
      total: 2000000,
      paymentMethod: "COD",
      status: "pending",
      items: [
        { id: "1", productName: "Nike Jordan 1 Low", sku: "SH01", quantity: 1, price: 1000000, total: 1000000 },
        { id: "2", productName: "Converse", sku: "SH21", quantity: 1, price: 400000, total: 400000 },
        { id: "3", productName: "New Balance", sku: "SH31", quantity: 1, price: 600000, total: 600000 },
      ],
    },
    {
      id: "2",
      orderNumber: "ORD002",
      name: "Phạm Minh Phát",
      email: "phatminh@gmail.com",
      phone: "1234567890",
      address: "X12 khu Ủ, tp HCM",
      createdAt: "Jun 12,2023",
      total: 2000000,
      paymentMethod: "Credit card",
      status: "paid",
      items: [],
    },
    {
      id: "3",
      orderNumber: "ORD003",
      name: "Phạm Minh Phát",
      email: "phatminh@gmail.com",
      phone: "1234567890",
      address: "X12 khu Ủ, tp HCM",
      createdAt: "Jun 12,2023",
      total: 2000000,
      paymentMethod: "Banking",
      status: "processing",
      items: [],
    },
    {
      id: "4",
      orderNumber: "ORD004",
      name: "Phạm Minh Phát",
      email: "phatminh@gmail.com",
      phone: "1234567890",
      address: "X12 khu Ủ, tp HCM",
      createdAt: "Jun 12,2023",
      total: 2000000,
      paymentMethod: "Paypal",
      status: "shipped",
      items: [],
    },
    {
      id: "5",
      orderNumber: "ORD005",
      name: "Phạm Minh Phát",
      email: "phatminh@gmail.com",
      phone: "1234567890",
      address: "X12 khu Ủ, tp HCM",
      createdAt: "Jun 12,2023",
      total: 2000000,
      paymentMethod: "Paypal",
      status: "delivered",
      items: [],
    },
    {
      id: "6",
      orderNumber: "ORD006",
      name: "Phạm Minh Phát",
      email: "phatminh@gmail.com",
      phone: "1234567890",
      address: "X12 khu Ủ, tp HCM",
      createdAt: "Jun 12,2023",
      total: 2000000,
      paymentMethod: "COD",
      status: "pending",
      items: [],
    },
    {
      id: "7",
      orderNumber: "ORD007",
      name: "Phạm Minh Phát",
      email: "phatminh@gmail.com",
      phone: "1234567890",
      address: "X12 khu Ủ, tp HCM",
      createdAt: "Jun 12,2023",
      total: 2000000,
      paymentMethod: "Credit card",
      status: "processing",
      items: [],
    },
    {
      id: "8",
      orderNumber: "ORD008",
      name: "Phạm Minh Phát",
      email: "phatminh@gmail.com",
      phone: "1234567890",
      address: "X12 khu Ủ, tp HCM",
      createdAt: "Jun 12,2023",
      total: 2000000,
      paymentMethod: "Banking",
      status: "shipped",
      items: [],
    },
    {
      id: "9",
      orderNumber: "ORD009",
      name: "Phạm Minh Phát",
      email: "phatminh@gmail.com",
      phone: "1234567890",
      address: "X12 khu Ủ, tp HCM",
      createdAt: "Jun 12,2023",
      total: 2000000,
      paymentMethod: "Paypal",
      status: "cancelled",
      items: [],
    },
    {
      id: "10",
      orderNumber: "ORD010",
      name: "Phạm Minh Phát",
      email: "phatminh@gmail.com",
      phone: "1234567890",
      address: "X12 khu Ủ, tp HCM",
      createdAt: "Jun 12,2023",
      total: 2000000,
      paymentMethod: "COD",
      status: "delivered",
      items: [],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState<OrderData[]>(orders);
  const [page, setPage] = useState(1);
  const [loading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [editedOrder, setEditedOrder] = useState<OrderData | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Filter states
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000000]);
   const [openFilterModal, setOpenFilterModal] = useState(false);

  const itemsPerPage = 9;

  useEffect(() => {
    const filtered = orders.filter((order) => {
      const matchSearch =
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.phone.includes(searchTerm);

      const matchStatus = !statusFilter || order.status === statusFilter;
      const matchPayment = !paymentFilter || order.paymentMethod === paymentFilter;
      const matchPrice = order.total >= priceRange[0] && order.total <= priceRange[1];

      return matchSearch && matchStatus && matchPayment && matchPrice;
    });

    setFilteredOrders(filtered);
    setPage(1);
  }, [searchTerm, orders, statusFilter, paymentFilter, priceRange]);

  const handleOpenDetail = (order: OrderData) => {
    setSelectedOrder(order);
    setEditedOrder({ ...order });
    setOpenDetailModal(true);
    setIsEditing(false);
  };

  const handleCloseDetail = () => {
    setOpenDetailModal(false);
    setSelectedOrder(null);
    setEditedOrder(null);
    setIsEditing(false);
  };

  const handleSaveChanges = () => {
    if (editedOrder) {
      setOrders(
        orders.map((o) => (o.id === editedOrder.id ? editedOrder : o))
      );
      setFilteredOrders(
        filteredOrders.map((o) => (o.id === editedOrder.id ? editedOrder : o))
      );
      setIsEditing(false);
      handleCloseDetail();
    }
  };

  const handleFieldChange = (field: keyof OrderData, value: any) => {
    if (editedOrder) {
      setEditedOrder({ ...editedOrder, [field]: value });
    }
  };

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (_event: unknown, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // using formatCurrency from ./utils

  return (
    <Box sx={{ display: "flex", gap: "20px", p: "20px", bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Sidebar */}
          <SideBar selectedMenu="Quản lý đơn hàng" />
          

      {/* Main Content */}
      <Box sx={{ flex: 1 }}>
        {/* Header */}
        <Header />

        {/* Content Container */}
        <Box sx={{ mt: "30px", mr: "20px", display: "flex", gap: "20px" }}>
          {/* Main Table Area */}
          <Box sx={{ width: "100%" }}>
            <Box component="section" sx={{ bgcolor: "#faf7ff", borderRadius: "16px", p: 3, boxShadow: "0 6px 18px rgba(92,106,196,0.06)" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography sx={{ fontSize: "22px", fontWeight: 700, color: "#2e2e2e" }}>Quản lý đơn hàng</Typography>

                <Box sx={{ display: "flex", gap: 1, alignItems: "center", width: "420px" }}>
                  <TextField
                    placeholder="Tìm kiếm..."
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                          
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                              <Button
                    variant="outlined"
                    onClick={() => setOpenFilterModal(true)}
                    sx={{ textTransform: "none", borderRadius: "20px", px: 2, color: "#5c6ac4", borderColor: "#e3def8" }}
                  >
                    Lọc
                              </Button>
                            </Box>

              <OrdersTable orders={paginatedOrders} loading={loading} onRowClick={handleOpenDetail} page={page} totalPages={totalPages} onPageChange={handlePageChange} />
            </Box>
          </Box>
        </Box>
      </Box>

      
      {/* Filter Modal (external component) */}
      <FiltersModal
        open={openFilterModal}
        onClose={() => setOpenFilterModal(false)}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        paymentFilter={paymentFilter}
        setPaymentFilter={setPaymentFilter}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        onClear={() => {
          setStatusFilter("");
          setPaymentFilter("");
          setPriceRange([0, 3000000]);
        }}
      />

      {/* Detail Modal (external component) */}
      <OrderDetailDialog
        open={openDetailModal}
        order={selectedOrder}
        editedOrder={editedOrder}
        isEditing={isEditing}
        onClose={handleCloseDetail}
        onEditToggle={(v) => setIsEditing(v)}
        onSave={handleSaveChanges}
        onFieldChange={handleFieldChange}
      />
    </Box>
  );
};

export default Orders;
