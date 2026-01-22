import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useSearchParams, useLocation, useParams } from "react-router-dom";

// Component con
import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";
import ProductForm from "./components/Product/ProductForm";
import ReviewList from "./components/Review/ReviewList";
import Recomendation from "./components/Recomendation/Recomendation";

import {
  COLOR_OPTIONS,
  COLOR_MAP,
  COLOR_DISPLAY_MAP,
} from "../../Admin/Products/constants";

// Services & Types
import {
  type Product,
  type ProductReview,
  type Promotion,
  getProductDetails,
  addToWishlist,
  removeFromWishlist,
  addToCart,
} from "../../../services/productDetailsServices";
import { useToast } from "../../../context/useToast";

// Fake imports
import {
  getProductReviewsFake,
  getProductPromotionFake,
  addToCartFake,
} from "../../../services/fakeProductDetailsServices";

type BreadcrumbItem = {
  name: string;
  slug: string;
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
  const [isLiked, setIsLiked] = useState(false);
  const [likeState, setLikeState] = useState(false);
  const [loading, setLoading] = useState(true);

  const { showToast } = useToast();
  const isDev = import.meta.env?.DEV ?? true;
  if (!id && isDev) id = "demo-001";

  // --- SỬA LẠI USEEFFECT ---
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const data = await getProductDetails(id, controller.signal);
        setProduct(data);
        setIsLiked(data.isFavourite);
        const [reviewsData, promoData] = await Promise.all([
          getProductReviewsFake(id),
          getProductPromotionFake(id),
        ]);
        setReviews(reviewsData);
        setPromotion(promoData);
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [id, likeState]);

  const handleToggleLike = async () => {
    const previousLiked = isLiked;
    try {
      if (isLiked) {
        setIsLiked(false);
        const res = await removeFromWishlist(id);
        if (!res) {
          setIsLiked(previousLiked);

          showToast(res.message || "Lỗi", "error");
        } else {
          setLikeState(previousLiked);
          showToast(res.message, "success");
        }
      } else {
        setIsLiked(true);
        const res = await addToWishlist(id);
        if (!res) {
          setIsLiked(previousLiked);

          showToast(res.message || "Lỗi", "error");
        } else {
          setLikeState(previousLiked);
          showToast(res.message, "success");
        }
      }
    } catch (error) {
      setIsLiked(previousLiked);
      console.error(error);
      showToast("Lỗi kết nối", "error");
    }
  };

  const handleAddToCart = async (data: any) => {
    if (!data.variantId) {
      showToast("Vui lòng chọn đầy đủ Size và Màu sắc!", "warning");
      return;
    }
    try {
      const response = await addToCart({
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

  if (!product) return <Box sx={{ p: 4 }}>Không tìm thấy sản phẩm</Box>;

  const getHexColor = (colorName: string) => {
    if (!colorName) return "#cccccc";

    const name = colorName;
    const lowerName = colorName.toLowerCase();

    if (COLOR_DISPLAY_MAP[name]) return COLOR_DISPLAY_MAP[name];
    if (COLOR_DISPLAY_MAP[lowerName]) return COLOR_DISPLAY_MAP[lowerName];

    const engName = COLOR_MAP[name];
    if (engName) {
      if (COLOR_DISPLAY_MAP[engName]) return COLOR_DISPLAY_MAP[engName];
      if (COLOR_DISPLAY_MAP[engName.toLowerCase()])
        return COLOR_DISPLAY_MAP[engName.toLowerCase()];
    }

    // Fallback: Nếu không tìm thấy thì trả về xám
    return "#cccccc";
  };

  // 1. Breadcrumbs
  const breadcrumbs: BreadcrumbItem[] = [];
  // Kiểm tra danh mục cha
  if (product.category?.parent) {
    breadcrumbs.push({
      name: product.category.parent.name,
      slug: product.category.parent.slug || "",
    });
  }
  // Kiểm tra danh mục hiện tại
  if (product.category?.name) {
    breadcrumbs.push({
      name: product.category.name,
      slug: product.category.slug || "",
    });
  }

  // 2. Images: Cố gắng lấy nhiều ảnh nhất có thể để Gallery đẹp
  // - Lấy ảnh chính (Avatar)
  // - Quét qua tất cả Size -> Color để lấy thêm ảnh biến thể
  const uiImages = [{ id: "main", src: product.avatar, alt: product.title }];

  const seenImages = new Set([product.avatar]); // Để tránh trùng ảnh

  product.sizes.forEach((s) => {
    s.colors.forEach((c, idx) => {
      let imgUrl = "";
      // Xử lý logic avatar có thể là string hoặc object
      if (c.avatar && typeof c.avatar === "string") imgUrl = c.avatar;
      else if (c.avatar && typeof c.avatar === "object") imgUrl = c.avatar.url;

      // Nếu có ảnh hợp lệ và chưa từng thêm vào danh sách
      if (imgUrl && !seenImages.has(imgUrl) && !imgUrl.includes("ảnh đẹp")) {
        seenImages.add(imgUrl);
        uiImages.push({
          id: `var-${s.size}-${idx}`,
          src: imgUrl,
          alt: `${product.title} - ${c.color}`,
        });
      }
    });
  });

  // 3. Description: Tách chuỗi thành mảng để hiển thị từng dòng
  let uiDescription: string[] = [];
  if (product.description) {
    // Tách theo dấu xuống dòng hoặc dấu chấm nếu không có xuống dòng
    if (product.description.includes("\n")) {
      uiDescription = product.description
        .split("\n")
        .filter((line) => line.trim() !== "");
    } else {
      // Fallback: Nếu là 1 câu dài, cố gắng hiển thị nó
      uiDescription = [product.description];
    }
  } else {
    uiDescription = ["Chưa có mô tả chi tiết."];
  }

  // 4. Badges (Tags)
  const uiBadges =
    product.tags && product.tags.length > 0
      ? product.tags
      : product.category?.name
        ? [product.category.name]
        : [];

  // 5. Sizes & Colors
  const uiSizes = product.sizes.map((s) => ({
    id: String(s.size), // Ép về string cho chắc
    label: String(s.size),
    disabled: s.colors.every((c) => c.stock <= 0),
  }));

  const uniqueColorsMap = new Map();
  product.sizes.forEach((s) =>
    s.colors.forEach((c) => {
      const colorLabel = c.color;
      const uniqueKey = colorLabel.toLowerCase();
      if (!uniqueColorsMap.has(uniqueKey)) {
        uniqueColorsMap.set(uniqueKey, {
          id: c.color,
          label: c.color,
          swatch: getHexColor(c.color),
        });
      }
    }),
  );
  const uiColors = Array.from(uniqueColorsMap.values());

  // 6. Variants Data (Flatten để component con dễ tìm)
  const uiVariantsData = product.sizes.map((s) => ({
    sizeId: s.sizeId,
    size: s.size,
    colors: s.colors.map((c) => ({
      variantId: c.variantId,
      color: c.color,
      price: c.price,
      stock: c.stock,
      avatar: typeof c.avatar === "object" ? c.avatar?.url : c.avatar,
    })),
  }));

  // 7. Rating
  const uiRating = product.rating || { value: 4.5, count: 100 }; // Fake số đẹp nếu backend chưa trả về

  return (
    <Box
      sx={{
        bgcolor: "#F9F5F1",
        minHeight: "100vh",
        fontFamily: '"Lexend", sans-serif',
      }}
    >
      <Header />
      <Box sx={{ maxWidth: 1440, mx: "auto", px: { xs: 2, md: 6 }, py: 6 }}>
        <ProductForm
          name={product.title}
          defaultPrice={0}
          images={uiImages}
          description={uiDescription}
          badges={uiBadges}
          breadcrumbs={breadcrumbs}
          sizes={uiSizes}
          colors={uiColors}
          variantsData={uiVariantsData as any}
          rating={uiRating}
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
