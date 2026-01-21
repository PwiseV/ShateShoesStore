import React, { useEffect, useState } from "react";
import { Box, Container, CircularProgress } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

// Components
import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";
import ProductPreview from "./components/ProductPreview";
import ReviewForm from "./components/ReviewForm";

import { useToast } from "../../../context/useToast";

// import {
//   getProductById,
//   submitReview,
// } from "../../../services/reviewProductServices";
import {
  getProductById,
  submitReview,
} from "../../../services/fakeReviewProductServices";

const ReviewProduct = () => {
  const { productId } = useParams(); // Lấy ID từ URL
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [productImage, setProductImage] = useState<string>(""); // State lưu ảnh
  const [initializing, setInitializing] = useState(true); // State load trang

  // 1. Load thông tin sản phẩm khi vào trang
  useEffect(() => {
    const fetchProductInfo = async () => {
      if (!productId) return;
      try {
        const product = await getProductById(productId);
        // Nếu API trả về ảnh, set vào state. Nếu không có ảnh, dùng ảnh placeholder
        setProductImage(product.image || "https://via.placeholder.com/500");
      } catch (error) {
        console.error("Lỗi tải sản phẩm:", error);
        showToast("Không tìm thấy sản phẩm", "error");
      } finally {
        setInitializing(false);
      }
    };

    window.scrollTo(0, 0);
    fetchProductInfo();
  }, [productId, showToast]);

  // 2. Xử lý gửi đánh giá
  const handleSubmitReview = async (data: {
    rating: number;
    comment: string;
  }) => {
    if (!productId) return;
    if (!data.rating) {
      showToast("Vui lòng chọn số sao đánh giá!", "warning");
      return;
    }

    setLoading(true);
    try {
      await submitReview({
        productId: productId,
        rating: data.rating,
        comment: data.comment,
      });

      showToast("Gửi đánh giá thành công!", "success");

      // Đợi 1s rồi chuyển trang (ví dụ về trang chi tiết sản phẩm hoặc lịch sử)
      setTimeout(() => {
        navigate("/history"); // Hoặc navigate(-1) để quay lại
      }, 1000);
    } catch (error: any) {
      const msg = error.response?.data?.message || "Gửi đánh giá thất bại";
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  // Hiển thị loading khi đang tải thông tin sản phẩm
  if (initializing) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: "#F9F3F0",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
          px: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            width: "100%",
            maxWidth: "1000px",
            bgcolor: "white",
            borderRadius: { xs: "20px", md: "0px" },
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            minHeight: "550px",
          }}
        >
          {/* CỘT TRÁI: ẢNH SẢN PHẨM (Dùng ảnh từ API) */}
          <Box
            sx={{
              flex: 1,
              position: "relative",
              minHeight: { xs: "300px", md: "auto" },
            }}
          >
            <ProductPreview image={productImage} />
          </Box>

          {/* CỘT PHẢI: FORM */}
          <Box sx={{ flex: 1 }}>
            <ReviewForm onSubmit={handleSubmitReview} loading={loading} />
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default ReviewProduct;
