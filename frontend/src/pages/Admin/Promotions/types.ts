export type PromotionStatus = "Hoạt động" | "Tạm dừng" | "Hết hạn";
export type DiscountType = "percentage" | "fixed";

// Interface cho bộ lọc
export interface PromotionFilterState {
  keyword: string;
  timeRange: string;
  discountType: string;
  status: string;
}

// Interface chính cho Promotion
export interface Promotion {
  id: number;
  code: string;
  description?: string; // Có thể null
  discountType: DiscountType;
  discountValue: number;
  minOrderValue: number;
  startDate: string;
  endDate: string;
  totalQuantity: number;
  remainingQuantity: number;
  status: PromotionStatus;
}
