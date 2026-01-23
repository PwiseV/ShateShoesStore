import { useEffect } from "react";
import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";
import SideBar from "../../../components/Admin/SideBar";
import MainContent from "./components/MainContent";
import { useReviewsLogic } from "./hooks/useReviewsLogic";
import { Typography, Box } from "@mui/material";

const selectedMenu = "Quản lý đánh giá";

const Reviews = () => {
  useEffect(() => {
    document.title = "SHATE - Reviews Management";
    window.scrollTo(0, 0);
  }, []);

  const {
    reviews,
    loading,
    searchTerm,
    setSearchTerm,
    currentPage,
    handlePageChange,
    totalPages,
    handleApplyFilters,
    handleDeleteReview,
    handleUpdateReviewStatus,
  } = useReviewsLogic();

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
        <SideBar selectedMenu={selectedMenu} />
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
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#2C3E50" }}>
              Quản lý sản phẩm
            </Typography>
          </Box>
          <MainContent
            reviews={reviews}
            loading={loading}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPages}
            onApplyFilters={handleApplyFilters}
            onDelete={handleDeleteReview}
            onUpdateStatus={handleUpdateReviewStatus}
          ></MainContent>
        </Box>
      </div>
      <Footer />
    </div>
    
  );
};

export default Reviews;
