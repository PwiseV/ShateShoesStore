import { useState, useEffect, useCallback } from "react";
import type { User } from "../type";
// Giả định bạn đã export các hàm này từ services/adminUserServices
import { getUsers, updateUser } from "../../../../services/adminUserServices";

export const useUserData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const [keyword, setKeyword] = useState("");
  const [filters, setFilters] = useState({
    role: "All",
    status: "All",
    sortMoney: "default", 
  });

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 10,
        keyword: keyword || undefined,
        role: filters.role !== "All" ? filters.role.toLowerCase() : undefined,
        status: filters.status !== "All" ? filters.status : undefined,
        order: filters.sortMoney === "high-low" 
               ? "totalSpent_desc" 
               : filters.sortMoney === "low-high" 
               ? "totalSpent_asc" 
               : undefined
      };

      const response = await getUsers(params);
    
      if (response && response.data) {
        setUsers(response.data);
        setTotalPages(response.pagination.totalPages);
        setTotalUsers(response.pagination.total);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, keyword, filters]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleUpdateUser = async (id: number, data: Partial<User>, file?: File) => {
    try {
      setLoading(true);
      await updateUser(id, data, file);
      await fetchUsers(); 
    } catch (error) {
      alert("Cập nhật thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1); 
  };

  const clearFilters = () => {
    setFilters({ role: "All", status: "All", sortMoney: "default" });
    setKeyword("");
    setCurrentPage(1);
  };

  const refreshData = () => {
    fetchUsers();
  };

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
  };
};