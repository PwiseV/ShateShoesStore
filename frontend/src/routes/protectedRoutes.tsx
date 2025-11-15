import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth.ts";

interface ProtectedRouteProps {
  role?: "customer" | "admin";
}

const ProtectedRoute = ({ role }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
