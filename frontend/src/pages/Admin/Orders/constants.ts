export const statusConfig: Record<
  string,
  {
    label: string;
    color: "error" | "warning" | "success" | "info" | "done" | "default";
  }
> = {
  waittingApproval: { label: "Chờ duyệt", color: "warning" },
  processing: { label: "Đang xử lý", color: "info" },
  shipped: { label: "Đã gửi hàng", color: "done" },
  delivered: { label: "Đã giao", color: "success" },
  cancelled: { label: "Đã hủy", color: "error" },
};

export const paymentStatusConfig: Record<
  string,
  { label: string; color: "error" | "warning" | "success" | "default" }
> = {
  COD: { label: "Thanh toán khi nhận hàng (COD)", color: "warning" },
  Banking: { label: "Chuyển khoản ngân hàng", color: "success" },
};
