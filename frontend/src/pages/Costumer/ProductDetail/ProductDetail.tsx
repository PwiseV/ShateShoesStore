import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";
import ProductForm from "./components/Product/ProductForm";
import ReviewList from "./components/Review/ReviewList";
import Recomendation from "./components/Recomendation/Recomendation";

import { useSearchParams, useLocation, useParams } from "react-router-dom";

// --- 1. IMPORT TYPE TỪ FILE SERVICE CHÍNH (Nơi định nghĩa gốc) ---
import {
  type Product,
  type ProductReview, // <--- Đã chuyển về đây
  type Promotion, // <--- Đã chuyển về đây
} from "../../../services/productdetailsServices";

import { getProductDetails } from "../../../services/productdetailsServices";
import { type OptionValue } from "./components/Product/ProductOptions";
import { useToast } from "../../../context/useToast"; // Hoặc ToastContext tuỳ tên file bạn đặt

// --- 2. IMPORT CÁC HÀM GIẢ LẬP TỪ FILE FAKE ---
import {
  getProductDetailsFake,
  getProductReviewsFake,
  getProductPromotionFake,
  addToCartFake,
  addToWishlistFake,
  removeFromWishlistFake,
} from "../../../services/fakeProductDetailsServices";

const COLOR_MAP: Record<string, string> = {
  Vàng: "#f3c623",
  Hồng: "#f8a1c4",
  Xanh: "#7db3e6",
  Đen: "#000000",
  Trắng: "#ffffff",
};

const ProductDetail: React.FC = () => {
  const { productid: paramId } = useParams<{ productid: string }>();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const stateId = (location.state as { id?: string })?.id;
  let id = paramId ?? searchParams.get("id") ?? stateId ?? "";

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [promotion, setPromotion] = useState<Promotion | null>(null);

  // STATE QUẢN LÝ YÊU THÍCH
  const [isLiked, setIsLiked] = useState(false);

  const [loading, setLoading] = useState(true);

  const { showToast } = useToast();
  const isDev = import.meta.env?.DEV ?? true;
  if (!id && isDev) id = "demo-001";

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        if (isDev) {
          const [productData, reviewsData, promoData] = await Promise.all([
            getProductDetailsFake(id),
            getProductReviewsFake(id),
            getProductPromotionFake(id),
          ]);
          setProduct(productData);
          setReviews(reviewsData);
          setPromotion(promoData);
        } else {
          const data = await getProductDetails(id, controller.signal);
          setProduct(data);
          setReviews([]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [id, isDev]);

  // --- HÀM XỬ LÝ TIM ---
  const handleToggleLike = async () => {
    try {
      if (!isLiked) {
        const res = await addToWishlistFake(id);
        if (res.success) {
          setIsLiked(true);
          showToast(res.message, "success");
        }
      } else {
        const res = await removeFromWishlistFake(id);
        if (res.success) {
          setIsLiked(false);
          showToast(res.message, "success");
        }
      }
    } catch (error) {
      console.error(error);
      showToast("Lỗi cập nhật yêu thích", "error");
    }
  };

  // --- HÀM XỬ LÝ CART ---
  const handleAddToCart = async (data: any) => {
    if (!data.variantId) {
      showToast("Vui lòng chọn đầy đủ Size và Màu sắc!", "warning");
      return;
    }
    try {
      const response = await addToCartFake({
        productId: id,
        variantId: data.variantId,
        quantity: data.quantity,
      });
      if (response.success) {
        showToast(response.message, "success");
      } else {
        showToast(response.message, "error");
      }
    } catch (error) {
      console.error(error);
      showToast("Có lỗi xảy ra, vui lòng thử lại sau.", "error");
    }
  };

  if (loading) return <Box sx={{ p: 4 }}>Loading...</Box>;
  if (!product) return <Box sx={{ p: 4 }}>Không tìm thấy sản phẩm</Box>;

  // ... (UI Data Prep giữ nguyên) ...
  const breadcrumbs: string[] = [];
  if (product.category?.parent) breadcrumbs.push(product.category.parent.name);
  if (product.category?.name) breadcrumbs.push(product.category.name);

  const uiSizes: OptionValue[] = product.sizes.map((s) => ({
    id: String(s.size),
    label: String(s.size),
    disabled: s.colors.every((c) => c.stock <= 0),
  }));
  const uniqueColorsMap = new Map<string, string>();
  product.sizes.forEach((s) => {
    s.colors.forEach((c) => {
      uniqueColorsMap.set(c.color, c.colorId);
    });
  });
  const uiColors: OptionValue[] = Array.from(uniqueColorsMap.entries()).map(
    ([name, id]) => ({
      id: name,
      label: name,
      swatch: COLOR_MAP[name] || "#cccccc",
    })
  );
  let minPrice = Infinity;
  product.sizes.forEach((s) =>
    s.colors.forEach((c) => {
      if (c.price < minPrice) minPrice = c.price;
    })
  );
  if (minPrice === Infinity) minPrice = 0;

  return (
    <Box
      sx={{
        bgcolor: "#F9F5F1",
        minHeight: "100vh",
        fontFamily: '"DM Sans", sans-serif',
      }}
    >
      <Header />
      <Box sx={{ maxWidth: 1440, mx: "auto", px: { xs: 2, md: 6 }, py: 6 }}>
        <ProductForm
          name={product.title}
          defaultPrice={minPrice}
          variantsData={product.sizes}
          images={product.avatar}
          breadcrumbs={breadcrumbs}
          badges={product.tag}
          rating={product.rating}
          description={product.description}
          sizes={uiSizes}
          colors={uiColors}
          promotion={promotion}
          onSubmit={handleAddToCart}
          onBuyNow={() => console.log("Buy now")}
          isLiked={isLiked}
          onToggleLike={handleToggleLike}
        />

        <Box sx={{ mt: 12 }}>
          <ReviewList reviews={reviews as any} />
        </Box>
        <Box sx={{ mt: 12, mb: 8 }}>
          <Recomendation />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default ProductDetail;
