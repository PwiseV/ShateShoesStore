import { useEffect, useState } from "react";
import type { OrderData } from "../types";
import { getAdminOrderDetail } from "../../../../services/adminOrdersServices";
import { useToast } from "../../../../context/useToast";

export function useOrderDetailLogic(orderId: string | null) {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (!orderId) {
      setOrder(null);
      return;
    }

    setLoading(true);

    getAdminOrderDetail(orderId)
      .then((data: any) => {
        // 🔥 MAP _id -> id
        setOrder({
          ...data,
          id: data._id,
          items: data.items?.map((i: any) => ({
            ...i,
            id: i._id,
          })),
        });
      })
      .catch(() => {
        showToast("Không tải được chi tiết đơn hàng", "error");
      })
      .finally(() => setLoading(false));
  }, [orderId, showToast]);

  return {
    order,
    loading,
    isLocked:
      order?.status === "cancelled" || order?.status === "delivered",
  };
}
