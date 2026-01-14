import { useState, useEffect } from "react";
import type { User, Address } from "../type";

// --- HELPER: Tạo địa chỉ giả ---
const createMockAddress = (
  id: number,
  userId: number,
  type: "Home" | "Office" | "Other" = "Home"
): Address => {
  let street = "123 Nguyễn Huệ";
  let ward = "Bến Nghé";
  let name = "Phạm Minh Phát";

  if (type === "Office") {
    street = "Tòa nhà Bitexco, 2 Hải Triều";
    ward = "Bến Nghé";
    name = "Phạm Minh Phát (Công ty)";
  } else if (type === "Other") {
    street = "456 Lê Văn Việt";
    ward = "Tăng Nhơn Phú A";
    name = "Người thân";
  }

  return {
    address_id: id,
    user_id: userId,
    name: name,
    phone: "0909123456",
    street: street,
    ward: ward,
    district: "Quận 1",
    city: "TP.HCM",
    country: "Việt Nam",
  };
};

// --- MOCK DATA ---
const MOCK_USERS: User[] = Array(10)
  .fill(null)
  .map((_, index) => {
    const uId = index + 1;
    let addresses: Address[] = [];

    // CASE 1: User đầu tiên có 3 địa chỉ (Test hiển thị nhiều dòng)
    if (uId === 1) {
      addresses = [
        createMockAddress(101, uId, "Home"),
        createMockAddress(102, uId, "Office"),
        createMockAddress(103, uId, "Other"),
      ];
    }
    // CASE 2: User chẵn có 2 địa chỉ
    else if (uId % 2 === 0) {
      addresses = [
        createMockAddress(uId * 100 + 1, uId, "Home"),
        createMockAddress(uId * 100 + 2, uId, "Office"),
      ];
    }
    // CASE 3: Các user còn lại có 1 địa chỉ
    else {
      addresses = [createMockAddress(uId * 100, uId, "Home")];
    }

    return {
      userId: uId,
      username: `user_00${uId}`,
      email: `user${uId}@gmail.com`,
      displayName:
        uId === 1
          ? "Super Admin"
          : index % 2 === 0
          ? "Nguyễn Văn A"
          : "Trần Thị B",
      phone: "0123456789",
      role: index % 5 === 0 ? "Admin" : "Customer",
      status: index % 3 === 2 ? "blocked" : "active",
      totalSpent: (index + 1) * 500000,
      avatar_image_url: "https://via.placeholder.com/150",
      created_at: new Date().toISOString(),
      addresses: addresses, // Data địa chỉ dynamic ở trên
      orderCount: Math.floor(Math.random() * 10), // Random số đơn hàng
    };
  });

// --- HOOK ---
export const useUserData = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [displayUsers, setDisplayUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // States Filter
  const [keyword, setKeyword] = useState("");
  const [filters, setFilters] = useState({
    role: "All",
    status: "All",
    sortMoney: "default",
  });

  // 1. Fetch Data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAllUsers(MOCK_USERS);
      setLoading(false);
    }, 500);
  }, []);

  // 2. Logic Filter & Sort
  useEffect(() => {
    let result = [...allUsers];

    // Lọc theo keyword
    if (keyword) {
      const k = keyword.toLowerCase();
      result = result.filter(
        (u) =>
          u.displayName.toLowerCase().includes(k) ||
          u.email.toLowerCase().includes(k) ||
          u.username.toLowerCase().includes(k)
      );
    }

    // Lọc Role
    if (filters.role !== "All") {
      result = result.filter(
        (u) => u.role.toLowerCase() === filters.role.toLowerCase()
      );
    }

    // Lọc Status
    if (filters.status !== "All") {
      result = result.filter((u) => u.status === filters.status);
    }

    // Sort Money
    if (filters.sortMoney === "high-low") {
      result.sort((a, b) => (b.totalSpent || 0) - (a.totalSpent || 0));
    } else if (filters.sortMoney === "low-high") {
      result.sort((a, b) => (a.totalSpent || 0) - (b.totalSpent || 0));
    }

    // Pagination
    const itemsPerPage = 5;
    setTotalPages(Math.ceil(result.length / itemsPerPage) || 1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedResult = result.slice(startIndex, startIndex + itemsPerPage);

    setDisplayUsers(paginatedResult);
  }, [allUsers, keyword, filters, currentPage]);

  // 3. Actions
  const handleUpdateUser = (updatedUser: User) => {
    setAllUsers((prevList) =>
      prevList.map((u) => (u.userId === updatedUser.userId ? updatedUser : u))
    );
  };

  const handleDeleteUser = (userId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      setAllUsers((prev) => prev.filter((u) => u.userId !== userId));
    }
  };

  const refreshData = () => {
    setAllUsers(MOCK_USERS);
    setFilters({ role: "All", status: "All", sortMoney: "default" });
    setKeyword("");
    setCurrentPage(1);
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

  return {
    users: displayUsers,
    loading,
    currentPage,
    totalPages,
    keyword,
    setKeyword,
    filters,
    applyFilters,
    clearFilters,
    setCurrentPage,
    handleDeleteUser,
    handleUpdateUser,
    refreshData,
  };
};
