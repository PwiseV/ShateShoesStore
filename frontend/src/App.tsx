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
import BlogPage from "./pages/Customer/Blog/Blog.tsx";
import BlogPost from "./pages/Customer/BlogPost/BlogPost.tsx";
import BlogList from "./pages/Customer/BlogList/BlogList.tsx";
import Orders from "./pages/Admin/Orders/Orders.tsx";
import ReviewProduct from "./pages/Customer/ReviewProduct/ReviewProduct.tsx";
import UserProfile from "./pages/Customer/UserProfile/UserProfile.tsx";
import FAQs from "./pages/Customer/FAQs/FAQs.tsx";
import AboutUs from "./pages/Customer/StaticPages/About/AboutUs.tsx";
import PrivacyPolicy from "./pages/Customer/StaticPages/PrivacyPolicy.tsx";
import ReturnPolicy from "./pages/Customer/StaticPages/ReturnPolicy.tsx";
import ContactUs from "./pages/Customer/Contact/ContactUs.tsx";
import NotFound from "./pages/Customer/StaticPages/NotFound.tsx";
import SizeGuide from "./pages/Customer/StaticPages/SizeGuide.tsx";
import Payment from "./pages/Customer/Payment/Payment.tsx";
import OrderSuccess from "./pages/Customer/Payment/SuccessOrder.tsx";
import OrderHistory from "./pages/Customer/OrderHistory/OrderHistory.tsx";
import OrderDetail from "./pages/Customer/OrderHistory/OrderDetail.tsx";
// forgot password components
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Favourite from "./pages/Customer/Favourite/Favourite.tsx";
import Reviews from "./pages/Admin/Reviews/Reviews.tsx";

export default function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/homepage" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route
            path="/products/details/:productid"
            element={<ProductDetail />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:slug" element={<ProductList />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/size-guide" element={<SizeGuide />} />

          <Route path="/favourite" element={<Favourite />} />
          <Route path="/history" element={<OrderHistory />} />
          <Route path="/history/:orderId" element={<OrderDetail />} />

          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/list" element={<BlogList />} />
          <Route path="/blog/:postid" element={<BlogPost />} />
          <Route element={<ProtectedRoute role="admin" />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/promotions" element={<Promotions />} />
            <Route path="/admin/posts" element={<Posts />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/reviews" element={<Reviews />} />
          </Route>

          <Route element={<ProtectedRoute role="customer" />}>
            <Route path="/review/:orderItemId" element={<ReviewProduct />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/products" element={<ProductList />} />
            <Route
              path="/products/details/:productid/"
              element={<ProductDetail />}
            />
            <Route path="/products/:slug" element={<ProductList />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/list" element={<BlogList />} />
            <Route path="/blog/:postid" element={<BlogPost />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
