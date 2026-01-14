import { useEffect, useMemo, useState } from "react";
import { Box, Grid } from "@mui/material";

import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";
import SearchBar from "./components/SearchBar";
import SortBar from "./components/SortBar";
import type { SortValue } from "./components/SortBar";
import CategorySidebar from "./components/CategorySidebar/CategorySidebar";
import ProductGrid from "./components/ProductGrid/ProductGrid";
import Pagination from "./components/Pagination/Pagination";

// Import từ fake service (hoặc real service nếu đã sửa tương ứng)
import {
  getAllProducts,
  getAllCategories,
  type Product,
  type ParentCategory,
} from "../../../services/productListServices";

const PAGE_SIZE = 6;

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ParentCategory[]>([]);

  // State Bộ Lọc (Backend xử lý)
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [query, setQuery] = useState("");

  // State Sắp Xếp (Frontend xử lý)
  const [sort, setSort] = useState<SortValue>("priceAsc");

  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);

  // 1. Lấy danh mục (1 lần đầu)
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Err cat:", error);
      }
    };
    fetchCats();
  }, []);

  // 2. GỌI API KHI THAY ĐỔI DANH MỤC HOẶC TỪ KHÓA (Backend Filter)
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getAllProducts({
          category: selectedCategory,
          keyword: query,
        });
        setProducts(data);
        setPage(1);
      } catch (error) {
        console.error("Err products:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [selectedCategory, query]); // Chỉ chạy lại khi Category hoặc Query đổi

  // 3. XỬ LÝ SẮP XẾP TẠI FRONTEND (Dựa trên mảng products backend trả về)
  const sortedAndPaginatedProducts = useMemo(() => {
    let arr = [...products]; // Copy mảng để không ảnh hưởng state gốc

    // -- FRONTEND SORTING --
    if (sort === "priceAsc") {
      arr.sort((a, b) => (a.priceVnd || 0) - (b.priceVnd || 0));
    } else if (sort === "priceDesc") {
      arr.sort((a, b) => (b.priceVnd || 0) - (a.priceVnd || 0));
    }

    // -- FRONTEND PAGINATION (Cắt trang) --
    // Nếu muốn phân trang thật ở backend thì đoạn này phải sửa khác
    const startIndex = (page - 1) * PAGE_SIZE;
    return arr.slice(startIndex, startIndex + PAGE_SIZE);
  }, [products, sort, page]); // Chạy lại khi danh sách SP, kiểu sort, hoặc trang đổi

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));

  // Scroll lên đầu khi chuyển trang
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div
      style={{
        background: "#F5EFEB",
        borderRadius: "40px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          width: "100%",
          px: 2,
          py: 4,
          flex: 1,
        }}
      >
        <SearchBar value={query} onChange={setQuery} />

        <Grid container spacing={3} alignItems="flex-start">
          {/* LEFT */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Box
              onClick={() => setSelectedCategory("")}
              sx={{
                mb: 2,
                fontWeight: 800,
                fontSize: "1.4rem",
                color: selectedCategory === "" ? "#212020" : "#2F4156",
                fontFamily: '"Lexend", sans-serif',
                cursor: "pointer",
                "&:hover": { color: "#212020" },
              }}
            >
              Danh Mục
            </Box>

            <CategorySidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={(catName) => setSelectedCategory(catName)}
            />
          </Grid>

          {/* RIGHT */}
          <Grid size={{ xs: 12, md: 9 }}>
            <SortBar value={sort} onChange={setSort} />

            <ProductGrid
              products={sortedAndPaginatedProducts}
              loading={loading}
            />

            {!loading && products.length > 0 && (
              <Pagination
                current={page}
                total={totalPages}
                onChange={setPage}
              />
            )}

            {!loading && products.length === 0 && (
              <Box sx={{ textAlign: "center", mt: 4, color: "#666" }}>
                Không tìm thấy sản phẩm nào.
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </div>
  );
};

export default ProductList;
