import type { PromotionStatus } from "./types";

export const getStatusColor = (status: PromotionStatus): string => {
  switch (status) {
    case "Hoạt động":
      return "#2ECC71";
    case "Tạm dừng":
      return "#F1C40F";
    case "Hết hạn":
      return "#E74C3C";
    default:
      return "#000";
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
