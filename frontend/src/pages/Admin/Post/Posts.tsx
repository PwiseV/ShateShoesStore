import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// Components
import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";
import SideBar from "../../../components/Admin/SideBar";
import PostFilter from "../Post/components/PostFilter";
import PostTable from "../Post/components/PostTable";
import PostModal from "../Post/components/PostModal";

// Hooks
import { usePosts } from "../Post/hooks/usePosts";

const Posts: React.FC = () => {
  const {
    loading,
    posts,
    currentPage,
    totalPages,
    setCurrentPage,
    keyword,
    setKeyword,
    filterCategory,
    setFilterCategory,
    filterMonth,
    setFilterMonth,
    availableMonths,
    openModal,
    setOpenModal,
    isEditMode,
    formData,
    setFormData,
    handleFilter,
    handleResetFilter,
    handleDelete,
    handleToggleStatus,
    handleOpenAdd,
    handleOpenEdit,
    handleFileChange,
    handleSubmitModal,
  } = usePosts();

  useEffect(() => {
    document.title = "SHATE - Quản lý bài viết";
    window.scrollTo(0, 0);
  }, []);

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
        <SideBar selectedMenu="Quản lý bài viết" />

        {/* CONTENT */}
        <Box
          sx={{
            backgroundColor: "#D3E2E9",
            borderRadius: "24px",
            p: 3,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          {/* HEADER SECTION */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#2C3E50" }}>
              Quản lý bài viết
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: "#567C8D",
                textTransform: "none",
                fontWeight: 600,
              }}
              onClick={handleOpenAdd}
            >
              Thêm mới
            </Button>
          </Box>

          {/* FILTER BAR */}
          <PostFilter
            keyword={keyword}
            setKeyword={setKeyword}
            filterMonth={filterMonth}
            setFilterMonth={setFilterMonth}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            availableMonths={availableMonths}
            onFilter={handleFilter}
            onReset={handleResetFilter}
          />

          {/* POST TABLE */}
          <Box>
            <PostTable
              loading={loading}
              posts={posts}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
            />
          </Box>
        </Box>
      </div>
      <Footer />

      {/* MODAL */}
      <PostModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        isEditMode={isEditMode}
        formData={formData}
        setFormData={setFormData}
        onFileChange={handleFileChange}
        onSubmit={handleSubmitModal}
      />
    </div>
  );
};

export default Posts;
