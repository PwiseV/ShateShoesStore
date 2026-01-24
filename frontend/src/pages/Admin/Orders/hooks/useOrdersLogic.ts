import { useState, useEffect } from "react";
import type { OrderData, OrderStatus, PaymentMethod } from "../types";
import { getAdminOrders } from "../../../../services/adminOrdersServices";
import { useToast } from "../../../../context/useToast";

export default function useOrdersLogic() {
  // ===== DATA =====
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { showToast } = useToast();

  // ===== FILTER =====
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | undefined>();
  const [paymentFilter, setPaymentFilter] = useState<PaymentMethod | undefined>();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50_000_000]);

  // ===== MODAL =====
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // ===== FETCH LIST =====
  const fetchOrders = async (currentPage = page) => {
    setLoading(true);
    try {
      const res = await getAdminOrders({
        page: currentPage,
        limit: itemsPerPage,
        keyword: searchTerm || undefined,
        status: statusFilter,
        paymentMethod: paymentFilter,
        minTotal: priceRange[0],
        maxTotal: priceRange[1],
      });

      // 🔥 FIX _id -> id (CHỖ QUAN TRỌNG NHẤT)
      const mappedOrders: OrderData[] = res.data.map((o: any) => ({
        ...o,
        id: o._id,
      }));

      setOrders(mappedOrders);
      setTotalPages(res.pagination.totalPages);
    } catch (err) {
      console.error(err);
      showToast("Lỗi tải danh sách đơn hàng", "error");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, statusFilter, paymentFilter, priceRange]);

  // ===== ACTIONS =====
  const handleOpenDetail = (order: OrderData) => {
    setSelectedOrderId(order.id); // ✅ giờ chắc chắn có id
    setOpenDetailModal(true);
  };

  const handleCloseDetail = () => {
    setOpenDetailModal(false);
    setSelectedOrderId(null);
  };

  const handlePageChange = (_: unknown, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    // data
    paginatedOrders: orders,
    loading,
    page,
    totalPages,

    // filter
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    paymentFilter,
    setPaymentFilter,
    priceRange,
    setPriceRange,

    // modal
    openFilterModal,
    setOpenFilterModal,
    openDetailModal,
    selectedOrderId,

    // actions
    handleOpenDetail,
    handleCloseDetail,
    handlePageChange,
    fetchOrders,
  };
}
