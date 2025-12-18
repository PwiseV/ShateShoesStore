import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

export type Review = {
  id: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
  productVariant?: string;
};

export type ReviewListProps = {
  reviews: Review[];
  title?: string;
  subtitle?: string;
  emptyText?: string;
  className?: string;
};

const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  title = "Đánh giá của khách hàng",
  subtitle = "Khách hàng của chúng tôi không chỉ yêu những đôi giày đẹp, mà còn yêu cảm giác tự tin, êm ái và thanh lịch mà mỗi sản phẩm mang lại",
  emptyText = "Chưa có đánh giá",
  className,
}) => {
  return (
    <Box className={className} sx={{ fontFamily: '"DM Sans", sans-serif' }}>
      <Typography
        variant="h4"
        sx={{
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
        /* 1. GIẢM SPACING TỪ 3 XUỐNG 2: Để tiết kiệm không gian ngang 
           2. justifyContent="center": Căn giữa nguyên khối
        */
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="stretch"
        >
          {reviews.map((r) => (
            /* 3. ÉP CỘT (sm={4}):
               Bắt buộc chia 3 cột ngay từ màn hình Tablet/Laptop nhỏ (600px+)
            */
            <Grid
              item
              xs={12}
              sm={4}
              key={r.id}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                elevation={0}
                sx={{
                  // --- CẬP NHẬT KÍCH THƯỚC NHỎ HƠN ---
                  width: "100%", // Co giãn theo cột
                  maxWidth: "350px", // Giới hạn max 350px (nhỏ hơn 388px cũ để dễ lọt hàng)
                  height: "344px", // Giữ chiều cao cố định
                  // ------------------------------------

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
                    p: 3, // Giảm padding nhẹ (từ 4 xuống 3) cho thoáng chữ bên trong
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
                        // Cắt chữ nếu quá dài
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 4,
                      }}
                    >
                      “{r.comment}”
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
                      {new Date(r.createdAt)
                        .toISOString()
                        .slice(0, 16)
                        .replace("T", " ")}
                      {r.productVariant ? ` | ${r.productVariant}` : ""}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ReviewList;
