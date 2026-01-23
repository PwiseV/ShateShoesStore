import React, { useState } from "react";
import { Box, Typography, Rating, TextField, Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

interface ReviewData {
  rating: number;
  comment: string;
}

interface Props {
  onSubmit: (data: ReviewData) => void;
  loading?: boolean;
}

const ReviewForm = ({ onSubmit, loading = false }: Props) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (rating > 0) onSubmit({ rating, comment });
  };

  return (
    <Box
      sx={{
        p: { xs: 4, md: 8 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        bgcolor: "white",
      }}
    >
      {/* 1. TIÊU ĐỀ */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          color: "#2C3E50",
          fontFamily: '"Lexend", sans-serif',
          textAlign: "center",
          mb: 4,
          fontSize: { xs: "1.8rem", md: "2.2rem" },
        }}
      >
        Đánh giá sản phẩm
      </Typography>

      {/* 2. RATING */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
        <Rating
          name="product-rating"
          value={rating}
          onChange={(_, val) => setRating(val)}
          icon={<StarIcon sx={{ fontSize: "4rem" }} fontSize="inherit" />}
          emptyIcon={<StarIcon sx={{ fontSize: "4rem" }} fontSize="inherit" />}
          sx={{
            gap: 1.5,
            color: "#9FA0BC",
            "& .MuiRating-iconFilled": { color: "#9FA0BC" },
            "& .MuiRating-iconEmpty": { color: "#E0E0E0" },
            "& .MuiRating-iconHover": { color: "#8586a5" },
          }}
        />
      </Box>

      {/* 3. LABEL */}
      <Typography
        sx={{
          fontWeight: 700,
          color: "#2C3E50",
          fontFamily: '"Lexend", sans-serif',
          mb: 1.5,
          fontSize: "1.1rem",
        }}
      >
        Nhận xét của bạn
      </Typography>

      {/* 4. TEXTAREA */}
      <TextField
        fullWidth
        multiline
        rows={5}
        placeholder="Nhập nhận xét"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        variant="outlined"
        sx={{
          mb: 5, // Tăng khoảng cách dưới một chút cho thoáng
          bgcolor: "#F0F2F5",
          borderRadius: "0px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "0px",
            padding: "20px",
            "& fieldset": { border: "none" },
            "&.Mui-focused fieldset": { border: "none" },
          },
          "& input::placeholder, & textarea::placeholder": {
            color: "#8898AA",
            opacity: 1,
            fontFamily: '"Lexend", sans-serif',
          },
          "& textarea": {
            fontFamily: '"Lexend", sans-serif',
            color: "#333",
            fontSize: "1rem",
          },
        }}
      />

      {/* 5. BUTTON (ĐÃ SỬA: CĂN GIỮA & DÀI HƠN) */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {" "}
        {/* Căn giữa */}
        <Button
          onClick={handleSubmit}
          disabled={loading}
          variant="contained"
          fullWidth // Kéo dài full chiều ngang
          sx={{
            bgcolor: "#5E7C88",
            color: "white",
            textTransform: "none",
            fontSize: "1.1rem",
            fontWeight: 700,
            py: 1.5,
            borderRadius: "0px",
            boxShadow: "none",
            fontFamily: '"Lexend", sans-serif',
            maxWidth: "400px", // Giới hạn độ dài tối đa cho đẹp mắt
            "&:hover": {
              bgcolor: "#4A626C",
              boxShadow: "none",
            },
          }}
        >
          {loading ? "Đang gửi..." : "Gửi đánh giá"}
        </Button>
      </Box>
    </Box>
  );
};

export default ReviewForm;
