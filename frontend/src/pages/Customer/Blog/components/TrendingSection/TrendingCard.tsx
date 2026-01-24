import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

type TrendingCardProps = {
  id: string | number;
  name: string;
  image: string;
};

const TrendingCard: React.FC<TrendingCardProps> = ({ id, name, image }) => {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={0}
      onClick={() => navigate(`/products/details/${id}`)}
      sx={{
        bgcolor: "white",
        p: 2,
        borderRadius: "16px",
        height: "100%",
        //width: "60%",
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
        },
      }}
    >
      {/* Khung chứa ảnh */}
      <Box
        sx={{
          width: "100%",
          mx: "auto",
          aspectRatio: "1/1",
          overflow: "hidden",
          borderRadius: "12px",
          mb: 2,
          bgcolor: "#f9f9f9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src={image}
          alt={name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transition: "transform 0.5s ease",
            "&:hover": { transform: "scale(1.1)" },
          }}
        />
      </Box>

      {/* Tên sản phẩm */}
      <Box sx={{ textAlign: "center", pb: 0.5 }}>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: "0.9rem",
            color: "#2C3E50",
            textTransform: "uppercase",
            fontFamily: "Lexend, sans-serif",
            letterSpacing: "0.5px",
          }}
        >
          {name}
        </Typography>
      </Box>
    </Paper>
  );
};

export default TrendingCard;
