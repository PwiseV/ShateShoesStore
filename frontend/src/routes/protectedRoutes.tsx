import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

interface ProtectedRouteProps {
  role?: "customer" | "admin";
}

const ProtectedRoute = ({ role }: ProtectedRouteProps) => {
  const { user } = useAuth();
  console.log("ProtectedRoute - user:", user);

  // Chưa đăng nhập → về signin
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Sai role → về trang báo unauthorized/forbidden
  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Hợp lệ → cho phép render route con
  return <Outlet />;
};

export default ProtectedRoute;
