import type { PromotionStatus } from "./types";

export const getStatusColor = (status: PromotionStatus): string => {
  switch (status) {
    case "active":
      return "#27AE60"; 
    case "upcoming":
      return "#2D9CDB"; 
    case "inactive":
      return "#F2994A"; 
    case "expired":
      return "#EB5757"; 
    default:
      return "#828282"; 
  }
};
// Hàm kiểm tra xem ngày có hết hạn so với hôm nay không
export const isDateExpired = (dateString: string): boolean => {
  if (!dateString) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset giờ về 0h sáng để so sánh chính xác ngày

  const targetDate = new Date(dateString);

  // Nếu ngày đích nhỏ hơn hôm nay -> Hết hạn
  return targetDate < today;
};
