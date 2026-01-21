import React, { useState, useEffect } from "react";
import { Box, Typography, Container } from "@mui/material";

import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";
import SideBar from "../../../components/Customer/SideBar";

import FavouriteGrid from "./components/FavouriteProductGrid/FavouriteGrid";
import Pagination from "./components/Pagination/Pagination";
import { type Product } from "./components/FavouriteProductGrid/FavouriteCard";

import {
  getFavouriteList,
  removeFromFavourite,
} from "../../../services/fakeFavouriteServices";

const Favourite = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const ITEMS_PER_PAGE = 6;

  // 1. Hàm gọi API lấy danh sách
  const fetchFavourites = async () => {
    setLoading(true);
    try {
      const response = await getFavouriteList(page, ITEMS_PER_PAGE);

      setProducts(response.data);
      setTotalPages(response.totalPages);
      setTotalItems(response.total);
    } catch (error) {
      console.error("Failed to fetch favourites:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, [page]);

  // 2. Hàm xử lý Xóa sản phẩm
  const handleRemoveProduct = async (id: string) => {
    try {
      await removeFromFavourite(id);

      setProducts((prev) => prev.filter((product) => product.id !== id));

      setTotalItems((prev) => (prev > 0 ? prev - 1 : 0));

      if (products.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        // Nếu vẫn còn sản phẩm hoặc đang ở trang 1, gọi lại API để làm mới data (nếu muốn lấp đầy chỗ trống từ trang sau)
        // fetchFavourites(); // Bỏ comment dòng này nếu muốn sản phẩm trang sau tự động nhảy lên
      }
    } catch (error) {
      console.error("Remove failed:", error);
    }
  };

  // Hàm chuyển trang
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "#F5EFEB",
      }}
    >
      <Header />
      <Container maxWidth="xl" sx={{ py: 6, flex: 1, px: { xs: 2, md: 6 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          {/* SIDEBAR */}
          <Box
            sx={{
              width: { xs: "100%", md: "280px" },
              flexShrink: 0,
              minHeight: "600px",
            }}
          >
            <Box sx={{ height: "50%" }}>
              <SideBar selectedMenu="Favourite" />
            </Box>
          </Box>

          {/* NỘI DUNG */}
          <Box sx={{ flex: 1, width: "100%" }}>
            <Typography
              variant="h4"
              sx={{
                textAlign: "left",
                fontWeight: 800,
                color: "#2C3E50",
                mb: 4,
                fontFamily: '"Lexend", sans-serif',
              }}
            >
              {/* Hiển thị tổng số sản phẩm từ API */}
              Sản phẩm yêu thích ({totalItems})
            </Typography>

            {/* Truyền trực tiếp products (vì API đã cắt trang sẵn rồi) */}
            <FavouriteGrid
              products={products}
              loading={loading}
              onRemove={handleRemoveProduct}
            />

            {/* Chỉ hiện phân trang khi có nhiều hơn 1 trang */}
            {!loading && totalPages > 1 && (
              <Box sx={{ mt: 6 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default Favourite;
