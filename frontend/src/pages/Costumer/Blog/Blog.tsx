import React, { useEffect } from "react";
import { Box, Container } from "@mui/material";

import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";

import TrendingSection from "./components/TrendingSection/TrendingSection";
import StorySection from "./components/StorySection/StorySection";
//import Newsletter from "./components/Newsletter/Newsletter";

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "#F5EFEB",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      {/* Nội dung chính nằm trong Container */}
      <Container maxWidth="lg" sx={{ flex: 1, py: 8 }}>
        <TrendingSection />
        <StorySection />
      </Container>

      {/* <Newsletter /> */}

      <Footer />
    </Box>
  );
};

export default Blog;
