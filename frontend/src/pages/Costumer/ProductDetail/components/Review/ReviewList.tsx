import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Stack from "@mui/material/Stack";

// --- CẬP NHẬT TYPE REVIEW MỚI (Khớp với Type ProductReview bên Fake Service) ---
export type Review = {
  reviewId: string;
  author: string;
  rating: number;
  content: string;
  createdAt: string;
  size?: string;
  color?: string;
  productVariant?: string;
};

export type ReviewListProps = {
  reviews: Review[];
  title?: string;
  subtitle?: string;
  emptyText?: string;
  className?: string;
};

const ITEMS_PER_PAGE = 3; // [3] Định nghĩa số lượng hiển thị

const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  title = "Khách hàng đánh giá",
  subtitle = "Khách hàng của chúng tôi không chỉ yêu những đôi giày đẹp, mà còn yêu cảm giác tự tin, êm ái và thanh lịch mà mỗi sản phẩm mang lại",
  emptyText = "Chưa có đánh giá",
  className,
}) => {
  // [4] State quản lý trang hiện tại
  const [page, setPage] = useState(0);

  // Tính toán số trang
  const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE);

  // Cắt danh sách review theo trang
  const visibleReviews = reviews.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <Box className={className} sx={{ fontFamily: '"DM Sans", sans-serif' }}>
      <Typography
        variant="h4"
        sx={{
          mt: 4,
          mb: 1.5,
          fontWeight: 800,
          textAlign: "center",
          color: "#2C3E50",
          letterSpacing: "-0.5px",
          fontFamily: '"DM Sans", sans-serif',
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 5,
          textAlign: "center",
          color: "#555",
          maxWidth: 900,
          mx: "auto",
          lineHeight: 1.6,
          fontSize: "0.9rem",
          fontFamily: '"DM Sans", sans-serif',
        }}
      >
        {subtitle}
      </Typography>

      {reviews.length === 0 ? (
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {emptyText}
        </Typography>
      ) : (
        <Box>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="stretch"
          >
            {/* [5] Map qua danh sách visibleReviews thay vì reviews gốc */}
            {visibleReviews.map((r) => (
              <Grid
                item
                xs={12}
                sm={4}
                key={r.reviewId}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Card
                  elevation={0}
                  sx={{
                    width: "100%",
                    maxWidth: "330px",
                    height: "344px",
                    borderRadius: "24px",
                    border: "1px solid #D0D6E8",
                    bgcolor: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      borderColor: "#6B8E9B",
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 24px -10px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: 3,
                      textAlign: "left",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      overflow: "hidden",
                    }}
                  >
                    <Box>
                      <Rating
                        value={r.rating}
                        readOnly
                        sx={{ mb: 2, color: "#F4C430", fontSize: "1.3rem" }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          mb: 2,
                          color: "#475467",
                          lineHeight: 1.6,
                          fontSize: "0.9rem",
                          fontFamily: '"DM Sans", sans-serif',
                          display: "-webkit-box",
                          overflow: "hidden",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 4,
                        }}
                      >
                        “{r.content}”
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 800,
                          color: "#101828",
                          mb: 0.5,
                          fontFamily: '"DM Sans", sans-serif',
                        }}
                      >
                        {r.author}
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{
                          display: "block",
                          color: "#98A2B3",
                          fontFamily: '"DM Sans", sans-serif',
                          fontWeight: 500,
                          fontSize: "0.8rem",
                        }}
                      >
                        {new Date(r.createdAt).toISOString().slice(0, 10)}
                        {(r.size || r.color) && (
                          <span style={{ marginLeft: "8px" }}>
                            | {r.color ? r.color : ""}{" "}
                            {r.size ? `/ Size ${r.size}` : ""}
                          </span>
                        )}
                        {!r.size && !r.color && r.productVariant
                          ? ` | ${r.productVariant}`
                          : ""}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* [6] Nút điều hướng - Chỉ hiện nếu có nhiều hơn 1 trang ( > 3 reviews) */}
          {totalPages > 1 && (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 4 }}
            >
              <IconButton
                onClick={handlePrev}
                disabled={page === 0}
                sx={{
                  border: "1px solid #D0D6E8",
                  color: "#2C3E50",
                  "&:hover": { bgcolor: "#f0f0f0" },
                  "&.Mui-disabled": { opacity: 0.3 },
                }}
              >
                <ArrowBackIosNewIcon fontSize="small" />
              </IconButton>

              <Typography
                variant="body2"
                sx={{
                  color: "#555",
                  fontWeight: 600,
                  userSelect: "none",
                }}
              >
                {page + 1} / {totalPages}
              </Typography>

              <IconButton
                onClick={handleNext}
                disabled={page === totalPages - 1}
                sx={{
                  border: "1px solid #D0D6E8",
                  color: "#2C3E50",
                  "&:hover": { bgcolor: "#f0f0f0" },
                  "&.Mui-disabled": { opacity: 0.3 },
                }}
              >
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            </Stack>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ReviewList;
