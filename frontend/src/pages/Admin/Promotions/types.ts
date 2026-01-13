export type PromotionStatus = "active" | "inactive" | "expired" | "upcoming";
export type DiscountType = "percentage" | "fixed";

// Interface cho bộ lọc
export interface PromotionFilterState {
  keyword: string;
  endDate: string;
  startDate: string;
  discountType: string;
  status: string;
}


export interface Promotion {
  id: number;
  code: string;
  description?: string; 
  discountType: DiscountType;
  discountAmount: number;
  minOrderAmount: number;
  startDate: string;
  endDate: string;
  totalQuantity: number;
  status: PromotionStatus;
}

export const STATUS_MAP = {
  active: "Hoạt động",
  upcoming: "Sắp diễn ra",
  expired: "Hết hạn",
  inactive: "Tạm dừng"
};