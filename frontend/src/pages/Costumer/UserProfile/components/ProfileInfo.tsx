import React from "react";
import { Box, Typography, Button, Grid, Avatar, Divider } from "@mui/material";

// Dữ liệu giả lập giống trong hình
const USER_DATA = {
  name: "Bành Thị Tủn",
  email: "mattroibecon@gmail.com",
  gender: "Female",
  address: "123 Khu phố Đáng Iu, TP. Mặt trời",
  phone: "0273654723",
  country: "Viet Nam",
  avatar:
    "https://i.pinimg.com/564x/d1/18/50/d118507742d45c61448b1d9df50c18d3.jpg",
  username: "mattroibecon124",
};

const ProfileInfo = () => {
  return (
    <Box sx={{ width: "100%", pl: { md: 4 } }}>
      {" "}
      {/* pl để tạo khoảng cách với sidebar */}
      {/* 1. HEADER SECTION */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "left",
            fontWeight: 800,
            color: "#2C3E50",
            mb: 0.5,
            fontFamily: '"Lexend", sans-serif',
          }}
        >
          Hồ sơ của tôi
        </Typography>
        <Typography
          sx={{
            textAlign: "left",
            color: "#567C8D",
            fontSize: "0.95rem",
            fontFamily: '"Lexend", sans-serif',
          }}
        >
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </Typography>
      </Box>
      {/* 2. PROFILE CARD */}
      <Box
        sx={{
          bgcolor: "#D0E1E9", // Màu nền xanh xám nhạt giống hình
          borderRadius: "20px",
          p: { xs: 3, md: 4 },
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Grid container spacing={5}>
          {/* CỘT TRÁI: THÔNG TIN CHI TIẾT */}
          <Grid item xs={12} md={7} lg={8}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                textAlign: "left",
                fontFamily: '"Lexend", sans-serif',
              }}
            >
              <InfoRow label="Name" value={USER_DATA.name} />
              <InfoRow label="Email" value={USER_DATA.email} />
              <InfoRow label="Gender" value={USER_DATA.gender} />
              <InfoRow label="Address" value={USER_DATA.address} />
              <InfoRow label="Phone number" value={USER_DATA.phone} />
              <InfoRow label="Country" value={USER_DATA.country} />
            </Box>
          </Grid>

          {/* ĐƯỜNG KẺ DỌC (Chỉ hiện trên desktop) */}
          <Grid
            item
            xs={false}
            md={1}
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Divider
              orientation="vertical"
              sx={{ height: "100%", borderColor: "#AAB7C4", width: "1px" }}
            />
          </Grid>

          {/* CỘT PHẢI: AVATAR & ACTIONS */}
          <Grid item xs={12} md={4} lg={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              {/* Avatar */}
              <Avatar
                src={USER_DATA.avatar}
                sx={{
                  width: 140,
                  height: 140,
                  mb: 2,
                  border: "5px solid white",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                }}
              />

              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  color: "#2C3E50",
                  fontFamily: '"Lexend", sans-serif',
                }}
              >
                {USER_DATA.username}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  color: "white",
                  mb: 4,
                  fontFamily: '"Lexend", sans-serif',
                }}
              >
                {USER_DATA.email}
              </Typography>

              <Button
                variant="contained"
                sx={{
                  bgcolor: "white",
                  color: "#2C3E50",
                  textTransform: "none",
                  borderRadius: "30px",
                  fontWeight: 600,
                  px: 4,
                  py: 1,
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  border: "1px solid transparent",
                  fontFamily: '"Lexend", sans-serif',
                  "&:hover": {
                    bgcolor: "#f8f9fa",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  },
                }}
              >
                Update profile
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

// Component con hiển thị từng dòng thông tin
const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <Box sx={{ display: "flex", alignItems: "baseline" }}>
    <Typography
      sx={{
        width: { xs: "110px", sm: "140px" },
        fontWeight: 800,
        color: "#2C3E50",
        fontSize: "1rem",
        fontFamily: '"Lexend", sans-serif',
        flexShrink: 0,
      }}
    >
      {label}:
    </Typography>
    <Typography
      sx={{
        color: "#567C8D",
        fontWeight: 500,
        fontSize: "1rem",
        fontFamily: '"Lexend", sans-serif',
      }}
    >
      {value}
    </Typography>
  </Box>
);

export default ProfileInfo;
