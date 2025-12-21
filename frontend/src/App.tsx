import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

import ProtectedRoute from "./routes/protectedRoutes.tsx";
import Dashboard from "./pages/Admin/Dashboard/Dashboard.tsx";
import HomePage from "./pages/Costumer/Homepage/Homepage.tsx";
import Login from "./pages/Signin/SigninForm.tsx";
import Signup from "./pages/Signup/SignupForm";
import Users from "./pages/Admin/Users/Users.tsx";
import ProductDetail from "./pages/Costumer/ProductDetail/ProductDetail.tsx";

export default function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* --- PUBLIC ROUTES (Ai cũng vào được) --- */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />

          {/* Homepage nên để Public để khách vãng lai xem được hàng */}
          <Route path="/homepage" element={<HomePage />} />
          {/* Để test đường dẫn, cuối cùng xong xuôi thì sẽ add vào mỗi protectedroute của customer (khai báo gọi 1 lần thì render toast mới được)*/}
          <Route path="/products/:productid" element={<ProductDetail />} />

          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<Users />} />

          {/* --- ADMIN ROUTES --- */}
          <Route element={<ProtectedRoute role="admin" />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<Users />} />
          </Route>

          {/* --- CUSTOMER ROUTES --- */}
          <Route element={<ProtectedRoute role="customer" />}></Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
