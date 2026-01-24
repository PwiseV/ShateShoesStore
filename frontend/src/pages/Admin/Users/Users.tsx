import React, { useState, useEffect } from "react";
import { Box, Typography, Pagination } from "@mui/material";

import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";
import SideBar from "../../../components/Admin/SideBar";
import UserFilterBar from "./components/UserFilterBar";
import UserTable from "./components/UserTable";
import UserDetailModal from "./components/UserDetailModal";
import UserFiltersModal from "./components/UserFiltersModal";

import { useUserData } from "./hooks/useUserData";
import type { User } from "./types"; // Chú ý đường dẫn types

const Users: React.FC = () => {
  const {
    users,
    loading,
    currentPage,
    totalPages,
    keyword,
    setKeyword,
    filters,
    applyFilters,
    clearFilters,
    setCurrentPage,
    handleUpdateUser, // Hàm update gọi API
    fetchUsers, // Hàm fetch data
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
    fetchUsers(1); // Gọi tìm kiếm ngay
  };

  // Mở Modal xem chi tiết
  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setDetailMode("view");
    setOpenDetail(true);
  };

  // --- LOGIC SAVE ĐƯỢC CẬP NHẬT ---
  const handleSaveUser = async (userId: string, updatedData: Partial<User>) => {
    console.log("Saving user:", userId, updatedData);

    // Gọi hàm update trong hook (đã bao gồm gọi API và show toast)
    await handleUpdateUser(userId, updatedData);

    setOpenDetail(false); // Đóng modal sau khi lưu thành công
  };

  const isFiltered =
    filters.role !== "All" ||
    filters.status !== "All" ||
    filters.sortMoney !== "default";

  return (
    <div
      style={{
        background: "#F5EFEB",
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

          <UserTable loading={loading} users={users} onEdit={handleViewUser} />

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

      <UserFiltersModal
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        currentFilters={filters}
        onApply={applyFilters}
        onClear={clearFilters}
      />

      <UserDetailModal
        open={openDetail}
        user={selectedUser}
        initialMode={detailMode}
        onClose={() => setOpenDetail(false)}
        onSave={handleSaveUser} // Truyền đúng hàm xử lý save mới
      />
    </div>
  );
};

export default Users;
