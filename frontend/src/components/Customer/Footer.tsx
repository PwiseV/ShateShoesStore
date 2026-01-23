import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Grid, Typography, Stack } from "@mui/material";
import logoImg from "../../assets/logo3.svg"; // Đảm bảo đường dẫn logo đúng

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#567C8D", // Màu nền xanh xám giống hình
        color: "white",
        py: 6, // Padding trên dưới (48px)
        mt: "auto", // Đẩy footer xuống đáy nếu nội dung trang ngắn
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={4}
          alignItems="center" // Căn giữa theo chiều dọc
          justifyContent="space-between"
        >
          {/* 1. CỘT TRÁI: CÁC LIÊN KẾT CHÍNH SÁCH */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" }, // Mobile căn giữa, PC căn trái
                gap: 2,
              }}
            >
              {/* Dòng 1: Đổi trả & Bảo mật */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center", // <--- MẤU CHỐT: Căn giữa các dòng link với nhau
                  gap: 1,
                }}
              >
                {/* Dòng 1 */}
                <Box sx={{ display: "flex", gap: 3 }}>
                  <FooterLink to="/return-policy">
                    CHÍNH SÁCH ĐỔI TRẢ
                  </FooterLink>
                  <FooterLink to="/privacy-policy">
                    CHÍNH SÁCH BẢO MẬT
                  </FooterLink>
                </Box>

                {/* Dòng 2 (Sẽ tự động căn giữa so với dòng 1) */}
                <FooterLink to="/size-guide">HƯỚNG DẪN CHỌN SIZE</FooterLink>
              </Box>
              {/* --- KẾT THÚC HỘP GOM NHÓM --- */}
            </Box>
          </Grid>

          {/* 2. CỘT GIỮA: LOGO & TÊN THƯƠNG HIỆU */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                src={logoImg}
                alt="SHATE Logo"
                sx={{
                  height: 80, // Logo to giống hình
                  width: "auto",
                  mb: 1,
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 500,
                  letterSpacing: "4px",
                  fontFamily: '"Lexend", sans-serif',
                }}
              >
                SHATE
              </Typography>
            </Box>
          </Grid>

          {/* 3. CỘT PHẢI: SLOGAN */}
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: { xs: "center", md: "right" } }}>
              {" "}
              {/* Mobile giữa, PC phải */}
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  mb: 0.5,
                  fontFamily: '"Lexend", sans-serif',
                  fontWeight: 300,
                  textAlign: "center",
                }}
              >
                Shate – ví mỏng nhưng style đỉnh
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  fontFamily: '"Lexend", sans-serif',
                  fontWeight: 300,
                }}
              >
                Bước chuẩn phong cách, dẫn đầu xu hướng
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// Component nhỏ để style cho các Link (tránh lặp code)
const FooterLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <Typography
    component={Link}
    to={to}
    sx={{
      color: "white",
      textDecoration: "none",
      fontWeight: 700,
      fontSize: "0.9rem",
      textTransform: "uppercase",
      "&:hover": {
        textDecoration: "underline",
        color: "white",
      },
    }}
  >
    {children}
  </Typography>
);

export default Footer;
