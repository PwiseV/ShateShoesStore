import { Box, Grid, Paper, Typography, Container } from "@mui/material";
import Img from "../../../../assets/StatSection.jpg";

const StatsSection = () => {
  return (
    // Container đảm bảo toàn bộ Section nằm giữa trang theo chiều ngang
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Grid
        container
        spacing={2}
        wrap="nowrap" // Ép các item không được xuống dòng
        alignItems="stretch"
      >
        {/* ITEM 1 - Nội dung chữ */}
        <Grid item sx={{ flex: 1 }}> {/* flex: 1 để chiếm 50% diện tích */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              p: { xs: 2, md: 6 },
              height: "100%",
              minHeight: { xs: 200, md: 350 },
              background: "linear-gradient(135deg, #4A7C9E 0%, #3A6C8E 100%)",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h3"
              sx={{ 
                fontWeight: 700, 
                mb: 1, 
                fontSize: { xs: "1.2rem", md: "2.25rem" }, // Giảm size chữ trên mobile để không bị vỡ dòng
                textAlign: "left" 
              }}
            >
              Who We Are
            </Typography>

            <Typography 
              sx={{ 
                lineHeight: 1.6, 
                color: "rgba(255,255,255,0.9)", 
                textAlign: "left",
                fontSize: { xs: "0.75rem", md: "1rem" } // Giảm size mô tả
              }}
            >
              Bởi mỗi bước chân đều xứng đáng được nâng niu — chúng tôi tạo nên
              những đôi giày kết hợp giữa thoải mái và phong cách.
            </Typography>
          </Paper>
        </Grid>

        {/* ITEM 2 - Hình ảnh */}
        <Grid item sx={{ flex: 1 }}> {/* flex: 1 để chiếm 50% diện tích còn lại */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              height: "100%",
              backgroundColor: "#E8E4DC",
            }}
          >
            <Box
              component="img"
              src={Img}
              alt="Sneakers"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block"
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StatsSection;