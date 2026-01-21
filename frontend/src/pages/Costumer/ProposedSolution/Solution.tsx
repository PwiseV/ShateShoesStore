import React, { useEffect } from "react";
import { Box, Container } from "@mui/material"; // Bỏ import Grid

import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";

import ContactInfo from "./components/ContactInfo";
import ContactForm from "./components/ContactForm";

const Solution = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "#F5EFEB",
      }}
    >
      <Header />

      <Container maxWidth="xl" sx={{ flex: 1, py: 8, px: { xs: 2, md: 8 } }}>
        {/* [THAY ĐỔI] Dùng Flexbox thay vì Grid */}
        <Box
          sx={{
            display: "flex",
            // Mobile: Xếp chồng (column), Laptop trở lên: Xếp ngang (row)
            flexDirection: { xs: "column", md: "row" },
            // Khoảng cách giữa 2 cột
            gap: { xs: 6, md: 10 },
            // Căn lề trên cùng
            alignItems: "flex-start",
          }}
        >
          {/* --- CỘT TRÁI: TEXT --- */}
          {/* Ép chiều rộng cứng 40% trên desktop */}
          <Box
            sx={{
              width: { xs: "100%", md: "40%" },
              flexShrink: 0, // Không cho co lại
            }}
          >
            <ContactInfo />
          </Box>

          {/* --- CỘT PHẢI: FORM --- */}
          {/* flex: 1 để chiếm hết khoảng trống còn lại (khoảng 60%) */}
          <Box
            sx={{
              flex: 1,
              width: "100%", // Đảm bảo full width trên mobile
            }}
          >
            <ContactForm />
          </Box>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default Solution;
