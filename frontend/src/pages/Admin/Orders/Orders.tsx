import React from "react";
import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";
import SideBar from "../../../components/Admin/SideBar";
import MainContent from "./components/MainContent";

import useOrdersLogic from "./hooks/useOrdersLogic";

const Orders: React.FC = () => {
  

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
    selectedOrder,
    editedOrder,
    isEditing,
    setIsEditing,
    handleSaveChanges,
    handleFieldChange,
  } = useOrdersLogic();

  return (
    <div
      style={{
        background: "#f5f5f5",
        borderRadius: "40px",
        minHeight: "100vh",
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
        <MainContent
          orders={paginatedOrders}
          loading={loading}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onRowClick={handleOpenDetail}
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          openFilterModal={openFilterModal}
          onOpenFilterModal={setOpenFilterModal}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          paymentFilter={paymentFilter}
          setPaymentFilter={setPaymentFilter}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          onClearFilters={() => {
            setStatusFilter("");
            setPaymentFilter("");
            setPriceRange([0, 3000000]);
          }}
          openDetailModal={openDetailModal}
          selectedOrder={selectedOrder}
          editedOrder={editedOrder}
          isEditing={isEditing}
          onCloseDetail={handleCloseDetail}
          onEditToggle={setIsEditing}
          onSaveChanges={handleSaveChanges}
          onFieldChange={handleFieldChange}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
