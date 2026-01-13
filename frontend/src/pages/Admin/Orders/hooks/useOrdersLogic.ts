import { useEffect, useState } from "react";
import type { OrderData } from "../types";
// import { getAdminOrders } from "../../../../services/fakeAdminServices";
import { getAdminOrders, updateAdminOrder } from "../../../../services/adminServices";

export default function useOrdersLogic() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState<OrderData[]>(orders);
  const [page, setPage] = useState(1);
  const [loading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [editedOrder, setEditedOrder] = useState<OrderData | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Filter states
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [openFilterModal, setOpenFilterModal] = useState(false);

  const itemsPerPage = 9;

  useEffect(() => {
    let active = true;
    const fetchOrders = async () => {
      try {
      // 1. Gọi API thật với đầy đủ params
      const res = await getAdminOrders({
        page,
        pageSize: itemsPerPage,
        keyword: searchTerm,
        status: statusFilter,
        paymentMethod: paymentFilter,
        minPrice: priceRange[0],
        maxPrice: priceRange[1]
      });

      if (!active) return;

      // 2. Set thẳng dữ liệu từ BE vào state
      setOrders(res.data as OrderData[]);
      setFilteredOrders(res.data as OrderData[]);
      setTotalPages(Math.ceil(res.total / itemsPerPage));
      
    } catch (err) {
      console.error("Lỗi lấy data thật:", err);
    }
    };

    fetchOrders();

    return () => { active = false };
  }, [searchTerm, statusFilter, paymentFilter, priceRange, page]);

  // Apply filters when orders change (e.g., after save)
  // useEffect(() => {
  //   const filtered = orders.filter((order) => {
  //     const matchSearch =
  //       order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       order.phone.includes(searchTerm);

  //     const matchStatus = !statusFilter || order.status === statusFilter;
  //     const matchPayment = !paymentFilter || order.paymentMethod === paymentFilter;
  //     const matchPrice = order.total >= priceRange[0] && order.total <= priceRange[1];

  //     return matchSearch && matchStatus && matchPayment && matchPrice;
  //   });

  //   setFilteredOrders(filtered);
  // }, [orders, searchTerm, statusFilter, paymentFilter, priceRange]);

  const handleOpenDetail = (order: OrderData) => {
    setSelectedOrder(order);
    setEditedOrder({ ...order });
    setOpenDetailModal(true);
    setIsEditing(false);
  };

  const handleCloseDetail = () => {
    setOpenDetailModal(false);
    setSelectedOrder(null);
    setEditedOrder(null);
    setIsEditing(false);
  };

  const handleSaveChanges = async () => {
    if (editedOrder) {
    try {
      await updateAdminOrder(editedOrder.id, {
        name: editedOrder.name,
        phone: editedOrder.phone,
        address: editedOrder.address,
        status: editedOrder.status,
        note: editedOrder.note,
        // Nếu muốn lưu cả danh sách items đã sửa (như xóa bớt sp):
        items: editedOrder.items 
      });

      setIsEditing(false);
      handleCloseDetail();
      // Gọi lại danh sách để cập nhật tiền và thông tin mới nhất
      // fetchOrders(); 
    } catch (error) {
      alert("Cập nhật thất bại!");
    }
  }
  };

  const handleFieldChange = (field: keyof OrderData, value: any) => {
    if (editedOrder) {
      setEditedOrder({ ...editedOrder, [field]: value });
    }
  };

  // const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (_event: unknown, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    orders,
    paginatedOrders,
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
