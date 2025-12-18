import React from "react";
import Box from "@mui/material/Box";
import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";
import ProductForm from "./components/Product/ProductForm";
import ReviewList, { type Review } from "./components/Review/ReviewList";
import Recomendation from "./components/Recomendation/Recomendation";
import { type GalleryImage } from "./components/Product/ProductGallery";
import { type OptionValue } from "./components/Product/ProductOptions";

// ... (Giữ nguyên phần Mock Data của bạn) ...
const mockImages: GalleryImage[] = [
  {
    id: "1",
    src: "/imgs/giay-mira-ballet-sneaker-xanh-duong-nu.avif",
    alt: "Ảnh 1",
  },
  { id: "2", src: "/imgs/giay-mira-ballet-sneaker-hong-nu.avif", alt: "Ảnh 2" },
  { id: "3", src: "/imgs/giay-mira-ballet-sneaker-vang-nu.avif", alt: "Ảnh 3" },
];
const mockSizes: OptionValue[] = [
  { id: "35", label: "35" },
  { id: "36", label: "36" },
  { id: "37", label: "37" },
  { id: "38", label: "38", disabled: true },
  { id: "39", label: "39" },
];
const mockColors: OptionValue[] = [
  { id: "yellow", label: "Vàng", swatch: "#f3c623" },
  { id: "pink", label: "Hồng", swatch: "#f8a1c4" },
  { id: "blue", label: "Xanh", swatch: "#7db3e6" },
];
const reviews: Review[] = [
  {
    id: "r1",
    author: "mattroibecon",
    rating: 5,
    comment:
      "Hàng giao nhanh, đóng gói tốt. Giày mang vừa chân, màu pastel trông iu lắm. Giá nhỉnh hơn các shop khác nhưng chất lượng, êm chân",
    createdAt: "2025-06-19T15:18:00.000Z",
    productVariant: "Xanh dương,36",
  },
  {
    id: "r2",
    author: "ngayvuituoi",
    rating: 5,
    comment:
      "Mình sợ rộng nên đặt lùi 1 size so với bình thường thì nhận về vừa in, giày lên chân form ôm và xinh lắm nhé. Y như hình shop đăng.",
    createdAt: "2025-08-14T11:28:00.000Z",
    productVariant: "Xanh dương,36",
  },
  {
    id: "r3",
    author: "okb3pru1e6",
    rating: 5,
    comment:
      "Thật sự là cực kì lười đánh giá sp luôn mà phải đánh giá vì giày quá xinhhh, form chuẩn bên ngoài trông cute điên🩰. Mà shop nhiệt tình dễ thương vaiz, mn bình thường đi size gì thì cứ chọn size như the nhé🫶",
    createdAt: "2025-06-21T23:21:00.000Z",
    productVariant: "Vàng,36",
  },
];
const related = [
  { id: "i1", src: "/imgs/related-1.jpg", alt: "SP 1" },
  { id: "i2", src: "/imgs/related-2.jpg", alt: "SP 2" },
  { id: "i3", src: "/imgs/related-3.jpg", alt: "SP 3" },
  { id: "i4", src: "/imgs/related-4.jpg", alt: "SP 4" },
];

const ProductDetail = () => {
  return (
    <Box
      sx={{
        bgcolor: "#F9F5F1",
        minHeight: "100vh",
        fontFamily: '"DM Sans", sans-serif',
      }}
    >
      <Header />

      {/* Container giới hạn độ rộng, không bo góc khung bao */}
      <Box
        sx={{ maxWidth: 1440, margin: "0 auto", px: { xs: 2, md: 6 }, py: 6 }}
      >
        <ProductForm
          name="MIRA MARY SNEAKER"
          images={mockImages}
          price={570000}
          breadcrumbs={["Giày Dép Nữ", "Giày Sục & Giày Búp Bê"]}
          badges={["Giày đi làm", "Giày đi chơi", "Giày Nhật"]}
          rating={{ value: 5, count: 18 }}
          description={[
            "Bạn nào mê phong cách retro - preppy kiểu Nhật thì chiếc này sinh ra để dành cho bạn 🩰🎒",
            "Form MaryJane phối hai dây chéo cực xinh, chất suede mềm nhẹ – đi học đi chơi đều ổn áp.",
            "Các màu basic dễ phối",
            "👟 Hàng sẵn SL ít các nàng nhanh tay pick ẻm nha",
          ]}
          sizes={mockSizes}
          colors={mockColors}
          onSubmit={(p) => console.log(p)}
          onBuyNow={() => console.log("Mua ngay")}
        />

        <Box sx={{ mt: 12 }}>
          <ReviewList reviews={reviews} />
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
