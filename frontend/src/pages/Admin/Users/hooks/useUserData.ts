import { useState, useEffect, useCallback } from "react";
import { getUsers, updateUser } from "../../../../services/adminUserServices"; // Import service thật
import type { User } from "../types";
import { useToast } from "../../../../context/useToast";

export const useUserData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  // Notification
  const { showToast } = useToast();

  // Filter States
  const [keyword, setKeyword] = useState("");
  const [filters, setFilters] = useState({
    role: "All",
    status: "All",
    sortMoney: "default",
  });

  const limit = 10;

  // --- FETCH DATA TỪ API ---
  const fetchUsers = useCallback(
    async (page = currentPage) => {
      setLoading(true);
      try {
        // Mapping params cho API
        const params = {
          page,
          limit,
          keyword: keyword || undefined,
          // API yêu cầu role lowercase ('admin' | 'customer')
          role: filters.role !== "All" ? filters.role.toLowerCase() : undefined,
          status: filters.status !== "All" ? filters.status : undefined,
          // Logic sort
          order:
            filters.sortMoney === "high-low"
              ? "desc"
              : filters.sortMoney === "low-high"
              ? "asc"
              : undefined,
        };

        // Gọi API thật
        const res = await getUsers(params);

        if (res && res.data) {
          setUsers(res.data);
          // Làm tròn tổng số trang
          setTotalPages(
            res.pagination.totalPages || Math.ceil(res.pagination.total / limit)
          );
          setTotalUsers(res.pagination.total);
        }
      } catch (err: any) {
        console.error("Fetch users error:", err);
        // Hiển thị lỗi từ backend hoặc lỗi chung
        showToast(
          err.response?.data?.message || "Lỗi tải danh sách người dùng",
          "error"
        );
      } finally {
        setLoading(false);
      }
    },
    [currentPage, keyword, filters, showToast]
  );

  // --- UPDATE USER (API) ---
  const handleUpdateUser = async (
    userId: string,
    updatedData: Partial<User>
  ) => {
    setLoading(true);
    try {
      // Gọi API update
      await updateUser(userId, updatedData);

      showToast("Cập nhật thông tin thành công", "success");

      // Load lại dữ liệu trang hiện tại
      await fetchUsers(currentPage);
    } catch (err: any) {
      console.error("Update user error:", err);
      showToast(err.response?.data?.message || "Cập nhật thất bại", "error");
    } finally {
      setLoading(false);
    }
  };

  // --- ACTIONS ---
  const applyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({ role: "All", status: "All", sortMoney: "default" });
    setKeyword("");
    setCurrentPage(1);
  };

  const refreshData = () => fetchUsers(currentPage);

  // Auto fetch khi page hoặc filters thay đổi
  useEffect(() => {
    fetchUsers(currentPage);
  }, [fetchUsers]);

  return {
    users,
    loading,
    currentPage,
    totalPages,
    totalUsers,
    keyword,
    setKeyword,
    filters,
    applyFilters,
    clearFilters,
    setCurrentPage,
    handleUpdateUser,
    refreshData,
    fetchUsers,
  };
};
