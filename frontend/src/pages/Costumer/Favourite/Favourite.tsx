import React, { useState, useEffect } from "react";
import { Box, Typography, Container } from "@mui/material";

import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";
import FavouriteGrid from "./components/FavouriteProductGrid/FavouriteGrid";
import Pagination from "./components/Pagination/Pagination";
// Thêm 'type' để tránh lỗi
import { type Product } from "./components/FavouriteProductGrid/FavouriteCard";

const Favourite = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Tạo 6 sản phẩm (2 hàng x 3 hình)
    const MOCK_DATA: Product[] = Array(6)
      .fill(null)
      .map((_, i) => ({
        id: i.toString(),
        name: "MIRA MARY SNEAKER",
        priceVnd: 349000,
        // SỬA LINK ẢNH: Dùng link này đảm bảo 100% lên hình
        image:
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop",
        rating: 5.0,
      }));

    setTimeout(() => {
      setProducts(MOCK_DATA);
      setLoading(false);
    }, 800);
  }, []);

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

      <Container
        maxWidth={false}
        sx={{
          width: { xl: "1200px", lg: "1100px", md: "90%", sm: "95%" }, // Giới hạn chiều rộng để không bị loãng
          mx: "auto",
          py: 8,
          flex: 1,
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "left",
              fontWeight: 800,
              color: "#2C3E50",
              mb: 5,
              fontFamily: '"Lexend", sans-serif',
            }}
          >
            Favourites
          </Typography>

          <FavouriteGrid products={products} loading={loading} />

          {!loading && products.length > 0 && <Pagination />}
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default Favourite;
