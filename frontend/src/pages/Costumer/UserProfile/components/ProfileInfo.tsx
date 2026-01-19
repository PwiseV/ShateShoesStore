import React from "react";
import { Box, Typography, Button, Grid, Avatar, Divider } from "@mui/material";

// 1. CẬP NHẬT DỮ LIỆU GIẢ LẬP
const USER_DATA = {
  name: "Bành Thị Tủn",
  email: "mattroibecon@gmail.com",
  gender: "Female",
  // Sửa address thành mảng string
  address: [
    "123 Khu phố Đáng Iu, TP. Mặt trời",
    "456 Đường Hạnh Phúc, Quận Vui Vẻ",
    "789 Ngõ Bình Yên, Phường An Nhiên",
  ],
  phone: "0273654723",
  country: "Viet Nam",
  avatar:
    "https://i.pinimg.com/564x/d1/18/50/d118507742d45c61448b1d9df50c18d3.jpg",
  username: "mattroibecon124",
};

const ProfileInfo = () => {
  return (
    <Box sx={{ width: "100%", pl: { md: 4 } }}>
      {/* 1. HEADER SECTION (Giữ nguyên) */}
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
          bgcolor: "#D0E1E9",
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
                gap: 2, // Tăng khoảng cách giữa các dòng một chút cho thoáng
                textAlign: "left",
                fontFamily: '"Lexend", sans-serif',
              }}
            >
              <InfoRow label="Name" value={USER_DATA.name} />
              <InfoRow label="Email" value={USER_DATA.email} />
              <InfoRow label="Gender" value={USER_DATA.gender} />

              {/* Truyền mảng địa chỉ vào đây */}
              <InfoRow label="Address" value={USER_DATA.address} />

              <InfoRow label="Phone number" value={USER_DATA.phone} />
              <InfoRow label="Country" value={USER_DATA.country} />
            </Box>
          </Grid>

          {/* ... (Phần Divider và Cột Phải giữ nguyên không đổi) ... */}
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

// 2. CẬP NHẬT COMPONENT CON InfoRow
// Value có thể là string hoặc mảng string
const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | string[];
}) => (
  <Box sx={{ display: "flex", alignItems: "flex-start" }}>
    {" "}
    {/* Đổi thành flex-start để căn lề trên cùng */}
    <Typography
      sx={{
        width: { xs: "110px", sm: "140px" },
        fontWeight: 800,
        color: "#2C3E50",
        fontSize: "1rem",
        fontFamily: '"Lexend", sans-serif',
        flexShrink: 0,
        mt: 0.5, // Căn chỉnh label xuống một chút cho đều với dòng text đầu tiên
      }}
    >
      {label}:
    </Typography>
    <Box sx={{ flex: 1 }}>
      {Array.isArray(value) ? (
        // Nếu là mảng (Nhiều địa chỉ)
        value.map((line, index) => (
          <Typography
            key={index}
            sx={{
              color: "#567C8D",
              fontWeight: 500,
              fontSize: "1rem",
              fontFamily: '"Lexend", sans-serif',
              mb: 0.5, // Khoảng cách giữa các dòng địa chỉ
              display: "block",
            }}
          >
            {line}
          </Typography>
        ))
      ) : (
        // Nếu là chuỗi đơn (Các trường khác)
        <Typography
          sx={{
            color: "#567C8D",
            fontWeight: 500,
            fontSize: "1rem",
            fontFamily: '"Lexend", sans-serif',
            mt: 0.5,
          }}
        >
          {value}
        </Typography>
      )}
    </Box>
  </Box>
);

export default ProfileInfo;
