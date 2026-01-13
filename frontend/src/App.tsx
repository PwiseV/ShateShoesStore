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
import AboutUs from "./pages/Costumer/StaticPages/About/AboutUs.tsx";
import PrivacyPolicy from "./pages/Costumer/StaticPages/PrivacyPolicy.tsx";
import ReturnPolicy from "./pages/Costumer/StaticPages/ReturnPolicy.tsx";
import ContactUs from "./pages/Costumer/Contact/ContactUs.tsx";
import NotFound from "./pages/Costumer/StaticPages/NotFound.tsx";
import SizeGuide from "./pages/Costumer/StaticPages/SizeGuide.tsx";

export default function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route element={<ProtectedRoute role="admin" />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<Users />} />
          </Route>

          <Route element={<ProtectedRoute role="customer" />}>
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/return-policy" element={<ReturnPolicy />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/size-guide" element={<SizeGuide />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
