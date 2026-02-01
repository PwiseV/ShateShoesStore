import { useEffect, useMemo, useState } from "react";
import { Box, Grid } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";
import SearchBar from "./components/SearchBar";
import SortBar from "./components/SortBar";
import type { SortValue } from "./components/SortBar";
import CategorySidebar from "./components/CategorySidebar/CategorySidebar";
import ProductGrid from "./components/ProductGrid/ProductGrid";
import Pagination from "./components/Pagination/Pagination";

import {
  getAllProducts,
  getAllCategories,
  type Product,
  type ParentCategory,
} from "../../../services/productListServices";

const PAGE_SIZE = 6;

const ProductList = () => {
  // 1. Lấy slug từ URL
  const { slug } = useParams();
  const navigate = useNavigate();

  const currentSlug = slug || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ParentCategory[]>([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortValue>("priceAsc");
  const [loading, setLoading] = useState<boolean>(true);

  // State quản lý phân trang
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // [SỬA] Dùng state này để lưu tổng số trang từ Backend

  // 2. Lấy danh sách Categories
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

  // Logic tìm tên Category
  const categoryNameToSend = useMemo(() => {
    if (!currentSlug) return "";
    if (categories.length === 0) return "";
    for (const parent of categories) {
      if (parent.slug === currentSlug) return parent.name;
      const child = parent.category.find((c) => c.slug === currentSlug);
      if (child) return child.name;
    }
    return currentSlug;
  }, [categories, currentSlug]);

  // 3. Gọi API lấy sản phẩm
  useEffect(() => {
    if (currentSlug && categories.length === 0) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        // [SỬA QUAN TRỌNG]: Nhận object { products, pagination } thay vì mảng data
        const response = await getAllProducts({
          category: categoryNameToSend,
          keyword: query,
          page: page, // [THÊM]: Gửi trang hiện tại lên server
          limit: PAGE_SIZE, // [THÊM]: Gửi giới hạn (6) lên server
        });

        // Cập nhật State
        setProducts(response.products);
        setTotalPages(response.pagination.totalPages); // [THÊM]: Cập nhật tổng số trang thật từ backend
      } catch (error) {
        console.error("Err products:", error);
        // Reset nếu lỗi
        setProducts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [categoryNameToSend, query, categories.length, currentSlug, page]); // [QUAN TRỌNG]: Thêm 'page' vào dependency để gọi lại API khi chuyển trang

  // 4. Logic Sort (ĐÃ SỬA: BỎ slice phân trang)
  const sortedProducts = useMemo(() => {
    // Backend đã trả về đúng 6 item rồi, Frontend chỉ việc sắp xếp lại nếu cần
    let arr = [...products];
    if (sort === "priceAsc") {
      arr.sort((a, b) => (a.priceVnd || 0) - (b.priceVnd || 0));
    } else if (sort === "priceDesc") {
      arr.sort((a, b) => (b.priceVnd || 0) - (a.priceVnd || 0));
    }
    // [QUAN TRỌNG]: Không dùng .slice() ở đây nữa
    return arr;
  }, [products, sort]);

  // [ĐÃ XÓA]: Dòng tính toán totalPages sai logic cũ
  // const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div
      style={{
        background: "#F5EFEB",
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
          <Grid size={{ xs: 12, md: 3 }}>
            <Box
              onClick={() => navigate("/products")}
              sx={{
                mb: 2,
                fontWeight: 800,
                fontSize: "1.4rem",
                color: "#2F4156",
                fontFamily: '"Lexend", sans-serif',
                cursor: "pointer",
                "&:hover": { color: "#212020" },
              }}
            >
              Danh Mục
            </Box>

            <CategorySidebar
              categories={categories}
              selectedCategory={currentSlug}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <SortBar value={sort} onChange={setSort} />
            <ProductGrid
              products={sortedProducts} // Sử dụng danh sách đã bỏ slice
              loading={loading}
            />

            {!loading && products.length > 0 && (
              <Pagination
                current={page}
                total={totalPages} // Sử dụng state totalPages lấy từ API
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
