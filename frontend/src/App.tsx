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
import HomePage from "./pages/Customer/Homepage/Homepage.tsx";
import Login from "./pages/Signin/SigninForm.tsx";
import Signup from "./pages/Signup/SignupForm";
import Users from "./pages/Admin/Users/Users.tsx";
import Products from "./pages/Admin/Products/Products.tsx";
import Promotions from "./pages/Admin/Promotions/Promotions.tsx";
import ProductList from "./pages/Customer/ProductList/ProductList.tsx";
import ProductDetail from "./pages/Customer/ProductDetail/ProductDetail.tsx";
import Posts from "./pages/Admin/Post/Posts.tsx";
import CartPage from "./pages/Customer/Cart/CartPage.tsx";
import CheckoutPage from "./pages/Customer/Checkout/CheckoutPage.tsx";
import Orders from "./pages/Admin/Orders/Orders.tsx";
import UserProfile from "./pages/Costumer/UserProfile/UserProfile.tsx";
import FAQs from "./pages/Costumer/FAQs/FAQs.tsx";
import AboutUs from "./pages/Costumer/StaticPages/About/AboutUs.tsx";
import PrivacyPolicy from "./pages/Costumer/StaticPages/PrivacyPolicy.tsx";
import ReturnPolicy from "./pages/Costumer/StaticPages/ReturnPolicy.tsx";
import ContactUs from "./pages/Costumer/Contact/ContactUs.tsx";
import NotFound from "./pages/Costumer/StaticPages/NotFound.tsx";
import SizeGuide from "./pages/Costumer/StaticPages/SizeGuide.tsx";
import Payment from "./pages/Customer/Payment/Payment.tsx";
import OrderSuccess from "./pages/Customer/Payment/SuccessOrder.tsx";

// forgot password components
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
export default function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route
            path="/products/details/:productid"
            element={<ProductDetail />}
          />
          <Route path="/users/cart" element={<CartPage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:slug" element={<ProductList />} />
          <Route path="/admin/orders" element={<Orders />} />

          <Route path="/profile" element={<UserProfile />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order-success" element={<OrderSuccess />} />

          <Route element={<ProtectedRoute role="admin" />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/promotions" element={<Promotions />} />
            <Route path="/admin/posts" element={<Posts />} />
            <Route path="/admin/orders" element={<Orders />} />
          </Route>

          <Route element={<ProtectedRoute role="customer" />}>
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/products" element={<ProductList />} />
            <Route
              path="/products/details/:productid/"
              element={<ProductDetail />}
            />
            <Route path="/products/:slug" element={<ProductList />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/return-policy" element={<ReturnPolicy />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/size-guide" element={<SizeGuide />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order-success" element={<OrderSuccess />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
