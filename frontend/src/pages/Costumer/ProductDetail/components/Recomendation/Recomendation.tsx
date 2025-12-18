import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// Dùng 4 ảnh giày dép đẹp từ Unsplash (Online)
const defaultItems: RecoItem[] = [
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

export type RecoItem = { id: string; src: string; alt?: string };
export type RecomendationProps = {
  title?: string;
  items?: RecoItem[];
  className?: string;
};

const Recomendation: React.FC<RecomendationProps> = ({
  title = "Có thể bạn sẽ quan tâm",
  items,
  className,
}) => {
  const data = items && items.length > 0 ? items : defaultItems;

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
          mb: 4,
          letterSpacing: "-0.5px",
          textAlign: "left",
          fontFamily: '"Lexend", sans-serif',
        }}
      >
        {title}
      </Typography>

      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item xs={6} md={3} key={item.id}>
            {/* --- CẬP NHẬT BOX CHỨA ẢNH TẠI ĐÂY --- */}
            <Box
              sx={{
                width: "100%",
                maxWidth: "250px",
                aspectRatio: "281 / 290",
                mx: "auto",

                overflow: "hidden",
                bgcolor: "#f0f0f0",
                cursor: "pointer",
                position: "relative",
                borderRadius: 2,
                "& img": {
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s ease",
                  display: "block",
                },
                "&:hover img": { transform: "scale(1.08)" },
                "&:hover .fav-btn": { opacity: 1, transform: "translateY(0)" },
              }}
            >
              <img src={item.src} alt={item.alt} />

              <IconButton
                className="fav-btn"
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  bgcolor: "#fff",
                  color: "#333",
                  width: 36,
                  height: 36,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  transition: "all 0.3s ease",
                  opacity: { xs: 1, md: 0 },
                  transform: { xs: "none", md: "translateY(-10px)" },
                  "&:hover": { bgcolor: "#fff", color: "#ff4757" },
                }}
              >
                <FavoriteBorderIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Recomendation;
