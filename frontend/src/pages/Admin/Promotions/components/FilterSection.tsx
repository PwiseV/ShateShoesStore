import React, { useState } from "react";
import { Box } from "@mui/material";
import PromotionFilterBar from "./PromotionFilterBar";
import PromotionFilterModal from "./PromotionFilterModal";
import type { PromotionFilterState } from "../types";

interface FilterSectionProps {
  filters: PromotionFilterState;
  setFilters: React.Dispatch<React.SetStateAction<PromotionFilterState>>;
  onSearch: () => void;
  onCreate: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  setFilters,
  onSearch,
  onCreate,
}) => {
  const [openModal, setOpenModal] = useState(false);

  // Logic kiểm tra xem có đang lọc không (để hiện chấm đỏ)
  const isFiltered =
    filters.discountType !== "All" ||
    filters.status !== "All";

  // Hàm update keyword (search)
  const handleKeywordChange = (newKeyword: string) => {
    setFilters((prev) => ({ ...prev, keyword: newKeyword }));
  };

  // Hàm xóa bộ lọc (Reset về mặc định)
  const handleClearFilters = () => {
    setFilters((prev) => ({
      ...prev,
      discountType: "All",
      status: "All",
    }));
    setOpenModal(false);
  };

  // Hàm áp dụng từ Modal
  const handleApplyFilters = (newFilters: PromotionFilterState) => {
    setFilters(newFilters);
    setOpenModal(false);
  };

  return (
    <Box sx={{ mb: 3 }}>
      {/* Thanh tìm kiếm & Nút mở bộ lọc */}
      <PromotionFilterBar
        keyword={filters.keyword}
        onKeywordChange={handleKeywordChange}
        onOpenFilter={() => setOpenModal(true)}
        isFiltered={isFiltered}
        // Nếu bạn muốn nút "Thêm mới" nằm ở đây thì truyền props này
        // onAdd={onCreate}
      />

      {/* Modal bộ lọc nâng cao */}
      <PromotionFilterModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        currentFilters={filters}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />
    </Box>
  );
};

export default FilterSection;
