import bannerHompage from "../../../../assets/bannerHompage.png";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Paper, Box, Container } from "@mui/material";

const Banner = () => {
  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', py: 2 }}>
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            position: "relative",
            display: "flex",
            backgroundColor: "transparent",
            boxShadow: "none",
            // Đẩy toàn bộ nội dung xuống dưới đáy
            alignItems: "flex-end", 
            minHeight: "500px",
            overflow: "hidden",
            borderRadius: "20px",
          }}
        >
          {/* Ảnh nền */}
          <Box
            component="img"
            src={bannerHompage}
            alt="Banner"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
            }}
          />

          {/* Nội dung Content - Nằm ở dưới cùng */}
          <Box
            sx={{
              display: "flex",
              zIndex: 2,
              width: "100%",
              // Padding đáy để chữ không chạm mép tuyệt đối
              pb: 4, 
              px: { xs: 3, md: 6 },
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: "flex-end", // Căn các cột nội dung theo đáy
              gap: 2
            }}
          >
            {/* Cột trái: Tiêu đề nhỏ lại */}
            <Box sx={{ flex: 1.5 }}>
              <h1
                style={{
                  fontSize: "1.75rem", // Thu nhỏ tiêu đề
                  lineHeight: "1.2",
                  color: "#334E68",
                  fontWeight: 700,
                  textAlign: "left",
                  margin: 0,
                  letterSpacing: "-0.5px"
                }}
              >
                Find The Best Fashion Shoes <br /> Style For You
              </h1>
            </Box>

            {/* Cột phải: Mô tả & Button nhỏ lại */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <p
                style={{
                  color: "#102A43",
                  fontSize: "0.85rem", // Thu nhỏ mô tả
                  lineHeight: "1.5",
                  fontWeight: 500,
                  marginBottom: "1rem",
                  textAlign: "left",
                  maxWidth: "350px"
                }}
              >
                Mỗi đôi giày được sinh ra từ niềm tin rằng sự tự tin và
                thanh lịch bắt nguồn từ những điều nhỏ bé.
              </p>
              
              <button
                style={{
                  background: "#546E7A",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1.2rem", // Nút thu nhỏ lại
                  borderRadius: "6px",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                SHOP NOW <ShoppingBagIcon sx={{ fontSize: 16 }}/>
              </button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Banner;