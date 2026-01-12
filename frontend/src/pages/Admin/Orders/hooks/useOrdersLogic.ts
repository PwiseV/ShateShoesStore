import { useEffect, useState } from "react";
import type { OrderData, UpdateOrderPayload } from "../types";
import {
  getAdminOrders,
  updateAdminOrder,
} from "../../../../services/adminOrdersServices"; // Import từ file service đã chỉnh

export default function useOrdersLogic() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(false);

  // Pagination & Filter States
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000000]);

  // Modal States
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [editedOrder, setEditedOrder] = useState<OrderData | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // 1. Fetch Orders (GET)
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await getAdminOrders({
        page,
        limit: itemsPerPage,
        keyword: searchTerm,
        status: statusFilter,
        paymentMethod: paymentFilter,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      });

      setOrders(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch when dependencies change
  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchTerm, statusFilter, paymentFilter, priceRange]);

  // Handle Modal Actions
  const handleOpenDetail = (order: OrderData) => {
    setSelectedOrder(order);
    setEditedOrder({ ...order }); // Clone object để edit không ảnh hưởng list gốc ngay
    setOpenDetailModal(true);
    setIsEditing(false);
  };

  const handleCloseDetail = () => {
    setOpenDetailModal(false);
    setSelectedOrder(null);
    setEditedOrder(null);
    setIsEditing(false);
  };

  // 2. Handle Save Changes (PATCH)
  const handleSaveChanges = async () => {
    if (!editedOrder) return;

    try {
      setLoading(true);

      // ✅ Chuẩn hóa Payload: Chỉ gửi những gì cần thiết
      const payload: UpdateOrderPayload = {
        name: editedOrder.name,
        phone: editedOrder.phone,
        address: editedOrder.address,
        status: editedOrder.status,
        paymentMethod: editedOrder.paymentMethod,
        // Map items để chỉ lấy field cần thiết gửi về BE
        items: editedOrder.items.map((item) => ({
          id: item.id,
          sku: item.sku,
          quantity: item.quantity,
        })),
      };

      // Gọi API PATCH
      const response = await updateAdminOrder(editedOrder.id, payload);

      // ✅ Cập nhật UI ngay lập tức từ response.data (Server Authority)
      const updatedOrderFromServer = response.data;

      setOrders((prevOrders) =>
        prevOrders.map((o) =>
          o.id === updatedOrderFromServer.id ? updatedOrderFromServer : o
        )
      );

      // Update lại selectedOrder để UI Modal hiển thị đúng dữ liệu mới nhất
      setSelectedOrder(updatedOrderFromServer);
      setEditedOrder(updatedOrderFromServer);

      alert(response.message || "Cập nhật thành công!");
      setIsEditing(false);
      handleCloseDetail(); // Hoặc giữ lại Modal tùy trải nghiệm UX bạn muốn
    } catch (error: any) {
      console.error("Update failed:", error);
      alert(error.message || "Có lỗi xảy ra khi cập nhật");
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field: keyof OrderData, value: any) => {
    if (editedOrder) {
      setEditedOrder({ ...editedOrder, [field]: value });
    }
  };

  const handlePageChange = (_event: unknown, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    paginatedOrders: orders, // API đã trả về đúng page nên không cần slice ở FE nữa
    loading,
    searchTerm,
    setSearchTerm,
    page,
    totalPages,
    handlePageChange,
    openFilterModal,
    setOpenFilterModal,
    statusFilter,
    setStatusFilter,
    paymentFilter,
    setPaymentFilter,
    priceRange,
    setPriceRange,
    handleOpenDetail,
    handleCloseDetail,
    openDetailModal,
    selectedOrder,
    editedOrder,
    isEditing,
    setIsEditing,
    handleSaveChanges,
    handleFieldChange,
  };
}
