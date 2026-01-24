import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import FullScreenLoader from "../components/Loading";
import LoginRequired from "../components/Customer/LoginRequired";

interface ProtectedRouteProps {
  role?: "customer" | "admin";
}

const ProtectedRoute = ({ role }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  // 1. Đang tải dữ liệu user
  if (loading) {
    return <FullScreenLoader />;
  }

  // 2. Chưa đăng nhập
  if (!user) {
    // Nếu trang yêu cầu quyền Admin, đẩy thẳng về trang Login
    // Nếu trang yêu cầu quyền Customer, hiện form LoginRequired đẹp mắt của bạn
    return role === "admin" ? <Navigate to="/login" replace /> : <LoginRequired />;
  }

  // 3. Đã đăng nhập nhưng sai Role (Check quyền)
  if (role && user.role !== role) {
    // Nếu Admin cố vào trang Customer -> Đẩy về Dashboard Admin
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    // Nếu Customer cố vào trang Admin -> Đẩy về Homepage Customer
    if (user.role === "customer") {
      return <Navigate to="/homepage" replace />;
    }
    
    // Trường hợp mặc định nếu có các role khác
    return <Navigate to="/unauthorized" replace />;
  }

  // 4. Hợp lệ -> Cho phép truy cập
  return <Outlet />;
};

export default ProtectedRoute;