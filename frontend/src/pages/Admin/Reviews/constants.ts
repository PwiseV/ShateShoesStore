export const statusConfig: Record<string, { label: string; color: "warning" | "info" | "success" | "done" | "error" }> = {
  pending: { label: "Chờ duyệt", color: "warning" },
  approved: { label: "Đã duyệt", color: "success" },
  rejected: { label: "Ẩn", color: "error" },
};

export const starConfig: Record<number, string> = {
  1: "1 sao",
  2: "2 sao",
  3: "3 sao",
  4: "4 sao",
  5: "5 sao",
};
