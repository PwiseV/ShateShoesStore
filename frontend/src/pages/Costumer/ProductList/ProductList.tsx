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

  // Biến này là SLUG lấy từ URL (VD: "giay-tay")
  const currentSlug = slug || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ParentCategory[]>([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortValue>("priceAsc");
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);

  // 2. Lấy danh sách Categories (Chạy 1 lần đầu)
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

  // [LOGIC MỚI QUAN TRỌNG]: Tìm "Name" dựa trên "Slug"
  // Chúng ta duyệt qua mảng categories để tìm xem slug 'giay-tay' là của 'Giày Tây'
  const categoryNameToSend = useMemo(() => {
    if (!currentSlug) return ""; // Nếu không có slug -> Tất cả -> Gửi rỗng
    if (categories.length === 0) return ""; // Chưa tải xong danh mục -> Tạm gửi rỗng

    // Duyệt tìm trong cây danh mục
    for (const parent of categories) {
      // 1. Check cha (nếu cần)
      if (parent.slug === currentSlug) return parent.name;

      // 2. Check con
      const child = parent.category.find((c) => c.slug === currentSlug);
      if (child) return child.name; // Tìm thấy! Trả về "Giày Tây"
    }

    return currentSlug; // Fallback: Nếu không tìm thấy thì gửi luôn slug (hoặc xử lý lỗi)
  }, [categories, currentSlug]);

  // 3. Gọi API lấy sản phẩm
  useEffect(() => {
    // Nếu có slug trên URL mà danh mục chưa tải xong thì khoan hãy gọi API Product
    // Để tránh việc gọi API với tham số sai.
    if (currentSlug && categories.length === 0) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getAllProducts({
          category: categoryNameToSend, // [QUAN TRỌNG] Gửi NAME (Giày Tây), không gửi SLUG
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
  }, [categoryNameToSend, query, categories.length, currentSlug]);
  // Dependency thay đổi: khi tìm được tên đúng thì mới gọi

  // 4. Logic Sort & Pagination (Giữ nguyên)
  const sortedAndPaginatedProducts = useMemo(() => {
    let arr = [...products];
    if (sort === "priceAsc") {
      arr.sort((a, b) => (a.priceVnd || 0) - (b.priceVnd || 0));
    } else if (sort === "priceDesc") {
      arr.sort((a, b) => (b.priceVnd || 0) - (a.priceVnd || 0));
    }
    const startIndex = (page - 1) * PAGE_SIZE;
    return arr.slice(startIndex, startIndex + PAGE_SIZE);
  }, [products, sort, page]);

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));

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
              selectedCategory={currentSlug} // Sidebar vẫn cần SLUG để highlight đúng
            />
          </Grid>

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
