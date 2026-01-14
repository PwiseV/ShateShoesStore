import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";

// 1. ĐỊNH NGHĨA TYPE TRỰC TIẾP TẠI ĐÂY (Không cần import từ services)
type RelatedItem = {
  id: string;
  src: string;
  alt?: string;
};

// 2. DỮ LIỆU FIX CỨNG
const defaultItems: RelatedItem[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=600&q=80",
    alt: "Giày 1",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
    alt: "Giày 2",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
    alt: "Giày 3",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
    alt: "Giày 4",
  },
];

export type RecomendationProps = {
  title?: string;
  className?: string;
  // Optional: Nếu cha truyền vào thì dùng, không thì dùng defaultItems
  items?: RelatedItem[];
};

const Recomendation: React.FC<RecomendationProps> = ({
  title = "Có thể bạn sẽ quan tâm",
  className,
  items,
}) => {
  // Ưu tiên dùng items truyền vào, nếu không có thì dùng defaultItems
  const data = items && items.length > 0 ? items : defaultItems;

  const [favorites, setFavorites] = useState<string[]>([]);

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
        {data.map((item) => {
          const isLiked = favorites.includes(item.id);

          return (
            <Grid item xs={6} md={3} key={item.id}>
              <Link
                to={`/products/${encodeURIComponent(item.id)}`}
                style={{ display: "block", textDecoration: "none" }}
                aria-label={item.alt ?? "Sản phẩm liên quan"}
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
                  <img src={item.src} alt={item.alt ?? "Product"} />

                  {/* NÚT TIM */}
                  <IconButton
                    className="fav-btn"
                    disableRipple
                    onClick={(e) => handleToggleFavorite(e, item.id)}
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      bgcolor: "#fff",
                      color: isLiked ? "#ff4757" : "#333",
                      width: 36,
                      height: 36,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      transition: "all 0.3s ease",
                      "&:focus": { outline: "none" },
                      "&:hover": {
                        bgcolor: "#fff",
                        color: "#ff4757",
                      },
                    }}
                  >
                    {isLiked ? (
                      <FavoriteIcon sx={{ fontSize: 20 }} />
                    ) : (
                      <FavoriteBorderIcon sx={{ fontSize: 20 }} />
                    )}
                  </IconButton>
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
