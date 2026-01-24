import { useNavigate } from "react-router-dom"; // 1. Import hook điều hướng
import bannerHompage from "../../../../assets/bannerHompage.png";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Paper, Box, Container, Button } from "@mui/material"; // Dùng Button của MUI cho đồng bộ

const Banner = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/products"); 
  };

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

          {/* Nội dung Content */}
          <Box
            sx={{
              display: "flex",
              zIndex: 2,
              width: "100%",
              pb: 4, 
              px: { xs: 3, md: 6 },
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: "flex-end",
              gap: 2
            }}
          >
            <Box sx={{ flex: 1.5 }}>
              <h1
                style={{
                  fontSize: "1.75rem",
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
                  fontSize: "0.85rem",
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
              
              {/* 4. Cập nhật nút bấm với sự kiện onClick */}
              <Button
                variant="contained"
                onClick={handleShopNow}
                endIcon={<ShoppingBagIcon sx={{ fontSize: 16 }}/>}
                sx={{
                  background: "#546E7A",
                  color: "white",
                  padding: "0.5rem 1.2rem",
                  borderRadius: "6px",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                  textTransform: "none", // Giữ nguyên chữ hoa thường
                  "&:hover": {
                    background: "#37474F",
                  },
                }}
              >
                SHOP NOW
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Banner;