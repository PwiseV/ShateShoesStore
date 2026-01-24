import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useLocation } from "react-router-dom";
// Import service của bạn
import { getAllProducts, type Product } from "../../../../../services/productlistServices";

export type RecomendationProps = {
  title?: string;
  className?: string;
  limit?: number; // Cho phép tùy chỉnh số lượng sản phẩm (mặc định 4)
};

const Recomendation: React.FC<RecomendationProps> = ({
  title = "Có thể bạn sẽ quan tâm",
  className,
  limit = 4,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Lấy pathname để theo dõi sự thay đổi URL
  const { pathname } = useLocation();

  // --- LOGIC CUỘN LÊN ĐẦU TRANG ---
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // Thêm "smooth" để cuộn mượt mà hơn, hoặc "auto" để lên ngay lập tức
    });
  }, [pathname]);

  // --- FETCH DATA TỪ SERVICE ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProducts({ limit });
        if (response && response.products) {
          setProducts(response.products);
        }
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm đề xuất:", error);
      }
    };
    fetchData();
  }, [limit]);

  const handleToggleFavorite = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();

    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  if (products.length === 0) return null;

  return (
    <Box
      className={className}
      sx={{ fontFamily: '"DM Sans", sans-serif', width: "100%" }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          color: "#4A4A6A",
          mt: 4,
          mb: 4,
          letterSpacing: "-0.5px",
          textAlign: "left",
          fontFamily: '"Lexend", sans-serif',
        }}
      >
        {title}
      </Typography>

      <Grid container spacing={3}>
        {products.map((item) => {
          const isLiked = favorites.includes(item.id);

          return (
            <Grid item xs={6} md={3} key={item.id}>
              <Link
                to={`/products/details/${encodeURIComponent(item.id)}`}
                style={{ display: "block", textDecoration: "none" }}
                aria-label={item.name ?? "Sản phẩm liên quan"}
              >
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "260px",
                    aspectRatio: "280 / 300",
                    mx: "auto",
                    overflow: "hidden",
                    bgcolor: "#f0f0f0",
                    borderRadius: 2,
                    position: "relative",
                    "& img": {
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.5s ease",
                    },
                    "&:hover img": { transform: "scale(1.1)" },
                    "&:hover .fav-btn": {
                      opacity: 1,
                      transform: "translateY(0)",
                    },
                    "& .fav-btn": {
                      opacity: isLiked ? 1 : { xs: 1, md: 0 },
                      transform: isLiked
                        ? "translateY(0)"
                        : { xs: "none", md: "translateY(-10px)" },
                    },
                  }}
                >
                  <img src={item.image} alt={item.name ?? "Product"} />
                </Box>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Recomendation;