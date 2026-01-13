export type PromotionStatus = "active" | "inactive" | "expired" | "upcoming";
export type DiscountType = "percentage" | "fixed";

// Interface cho bộ lọc
export interface PromotionFilterState {
  keyword: string;
  timeRange: string;
  discountType: string;
  status: string;
}


export interface Promotion {
  id: number;
  code: string;
  description?: string; 
  discountType: DiscountType;
  discountAmount: number;
  minOrderValue: number;
  startDate: string;
  endDate: string;
  totalQuantity: number;
  status: PromotionStatus;
}
