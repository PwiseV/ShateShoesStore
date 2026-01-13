import React, { useState, useEffect } from "react";
import { Box, Typography, Pagination } from "@mui/material";

import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";
import SideBar from "../../../components/Admin/SideBar";
import UserFilterBar from "./components/UserFilterBar";
import UserTable from "./components/UserTable";
import UserDetailModal from "./components/UserDetailModal";
import UserFiltersModal from "./components/UserFiltersModal"; // Modal Lọc Mới

import { useUserData } from "./hooks/useUserData";
import type { User } from "./type";

const Users: React.FC = () => {
  const {
    users, // Danh sách user (đã được lọc tự động bởi hook)
    loading,
    currentPage,
    totalPages,
    keyword,
    setKeyword,
    filters,
    applyFilters,
    clearFilters, // Các hàm xử lý lọc
    setCurrentPage,
    // handleDeleteUser,
    handleUpdateUser, // <-- QUAN TRỌNG: Hàm để lưu chỉnh sửa
    // refreshData,
  } = useUserData();

  // State Modal
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [detailMode, setDetailMode] = useState<"view" | "edit">("view");
  const [openDetail, setOpenDetail] = useState(false);

  useEffect(() => {
    document.title = "SHATE - Quản lý người dùng";
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  // Mở Modal xem chi tiết
  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setDetailMode("view");
    setOpenDetail(true);
  };

  // Hàm xử lý khi bấm LƯU ở Modal Chi Tiết
  const handleSaveUser = (updatedUser: User) => {
    console.log("Đang lưu user:", updatedUser);
    handleUpdateUser(updatedUser); // Cập nhật vào list chính
    setOpenDetail(false); // Đóng modal
  };

  // Check xem có đang filter không để hiện chấm đỏ
  const isFiltered =
    filters.role !== "All" ||
    filters.status !== "All" ||
    filters.sortMoney !== "default";

  return (
    <div
      style={{
        background: "#F5EFEB",
        borderRadius: "40px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Lexend', sans-serif",
      }}
    >
      <Header />

      <div
        style={{
          maxWidth: "1200px",
          margin: "2rem auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "260px minmax(0, 1fr)",
          gap: "2rem",
          padding: "0 2rem",
          boxSizing: "border-box",
        }}
      >
        <SideBar selectedMenu="Quản lý người dùng" />

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
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#2C3E50",
                fontFamily: "'Lexend', sans-serif",
              }}
            >
              Quản lý người dùng
            </Typography>
          </Box>

          <UserFilterBar
            keyword={keyword}
            setKeyword={setKeyword}
            onSearch={handleSearch}
            onOpenFilter={() => setOpenFilter(true)}
            isFiltered={isFiltered}
          />

          <UserTable
            loading={loading}
            users={users}
            onEdit={handleViewUser} // Nút mắt/sửa
            // onDelete={handleDeleteUser} // Nếu bạn muốn dùng lại xóa thì uncomment
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
              sx={{
                "& .MuiPaginationItem-root": {
                  fontFamily: "'Lexend', sans-serif",
                },
              }}
            />
          </Box>
        </Box>
      </div>
      <Footer />

      {/* --- MODAL LỌC (Style giống ProductFilter) --- */}
      <UserFiltersModal
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        currentFilters={filters}
        onApply={applyFilters}
        onClear={clearFilters}
      />

      {/* --- MODAL CHI TIẾT (Xem & Sửa) --- */}
      <UserDetailModal
        open={openDetail}
        user={selectedUser}
        initialMode={detailMode}
        onClose={() => setOpenDetail(false)}
        onSave={handleSaveUser} // Kết nối hàm lưu
      />
    </div>
  );
};

export default Users;
