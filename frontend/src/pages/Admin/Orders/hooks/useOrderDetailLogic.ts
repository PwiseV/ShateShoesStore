import { useEffect, useState } from "react";
import type { OrderData } from "../types";
import { getAdminOrderDetail } from "../../../../services/adminOrdersServices";
import { useToast } from "../../../../context/useToast";

export function useOrderDetailLogic(orderId?: string | null) {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (!orderId) return;

    setLoading(true);
    getAdminOrderDetail(orderId)
      .then((data) => {
        setOrder(data);
      })
      .catch(() => {
        showToast("Không tải được chi tiết đơn hàng", "error");
      })
      .finally(() => setLoading(false));
  }, [orderId]);

  const isLocked =
    order?.status === "cancelled" || order?.status === "delivered";

  return {
    order,
    setOrder,
    loading,
    isLocked,
  };
}
