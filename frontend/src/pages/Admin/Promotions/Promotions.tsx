import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Box, Button, Typography, Pagination, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import * as promotionService from "../../../services/adminPromotionService.ts";

// Components, Layout, Types... (giữ nguyên)
import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";
import SideBar from "../../../components/Admin/SideBar";
import FilterSection from "./components/FilterSection";
import PromotionList from "./components/PromotionList";
import PromotionModal from "./components/PromotionModal";
import type { Promotion, PromotionFilterState } from "./types";

const Promotions: React.FC = () => {
  // --- STATES ---
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [filters, setFilters] = useState<PromotionFilterState>({
    keyword: "",
    discountType: "All",
    status: "All",
    timeRange: "",
  });

  const [openModal, setOpenModal] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);

  // --- 1. HÀM GỌI API CHÍNH ---
  const fetchPromotions = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 5,
        keyword: filters.keyword || undefined,
        discountType: filters.discountType === "All" ? undefined : filters.discountType,
        status: filters.status === "All" ? undefined : filters.status,
      };

      const response = await promotionService.getPromotions(params);
      
      // Map dữ liệu từ BE trả về state
      setPromotions(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters]);

  // Tự động gọi lại API khi trang hoặc bộ lọc thay đổi
  useEffect(() => {
    fetchPromotions();
  }, [fetchPromotions]);

  // --- 2. HANDLERS GỌI API THAY ĐỔI DỮ LIỆU ---

  const handleSavePromotion = async (formData: any) => {
    try {
      if (editingPromotion) {
        await promotionService.updatePromotion(editingPromotion.id, formData);
      } else {
        await promotionService.createPromotion(formData);
      }
      setOpenModal(false);
      fetchPromotions(); // Reload danh sách từ BE
    } catch (error: any) {
      alert(error); // Hiển thị lỗi nghiệp vụ từ BE
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khuyến mãi này?")) {
      try {
        await promotionService.deletePromotion(id);
        fetchPromotions(); // Reload danh sách
      } catch (error: any) {
        alert(error);
      }
    }
  };

  const handleEditClick = (item: Promotion) => {
    setEditingPromotion(item);
    setOpenModal(true);
  };

  const handleCreateClick = () => {
    setEditingPromotion(null);
    setOpenModal(true);
  };

  return (
    <div style={{ background: "#F5EFEB", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <div style={{ maxWidth: "1200px", margin: "2rem auto", width: "100%", display: "grid", gridTemplateColumns: "260px 1fr", gap: "2rem", padding: "0 2rem" }}>
        <SideBar selectedMenu="Quản lý khuyến mãi" />

        <Box sx={{ backgroundColor: "#D3E2E9", borderRadius: "24px", p: 3, display: "flex", flexDirection: "column", minHeight: "600px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>Quản lý khuyến mãi</Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateClick} sx={{ bgcolor: "#567C8D" }}>
              Thêm mới
            </Button>
          </Box>

          <FilterSection 
            filters={filters} 
            setFilters={(f) => { setFilters(f); setCurrentPage(1); }} 
            onSearch={fetchPromotions}
          />

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>
          ) : (
            <PromotionList 
              promotions={promotions} 
              onDelete={handleDelete} 
              onEdit={handleEditClick} 
            />
          )}

          <Box sx={{ display: "flex", justifyContent: "center", mt: "auto", pt: 3 }}>
            <Pagination 
              count={totalPages} 
              page={currentPage} 
              onChange={(_, p) => setCurrentPage(p)} 
              shape="rounded" 
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