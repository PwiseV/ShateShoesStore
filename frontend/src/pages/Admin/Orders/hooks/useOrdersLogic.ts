import { useEffect, useState } from "react";
import type { OrderData } from "../types";
import { getAdminOrders } from "../../../../services/fakeAdminServices";

export default function useOrdersLogic() {
  const [orders, setOrders] = useState<OrderData[]>([]);

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
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000000]);
  const [openFilterModal, setOpenFilterModal] = useState(false);

  const itemsPerPage = 9;

  useEffect(() => {
    let active = true;
    const fetchOrders = async () => {
      try {
        const data = await getAdminOrders();
        if (!active) return;
        // map to OrderData loosely
        const mapped = data.map((o: any) => ({
          id: o.id,
          orderNumber: o.orderNumber,
          name: o.name,
          email: o.email,
          phone: o.phone,
          address: o.address,
          createdAt: o.createdAt,
          total: o.total,
          paymentMethod: o.paymentMethod,
          status: o.status,
          items: o.items || [],
        }));
        setOrders(mapped);
        // apply current filters/search on fetched data
        const filtered = mapped.filter((order) => {
          const matchSearch =
            order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.phone.includes(searchTerm);

          const matchStatus = !statusFilter || order.status === statusFilter;
          const matchPayment = !paymentFilter || order.paymentMethod === paymentFilter;
          const matchPrice = order.total >= priceRange[0] && order.total <= priceRange[1];

          return matchSearch && matchStatus && matchPayment && matchPrice;
        });

        setFilteredOrders(filtered);
        setPage(1);
      } catch (err) {
        // keep empty on error
        console.error("getAdminOrders error", err);
      }
    };

    fetchOrders();

    return () => { active = false };
  }, [searchTerm, orders, statusFilter, paymentFilter, priceRange]);

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

  const handleSaveChanges = () => {
    if (editedOrder) {
      setOrders(
        orders.map((o) => (o.id === editedOrder.id ? editedOrder : o))
      );
      setFilteredOrders(
        filteredOrders.map((o) => (o.id === editedOrder.id ? editedOrder : o))
      );
      setIsEditing(false);
      handleCloseDetail();
    }
  };

  const handleFieldChange = (field: keyof OrderData, value: any) => {
    if (editedOrder) {
      setEditedOrder({ ...editedOrder, [field]: value });
    }
  };

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
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
