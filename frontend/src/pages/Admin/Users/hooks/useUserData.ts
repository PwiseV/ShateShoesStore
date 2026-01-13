import { useState, useEffect } from "react";
import type { User, Address } from "../type";

// --- MOCK DATA (Giữ nguyên cấu trúc của bạn) ---
const createMockAddress = (id: number, userId: number): Address => ({
  address_id: id,
  user_id: userId,
  name: "Phạm Minh Phát",
  phone: "0909123456",
  street: "KTX Khu B",
  ward: "Đông Hòa",
  district: "Dĩ An",
  city: "Bình Dương",
  country: "Việt Nam",
});

const MOCK_USERS: User[] = Array(10)
  .fill(null)
  .map((_, index) => {
    const uId = index + 1;
    return {
      userId: uId,
      username: `user_${uId}`,
      email: `phatminh${uId}@gmail.com`,
      displayName: index % 2 === 0 ? "Phạm Minh Phát" : "Nguyễn Văn A",
      phone: "0123456789",
      // Lưu ý: Value này phải khớp với value trong Modal Filter
      role: index % 5 === 0 ? "Admin" : "Customer",
      status: index % 3 === 2 ? "blocked" : "active",
      totalSpent: (index + 1) * 500000, // Thêm tiền để test sort
      avatar_image_url: "https://via.placeholder.com/150",
      created_at: new Date().toISOString(),
      addresses: [createMockAddress(uId * 100, uId)],
    };
  });

// --- HOOK ---
export const useUserData = () => {
  // allUsers: Chứa toàn bộ dữ liệu gốc (để khi xóa filter không bị mất data)
  const [allUsers, setAllUsers] = useState<User[]>([]);
  // displayUsers: Chứa dữ liệu đã lọc để hiển thị ra bảng
  const [displayUsers, setDisplayUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // States cho Filter
  const [keyword, setKeyword] = useState("");
  const [filters, setFilters] = useState({
    role: "All", // All | Customer | Admin
    status: "All", // All | active | blocked
    sortMoney: "default", // default | high-low | low-high
  });

  // 1. Giả lập Fetch Data lần đầu
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAllUsers(MOCK_USERS);
      setLoading(false);
    }, 500);
  }, []);

  // 2. Logic Lọc & Tìm kiếm & Sắp xếp (Chạy mỗi khi allUsers hoặc filters thay đổi)
  useEffect(() => {
    let result = [...allUsers];

    // Lọc theo Keyword
    if (keyword) {
      const k = keyword.toLowerCase();
      result = result.filter(
        (u) =>
          u.displayName.toLowerCase().includes(k) ||
          u.email.toLowerCase().includes(k) ||
          u.userId.toString().includes(k)
      );
    }

    // Lọc theo Role
    if (filters.role !== "All") {
      // So sánh không phân biệt hoa thường để an toàn (Admin == admin)
      result = result.filter(
        (u) => u.role.toLowerCase() === filters.role.toLowerCase()
      );
    }

    // Lọc theo Status
    if (filters.status !== "All") {
      result = result.filter((u) => u.status === filters.status);
    }

    // Sắp xếp theo Tổng tiền
    if (filters.sortMoney === "high-low") {
      result.sort((a, b) => (b.totalSpent || 0) - (a.totalSpent || 0));
    } else if (filters.sortMoney === "low-high") {
      result.sort((a, b) => (a.totalSpent || 0) - (b.totalSpent || 0));
    }

    // Phân trang giả lập (5 item 1 trang)
    const itemsPerPage = 5;
    setTotalPages(Math.ceil(result.length / itemsPerPage) || 1);

    // Cắt mảng theo trang hiện tại
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedResult = result.slice(startIndex, startIndex + itemsPerPage);

    setDisplayUsers(paginatedResult);
  }, [allUsers, keyword, filters, currentPage]);

  // 3. Hàm Xử lý Update User (Để tính năng Sửa hoạt động)
  const handleUpdateUser = (updatedUser: User) => {
    setAllUsers((prevList) =>
      prevList.map((u) => (u.userId === updatedUser.userId ? updatedUser : u))
    );
    // Logic filter ở trên sẽ tự chạy lại và cập nhật displayUsers
  };

  //   const handleDeleteUser = (userId: number) => {
  //     if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
  //       setAllUsers((prev) => prev.filter((u) => u.userId !== userId));
  //     }
  //   };

  const refreshData = () => {
    // Reset data (trong thực tế sẽ gọi API lại)
    setAllUsers(MOCK_USERS);
    setFilters({ role: "All", status: "All", sortMoney: "default" });
    setKeyword("");
    setCurrentPage(1);
  };

  // Helper set Filter
  const applyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({ role: "All", status: "All", sortMoney: "default" });
    setKeyword("");
    setCurrentPage(1);
  };

  return {
    users: displayUsers, // Trả về list đã lọc
    loading,
    currentPage,
    totalPages,
    keyword,
    setKeyword,
    filters,
    applyFilters,
    clearFilters,
    setCurrentPage,
    // handleDeleteUser,
    handleUpdateUser, // Export hàm này để dùng bên Users.tsx
    refreshData,
  };
};
