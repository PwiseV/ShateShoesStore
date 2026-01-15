import { useState, useEffect } from "react";
import type { OrderData, UpdateOrderPayload } from "../types";
import {
  getAdminOrders,
  updateAdminOrder,
} from "../../../../services/adminOrdersServices";
import { useToast } from "../../../../context/useToast"; // ✅ Import useToast

export default function useOrdersLogic() {
  // --- 1. Data & Loading States ---
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { showToast } = useToast(); // ✅ Sử dụng Toast

  // --- 2. Filter States ---
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000000]);

  // --- 3. Modal States ---
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [editedOrder, setEditedOrder] = useState<OrderData | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // --- 4. Fetch Logic ---
  const fetchOrders = async (currentPage = page) => {
    setLoading(true);
    // console.log("Fetching orders...", { currentPage, searchTerm, statusFilter });
    try {
      const response = await getAdminOrders({
        page: currentPage,
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
      showToast("Lỗi tải danh sách đơn hàng", "error"); // ✅ Toast lỗi
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // --- 5. Side Effects (Auto fetch) ---
  useEffect(() => {
    fetchOrders(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, statusFilter, paymentFilter, priceRange]);
  // Lưu ý: searchTerm thường nên handle riêng (debounce) hoặc bấm nút mới search,
  // nhưng ở đây giữ nguyên logic cũ của bạn là dependency change thì fetch.

  // --- 6. Modal Actions ---
  const handleOpenDetail = (order: OrderData) => {
    setSelectedOrder(order);
    setEditedOrder({ ...order }); // Clone để edit
    setOpenDetailModal(true);
    setIsEditing(false);
  };

  const handleCloseDetail = () => {
    setOpenDetailModal(false);
    setSelectedOrder(null);
    setEditedOrder(null);
    setIsEditing(false);
  };

  const handleFieldChange = (field: keyof OrderData, value: any) => {
    if (editedOrder) {
      setEditedOrder({ ...editedOrder, [field]: value });
    }
  };

  // --- 7. Update Logic (PATCH) ---
  const handleSaveChanges = async () => {
    if (!editedOrder) return;

    try {
      setLoading(true);

      // Chuẩn hóa Payload
      const payload: UpdateOrderPayload = {
        name: editedOrder.name,
        phone: editedOrder.phone,
        address: editedOrder.address,
        email: editedOrder.email, // Thêm email nếu cần
        status: editedOrder.status,
        paymentMethod: editedOrder.paymentMethod,
        // Backend chỉ cần status/info, không cần items vì items read-only
        // Tuy nhiên nếu API yêu cầu items thì map lại như cũ:
      };

      // Gọi API
      const response = await updateAdminOrder(editedOrder.id, payload);

      // Cập nhật UI từ response server (nếu có data trả về)
      // Nếu API updateAdminOrder trả về { message, data }, ta dùng data đó
      const updatedOrderFromServer = response.data || { ...editedOrder };

      setOrders((prevOrders) =>
        prevOrders.map((o) =>
          o.id === updatedOrderFromServer.id ? updatedOrderFromServer : o
        )
      );

      // Update state modal
      setSelectedOrder(updatedOrderFromServer);
      setEditedOrder(updatedOrderFromServer);

      showToast("Cập nhật đơn hàng thành công!", "success"); // ✅ Toast success
      setIsEditing(false);

      // Tùy chọn: Có thể đóng modal hoặc refresh lại list
      // handleCloseDetail();
      // fetchOrders(page);
    } catch (error: any) {
      console.error("Update failed:", error);
      showToast(error.message || "Có lỗi xảy ra khi cập nhật", "error"); // ✅ Toast error
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (_event: unknown, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const refreshData = () => fetchOrders(page);

  return {
    // Data
    paginatedOrders: orders,
    loading,
    page,
    totalPages,

    // Filters
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    paymentFilter,
    setPaymentFilter,
    priceRange,
    setPriceRange,

    // Modal States
    openFilterModal,
    setOpenFilterModal,
    openDetailModal,
    // setOpenDetailModal, // Nếu cần expose
    selectedOrder,
    editedOrder,
    isEditing,
    setIsEditing,

    // Actions
    handlePageChange,
    handleOpenDetail,
    handleCloseDetail,
    handleSaveChanges,
    handleFieldChange,
    fetchOrders,
    refreshData,
  };
}
