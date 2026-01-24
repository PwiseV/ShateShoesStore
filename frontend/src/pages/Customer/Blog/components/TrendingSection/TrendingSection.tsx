import React, { useRef, useState, useEffect } from "react";
import { Box, Typography, IconButton, CircularProgress } from "@mui/material"; // Thêm CircularProgress
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TrendingCard from "./TrendingCard";

import { getTrendingProducts } from "../../../../../services/blogServices";
import { type Product } from "../../../../../services/blogServices";

const TrendingSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getTrendingProducts(6);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch trending products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const checkForScrollPosition = () => {
    const { current } = scrollContainerRef;
    if (current) {
      const { scrollLeft, scrollWidth, clientWidth } = current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkForScrollPosition();
    window.addEventListener("resize", checkForScrollPosition);
    return () => window.removeEventListener("resize", checkForScrollPosition);
  }, [products]);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 220;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const navButtonStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    bgcolor: "background.paper",
    color: "text.primary",
    boxShadow: 3,
    border: "1px solid",
    borderColor: "divider",
    "&:hover": { bgcolor: "background.default" },
    display: { xs: "none", md: "inline-flex" },
  };

  return (
    <Box sx={{ mb: 10, textAlign: "left", minHeight: 300 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          color: "#2C3E50",
          fontFamily: '"Lexend", sans-serif',
          mb: 4,
        }}
      >
        Top Trendings
      </Typography>

      {/* [MỚI] Hiển thị Loading hoặc Dữ liệu */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
          <CircularProgress sx={{ color: "#2C3E50" }} />
        </Box>
      ) : (
        <Box sx={{ position: "relative" }}>
          {canScrollLeft && (
            <IconButton
              onClick={() => handleScroll("left")}
              sx={{ ...navButtonStyle, left: -20 }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
          )}

          <Box
            ref={scrollContainerRef}
            onScroll={checkForScrollPosition}
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              scrollBehavior: "smooth",
              pb: 2,
              px: 1,
              "&::-webkit-scrollbar": { display: "none" },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {/* [MỚI] Map qua state products thay vì biến TRENDING_DATA */}
            {products.map((item) => (
              <Box
                key={item.id}
                sx={{
                  width: { xs: "220px", md: "280px" },
                  minWidth: { xs: "220px", md: "280px" },
                  maxWidth: { xs: "220px", md: "280px" },
                  flex: "0 0 auto",
                }}
              >
                <TrendingCard
                  id={item.id}
                  name={item.name}
                  image={item.image}
                />
              </Box>
            ))}
          </Box>

          {canScrollRight && (
            <IconButton
              onClick={() => handleScroll("right")}
              sx={{ ...navButtonStyle, right: -20 }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      )}
    </Box>
  );
};

export default TrendingSection;
