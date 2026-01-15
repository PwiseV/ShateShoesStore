import type { OrderData } from "../types";

// Mock available products - Có thể giữ lại nếu sau này cần dùng, hoặc xóa nếu không cần
export const mockProducts = [
  { id: "p1", name: "Nike Jordan 1 Low", sku: "SH01", price: 1000000 },
  { id: "p2", name: "Converse", sku: "SH21", price: 400000 },
  { id: "p3", name: "New Balance", sku: "SH31", price: 600000 },
  { id: "p4", name: "Adidas Ultraboost 22", sku: "SH02", price: 750000 },
  { id: "p5", name: "Puma RS-X Reinvention", sku: "SH03", price: 500000 },
];

interface UseOrderDetailLogicProps {
  editedOrder: OrderData | null;
  onFieldChange: (field: keyof OrderData, value: any) => void;
}

export function useOrderDetailLogic({ editedOrder }: UseOrderDetailLogicProps) {
  // Logic tính tổng tiền (Dù không sửa sản phẩm, nhưng giữ hàm này để logic thống nhất)
  const calculateTotal = () => {
    return editedOrder?.items?.reduce((sum, item) => sum + item.total, 0) || 0;
  };

  return {
    calculateTotal,
  };
}
