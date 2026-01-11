import React, { useEffect } from "react";
import { useLocation } from "react-router-dom"; // 1. Import useLocation
import { Box, Container, Grid } from "@mui/material";

import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";
import SideBar from "../../../components/Customer/SideBar";
import ProfileInfo from "./components/ProfileInfo";

const UserProfile = () => {
  const location = useLocation();

  // 2. Logic xác định Tab đang active dựa trên URL hiện tại
  // Logic này phải khớp với biến `routes` trong SideBar.tsx
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes("/favourite")) return "Favourite";
    if (path.includes("/history")) return "History";
    return "User"; // Mặc định là trang /profile
  };

  const activeTab = getActiveTab();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]); // Scroll lên đầu mỗi khi đổi tab

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

      <Container sx={{ maxWidth: "lg", flex: 1, py: 8 }}>
        <Grid container spacing={2}>
          {/* CỘT TRÁI: SIDEBAR */}
          <Grid item xs={12} md={3}>
            {/* 3. Truyền đúng tên prop là selectedMenu, bỏ onChangeTab */}
            <SideBar selectedMenu={activeTab} />
          </Grid>

          {/* CỘT PHẢI: NỘI DUNG CHÍNH */}
          <Grid item xs={12} md={9}>
            {/* 4. So sánh với chuỗi viết hoa ("User" thay vì "user") để khớp với SideBar */}
            {activeTab === "User" && <ProfileInfo />}

            {activeTab === "Favourite" && (
              <Box sx={{ pl: { md: 4 } }}>
                <Box sx={{ p: 4, bgcolor: "white", borderRadius: "20px" }}>
                  Nội dung Favourite (Đang phát triển)
                </Box>
              </Box>
            )}

            {activeTab === "History" && (
              <Box sx={{ pl: { md: 4 } }}>
                <Box sx={{ p: 4, bgcolor: "white", borderRadius: "20px" }}>
                  Nội dung History (Đang phát triển)
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
};

export default UserProfile;
