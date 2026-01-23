import React, { useState, useEffect } from "react";
import { Box, Typography, Container } from "@mui/material";

import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";
import SideBar from "../../../components/Customer/SideBar";

import FavouriteGrid from "./components/FavouriteProductGrid/FavouriteGrid";
import Pagination from "./components/Pagination/Pagination";

import { useToast } from "../../../context/useToast";

import { type FavouriteProduct } from "../../../services/favouriteServices";
import {
  getFavouriteList,
  removeFromFavourite,
} from "../../../services/favouriteServices";

const Favourite = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<FavouriteProduct[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const ITEMS_PER_PAGE = 6;

  // [MỚI] Khởi tạo toast
  const { showToast } = useToast();

  const fetchFavourites = async () => {
    setLoading(true);
    try {
      const response = await getFavouriteList(page, ITEMS_PER_PAGE);
      setProducts(response.data);
      setTotalItems(response.count);
      const calculatedTotalPages = Math.ceil(response.count / ITEMS_PER_PAGE);
      setTotalPages(calculatedTotalPages > 0 ? calculatedTotalPages : 1);
    } catch (error) {
      console.error("Failed to fetch favourites:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, [page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // [CẬP NHẬT] Xử lý xóa và hiển thị Toast
  const handleRemoveProduct = async (productId: string) => {
    try {
      // Gọi API xóa và nhận response
      const response = await removeFromFavourite(productId);

      // Hiển thị thông báo từ backend (response.message)
      showToast(response.message, "success");

      // Cập nhật UI
      setProducts((prev) => prev.filter((p) => p.productId !== productId));
      setTotalItems((prev) => (prev > 0 ? prev - 1 : 0));

      if (products.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      }
    } catch (error: any) {
      console.error("Failed to remove product:", error);
      // Hiển thị lỗi nếu có
      showToast(error.message || "Xóa thất bại", "error");
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#F5EFEB",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
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
              Sản phẩm yêu thích ({totalItems})
            </Typography>

            <FavouriteGrid
              products={products}
              loading={loading}
              onRemove={handleRemoveProduct}
            />

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
