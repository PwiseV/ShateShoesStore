import { useEffect, useMemo, useState } from "react";
// Import Header/Footer (đường dẫn tùy project của bạn)
import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";
import { Box, Grid, Typography, Container } from "@mui/material";

import SearchBar from "./components/SearchBar";
import SortBar from "./components/SortBar";
import type { SortValue } from "./components/SortBar";
import CategorySidebar from "./components/CategorySidebar/CategorySidebar";
import ProductGrid from "./components/ProductGrid/ProductGrid";
import Pagination from "./components/Pagination/Pagination";
import type { Product } from "./components/ProductGrid/ProductCard";

// DATA MẪU (Đã update ảnh đẹp)
const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Giày vintage sneaker",
    priceVnd: 399000,
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p2",
    name: "MIRA MARY SNEAKER",
    priceVnd: 349000,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p3",
    name: "Moca Miu Loafer",
    priceVnd: 552000,
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p4",
    name: "Giày D-I-E-SEL Heels",
    priceVnd: 580000,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p5",
    name: "Giày Shizuka Flat",
    priceVnd: 380000,
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "p6",
    name: "Brownie Ballet",
    priceVnd: 322000,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=600&q=80",
  },
  // Thêm 1 sản phẩm để test trang 2
  {
    id: "p7",
    name: "Classic White",
    priceVnd: 450000,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&w=600&q=80",
  },
];

const CATEGORIES = [
  "Giày thể thao",
  "Mary Jane",
  "Boots",
  "Khuyến mãi",
  "Giày cao gót",
  "Loafer",
  "Giày búp bê",
  "Sandal",
  "Phụ kiện",
];

const PAGE_SIZE = 6;

const ProductList = () => {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortValue>("popular");
  const [page, setPage] = useState(1);
  const [expandCats, setExpandCats] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = PRODUCTS.filter((p) => !q || p.name.toLowerCase().includes(q));
    if (sort === "priceAsc")
      arr = [...arr].sort((a, b) => a.priceVnd - b.priceVnd);
    if (sort === "priceDesc")
      arr = [...arr].sort((a, b) => b.priceVnd - a.priceVnd);
    return arr;
  }, [query, sort]);

  useEffect(() => setPage(1), [query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page]
  );

  return (
    <div
      style={{
        background: "#F5EFEB",
        borderRadius: "40px",
        minHeight: "100vh",
      }}
    >
      <Header />

      <Box sx={{ maxWidth: 1200, mx: "auto", width: "100%", px: 2, py: 4 }}>
        <SearchBar value={query} onChange={setQuery} />

        <Grid container spacing={3} alignItems="flex-start">
          {/* LEFT: Category sidebar */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Box
              sx={{
                mb: 2,
                fontWeight: 800,
                fontSize: "1.4rem",
                color: "#2F4156",
                fontFamily: '"Lexend", sans-serif',
              }}
            >
              Danh Mục (100+)
            </Box>
            <CategorySidebar categories={CATEGORIES} onSelect={() => {}} />
          </Grid>

          {/* RIGHT: Products */}
          <Grid size={{ xs: 12, md: 9 }}>
            <SortBar value={sort ?? "popular"} onChange={setSort} />
            {/* PAGE_SIZE = 6 để đảm bảo 2 hàng × 3 cột */}
            <ProductGrid products={paginated} />
            <Pagination current={page} total={totalPages} onChange={setPage} />
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </div>
  );
};

export default ProductList;
