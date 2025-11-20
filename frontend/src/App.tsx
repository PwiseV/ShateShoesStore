import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

import ProtectedRoute from "./routes/protectedRoutes.tsx";
import AdminDashboard from "./pages/Admin/Dashboard.tsx";
import CustomerDashboard from "./pages/Costumer/Homepage/Homepage.tsx";
import Login from "./pages/Signin/SigninForm.tsx";
import Signup from "./pages/Signup/SignupForm";


export default function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />

          <Route element={<ProtectedRoute role="admin" />}>
            <Route path="/dashboard" element={<AdminDashboard />} />
          </Route>
          <Route element={<ProtectedRoute role="customer" />}>
            <Route path="/homepage" element={<CustomerDashboard />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
