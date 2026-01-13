import { useEffect, useMemo, useState } from "react";
import { Box, Grid } from "@mui/material";

// Import Header/Footer
import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";

// Import Components con
import SearchBar from "./components/SearchBar";
import SortBar from "./components/SortBar";
import type { SortValue } from "./components/SortBar";
import CategorySidebar from "./components/CategorySidebar/CategorySidebar";
import ProductGrid from "./components/ProductGrid/ProductGrid";
import Pagination from "./components/Pagination/Pagination";

// --- THAY ĐỔI 1: Import Service và Type từ file service ---
// Khi nào muốn dùng API thật, bạn chỉ cần đổi đường dẫn import thành "./productlistServices"
import {
  getAllProducts,
  getAllCategories,
  type Product,
  type Category,
} from "../../../services/productListServices";

const PAGE_SIZE = 6;

const ProductList = () => {
  // --- THAY ĐỔI 2: Thêm State để chứa dữ liệu từ API ---
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // State quản lý trạng thái tải trang
  const [loading, setLoading] = useState<boolean>(true);

  // State bộ lọc
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortValue>("priceAsc");
  const [page, setPage] = useState(1);

  // --- THAY ĐỔI 3: useEffect để gọi API khi component mount ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Gọi song song cả 2 API để tiết kiệm thời gian
        const [productsData, categoriesData] = await Promise.all([
          getAllProducts(),
          getAllCategories(),
        ]);

        setAllProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch product list data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Scroll lên đầu trang khi chuyển page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // Reset về trang 1 khi filter thay đổi
  useEffect(() => setPage(1), [query, sort]);

  // --- THAY ĐỔI 4: Logic lọc dữ liệu dựa trên State 'allProducts' (thay vì biến PRODUCTS cũ) ---
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    // Lọc theo tên
    let arr = allProducts.filter((p) => !q || p.name.toLowerCase().includes(q));

    // Sắp xếp
    if (sort === "priceAsc") {
      // Sắp xếp giá tăng dần (đảm bảo trừ 2 số)
      arr = [...arr].sort((a, b) => (a.priceVnd || 0) - (b.priceVnd || 0));
    } else if (sort === "priceDesc") {
      // Sắp xếp giá giảm dần
      arr = [...arr].sort((a, b) => (b.priceVnd || 0) - (a.priceVnd || 0));
    }

    return arr;
  }, [query, sort, allProducts]); // Thêm allProducts vào dependency

  // Tính toán phân trang
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
        display: "flex", // Thêm flex để footer luôn ở dưới đáy nếu nội dung ngắn
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
              Danh Mục
            </Box>
            {/* Truyền dữ liệu categories từ state vào */}
            <CategorySidebar
              categories={categories}
              onSelect={(cat) => console.log("Selected:", cat)}
            />
          </Grid>

          {/* RIGHT: Products */}
          <Grid size={{ xs: 12, md: 9 }}>
            <SortBar value={sort} onChange={setSort} />

            {/* Truyền loading prop xuống Grid để hiện Skeleton */}
            <ProductGrid products={paginated} loading={loading} />

            {/* Chỉ hiện phân trang khi không loading và có dữ liệu */}
            {!loading && filtered.length > 0 && (
              <Pagination
                current={page}
                total={totalPages}
                onChange={setPage}
              />
            )}
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </div>
  );
};

export default ProductList;
