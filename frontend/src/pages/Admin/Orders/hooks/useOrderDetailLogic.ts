import type { OrderData } from "../types";

interface UseOrderDetailLogicProps {
  editedOrder: OrderData | null;
  onFieldChange: (field: keyof OrderData, value: any) => void;
}

export function useOrderDetailLogic({ editedOrder, onFieldChange }: UseOrderDetailLogicProps) {
  
  // Hàm tính tổng tiền dựa trên mảng items thật từ Backend
  const calculateTotal = () => {
    if (!editedOrder || !editedOrder.items) return 0;
    
    // BE đã trả về trường 'total' (price * quantity) cho từng item rồi
    return editedOrder.items.reduce((sum, item) => sum + (item.total || 0), 0);
  };

  // Trả về những gì cần thiết để UI hiển thị
  return {
    calculateTotal,
  };
}