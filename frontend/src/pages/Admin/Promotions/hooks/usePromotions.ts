import { useState, useEffect } from "react";
import { MOCK_PROMOTIONS } from "../constants";
import type { Promotion } from "../types";
import { isDateExpired } from "../utils";

export const usePromotions = () => {
  // Logic khởi tạo state: Quét qua Mock Data và update status nếu hết hạn
  const [promotions, setPromotions] = useState<Promotion[]>(() => {
    return MOCK_PROMOTIONS.map((promo) => {
      if (isDateExpired(promo.endDate) && promo.status !== "Hết hạn") {
        return { ...promo, status: "Hết hạn" };
      }
      return promo;
    });
  });

  const handleDelete = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa mã này?")) {
      setPromotions((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return {
    promotions,
    setPromotions,
    handleDelete,
  };
};
