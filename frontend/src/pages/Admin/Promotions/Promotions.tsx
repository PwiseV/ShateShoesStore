import React, { useState, useEffect, useMemo } from "react";
import { Box, Button, Typography, Pagination } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// Layout
import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";
import SideBar from "../../../components/Admin/SideBar";

// Components
import FilterSection from "./components/FilterSection";
import PromotionList from "./components/PromotionList";
import PromotionModal from "./components/PromotionModal";

// Hooks & Types
import { usePromotions } from "./hooks/usePromotions";
import type { Promotion, PromotionFilterState } from "./types";
import { isDateExpired } from "./utils";

const ITEMS_PER_PAGE = 5; // Số lượng item mỗi trang

const Promotions: React.FC = () => {
  useEffect(() => {
    document.title = "SHATE - Quản lý khuyến mãi";
    window.scrollTo(0, 0);
  }, []);

  // Dữ liệu gốc (Database)
  const { promotions, setPromotions, handleDelete } = usePromotions();

  // State phân trang
  const [currentPage, setCurrentPage] = useState(1);

  // State Bộ lọc
  const [filters, setFilters] = useState<PromotionFilterState>({
    keyword: "",
    timeRange: "All", // "All" | "Newest" | "Oldest"
    discountType: "All", // "All" | "percentage" | "fixed"
    status: "All", // "All" | "Hoạt động" | "Tạm dừng" | "Hết hạn"
  });

  // State Modal (Form)
  const [openModal, setOpenModal] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(
    null
  );

  // --- 1. LOGIC LỌC & SẮP XẾP (QUAN TRỌNG) ---
  const filteredPromotions = useMemo(() => {
    let result = [...promotions];

    // A. Lọc theo Keyword (Mã hoặc Mô tả)
    if (filters.keyword) {
      const lowerKey = filters.keyword.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.code.toLowerCase().includes(lowerKey) ||
          (p.description && p.description.toLowerCase().includes(lowerKey))
      );
    }

    // B. Lọc theo Trạng thái
    if (filters.status !== "All") {
      result = result.filter((p) => p.status === filters.status);
    }

    // C. Lọc theo Loại giảm giá
    if (filters.discountType !== "All") {
      result = result.filter((p) => p.discountType === filters.discountType);
    }

    // D. Sắp xếp theo Thời gian (timeRange)
    // Giả sử: All/Newest = Mới nhất lên đầu, Oldest = Cũ nhất lên đầu
    if (filters.timeRange === "Oldest") {
      result.sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );
    } else {
      // Mặc định là Mới nhất (Newest hoặc All)
      result.sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      );
    }

    return result;
  }, [promotions, filters]);

  // --- 2. LOGIC PHÂN TRANG ---
  const totalPages = Math.ceil(filteredPromotions.length / ITEMS_PER_PAGE);
  const paginatedPromotions = filteredPromotions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset về trang 1 nếu thay đổi bộ lọc
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // --- HANDLERS ---
  const handleSearch = () => {
    // Logic search thực tế đã nằm trong useMemo (reactive),
    // hàm này có thể dùng để log hoặc trigger API nếu cần.
    console.log("Current Filters:", filters);
  };

  const handleCreateClick = () => {
    setEditingPromotion(null);
    setOpenModal(true);
  };

  const handleEditClick = (item: Promotion) => {
    setEditingPromotion(item);
    setOpenModal(true);
  };

  const handleSavePromotion = (formData: Partial<Promotion>) => {
    let finalStatus = formData.status || "Hoạt động";
    if (formData.endDate && isDateExpired(formData.endDate)) {
      finalStatus = "Hết hạn";
    }

    if (editingPromotion) {
      // UPDATE
      const updatedList = promotions.map((item) =>
        item.id === editingPromotion.id
          ? ({ ...item, ...formData, status: finalStatus as any } as Promotion)
          : item
      );
      setPromotions(updatedList);
    } else {
      // CREATE
      const newId =
        promotions.length > 0
          ? Math.max(...promotions.map((p) => p.id)) + 1
          : 1;
      const newPromo: Promotion = {
        id: newId,
        code: formData.code || "NEW",
        description: formData.description || "",
        discountType: formData.discountType || "percentage",
        discountValue: Number(formData.discountValue) || 0,
        minOrderValue: Number(formData.minOrderValue) || 0,
        startDate: formData.startDate || "",
        endDate: formData.endDate || "",
        totalQuantity: Number(formData.totalQuantity) || 0,
        remainingQuantity: Number(formData.totalQuantity) || 0,
        status: finalStatus as any,
      };
      setPromotions([newPromo, ...promotions]);
    }
    setOpenModal(false);
  };

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
        <SideBar selectedMenu="Quản lý khuyến mãi" />

        <Box
          sx={{
            backgroundColor: "#D3E2E9",
            borderRadius: "24px",
            p: 3,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            minHeight: "600px",
            display: "flex",
            flexDirection: "column",
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
              Quản lý khuyến mãi
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: "#567C8D",
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "8px",
                "&:hover": { backgroundColor: "#456372" },
              }}
              onClick={handleCreateClick}
            >
              Thêm mới
            </Button>
          </Box>

          {/* Truyền filters và setFilters xuống component con */}
          <FilterSection
            filters={filters}
            setFilters={setFilters}
            onSearch={handleSearch}
            onCreate={handleCreateClick}
          />

          {/* Render danh sách ĐÃ ĐƯỢC LỌC & PHÂN TRANG */}
          <PromotionList
            promotions={paginatedPromotions}
            onDelete={handleDelete}
            onEdit={handleEditClick}
          />

          {/* Phân trang */}
          <Box
            sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 1 }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, p) => setCurrentPage(p)}
              shape="rounded"
              sx={{
                "& .Mui-selected": {
                  bgcolor: "#567C8D !important",
                  color: "#fff",
                },
              }}
            />
          </Box>
        </Box>
      </div>
      <Footer />

      <PromotionModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSavePromotion}
        initialData={editingPromotion}
      />
    </div>
  );
};

export default Promotions;
