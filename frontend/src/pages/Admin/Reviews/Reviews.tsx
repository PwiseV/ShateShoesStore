import { useEffect } from "react";
import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";
import SideBar from "../../../components/Admin/SideBar";
import MainContent from "./components/MainContent";
import { useReviewsLogic } from "./hooks/useReviewsLogic";

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
    setCurrentPage,
    totalPages,
    handleApplyFilters,
    handleDeleteReview,
    handleUpdateReviewStatus,
  } = useReviewsLogic();

  return (
    <div
      style={{
        background: "#F5EFEB",
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
        <SideBar selectedMenu={selectedMenu} />
        <main
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "2rem",
            minHeight: "600px",
          }}
        >
          <MainContent
            reviews={reviews}
            loading={loading}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={totalPages}
            onApplyFilters={handleApplyFilters}
            onDelete={handleDeleteReview}
            onUpdateStatus={handleUpdateReviewStatus}
          />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Reviews;
