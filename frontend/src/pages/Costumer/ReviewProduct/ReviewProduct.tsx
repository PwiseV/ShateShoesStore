import React, { useEffect, useState } from "react";
import { Box, Container, CircularProgress, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

// Components
import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";
import ProductPreview from "./components/ProductPreview";
import ReviewForm from "./components/ReviewForm";
import { useToast } from "../../../context/useToast";

// [QUAN TRỌNG] Đổi import sang Fake để test trước, sau này đổi về Real
import {
  getProductForReview,
  submitReview,
} from "../../../services/reviewProductServices";
import type { ReviewProductInfo } from "../../../services/reviewProductServices";

const ReviewProduct = () => {
  // 1. URL bây giờ sẽ là /review/:orderItemId
  const { orderItemId } = useParams();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  // State lưu thông tin trả về từ API GET
  const [reviewInfo, setReviewInfo] = useState<ReviewProductInfo | null>(null);

  useEffect(() => {
    const fetchInfo = async () => {
      if (!orderItemId) {
        return;
      }
      try {
        const data = await getProductForReview(orderItemId);
        setReviewInfo(data);
      } catch (error) {
        console.error("Lỗi:", error);
        showToast("Không tìm thấy thông tin đơn hàng", "error");
      } finally {
        setInitializing(false);
      }
    };

    window.scrollTo(0, 0);
    fetchInfo();
  }, [orderItemId, showToast]);

  const handleSubmitReview = async (formData: {
    rating: number;
    comment: string;
  }) => {
    if (!reviewInfo) return;
    if (!formData.rating) {
      showToast("Vui lòng chọn số sao đánh giá!", "warning");
      return;
    }

    setLoading(true);
    try {
      // 2. Mapping đúng field theo yêu cầu Backend (comment -> content)
      await submitReview({
        orderItemId: reviewInfo.orderItemId,
        productId: reviewInfo.productId,
        rating: formData.rating,
        content: formData.comment, // Map comment từ form vào content của API
        color: reviewInfo.color,
        size: reviewInfo.size,
      });

      showToast("Gửi đánh giá thành công!", "success");
      setTimeout(() => navigate("/homepage"), 1500); // Quay về trang chủ (hoặc trang lịch sử nếu có)
    } catch (error: any) {
      const msg = error.response?.data?.message || "Gửi đánh giá thất bại";
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

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
            // borderRadius: { xs: "20px", md: "0px" },
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            minHeight: "550px",
          }}
        >
          {/* CỘT TRÁI: ẢNH & THÔNG TIN SẢN PHẨM */}
          <Box
            sx={{
              flex: 1,
              position: "relative",
              minHeight: { xs: "300px", md: "auto" },
            }}
          >
            <ProductPreview image={reviewInfo?.productImage || ""} />

            {/* [MỚI] Hiển thị Tên, Size, Màu đè lên ảnh hoặc góc ảnh (Tùy chọn) */}
            <Box
              sx={{
                position: "absolute",
                bottom: 20,
                left: 20,
                right: 20,
                bgcolor: "rgba(255,255,255,0.9)",
                p: 2,
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#2C3E50" }}
              >
                {reviewInfo?.productTitle}
              </Typography>
              <Typography variant="body2" sx={{ color: "#567C8D" }}>
                Phân loại: {reviewInfo?.color} - Size {reviewInfo?.size}
              </Typography>
            </Box>
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
