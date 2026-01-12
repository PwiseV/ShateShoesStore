export const statusConfig: Record<string, { label: string; color: "error" | "warning" | "success" | "info" | "done" | "default" }> = {
  pending: { label: "Chờ duyệt", color: "warning" },
  processing: { label: "Đang xử lý", color: "info" },
  shipped: { label: "Đã gửi hàng", color: "done" },
  delivered: { label: "Đã giao", color: "success" },
  cancelled: { label: "Đã hủy", color: "error" },
};

export const paymentStatusConfig: Record<string, { label: string; color: "error" | "warning" | "success" | "default" }> = {
  COD: { label: "COD", color: "warning" },
  "Credit card": { label: "Credit card", color: "warning" },
  Banking: { label: "Banking", color: "success" },
  Paypal: { label: "Paypal", color: "success" },
};
