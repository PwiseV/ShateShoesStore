import React from "react";
import { Box, Typography } from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";

const ContactInfo = () => {
  return (
    <Box sx={{ pr: { md: 4 }, textAlign: "left" }}>
      {/* Subtitle */}
      <Typography
        variant="h6"
        sx={{
          color: "#2C3E50",
          fontWeight: 700,
          fontFamily: '"Lexend", sans-serif',
          mb: 2,
          fontSize: "1.1rem",
        }}
      >
        Chúng tôi ở đây để giúp bạn
      </Typography>

      {/* Main Title - Phóng to cực đại */}
      <Typography
        variant="h1" // Đổi thành h1 cho to
        sx={{
          color: "#2C3E50",
          fontWeight: 900,
          fontFamily: '"Lexend", sans-serif',
          lineHeight: 1.1,
          mb: 2,
          fontSize: { xs: "3rem", md: "4.5rem" }, // Kích thước chữ lớn
          textTransform: "uppercase",
        }}
      >
        Đề Xuất <br /> Giải Pháp <br /> Bạn Cần
      </Typography>

      {/* Description */}
      <Typography
        variant="body1"
        sx={{
          color: "#555",
          fontFamily: '"Lexend", sans-serif',
          mb: 3,
          maxWidth: "90%",
          lineHeight: 1.6,
          fontSize: "1rem",
        }}
      >
        Chúng tôi luôn tin rằng mọi kết nối đều bắt đầu từ sự thấu hiểu và chân
        thành. Mỗi đôi giày không chỉ là một sản phẩm, mà còn là cách chúng tôi
        gửi gắm tình yêu và sự tôn trọng đến khách hàng.
      </Typography>

      {/* Contact Details */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Phone */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <LocalPhoneIcon sx={{ color: "#2C3E50", fontSize: 32 }} />
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: "#666",
                fontFamily: '"Lexend", sans-serif',
                display: "block",
              }}
            >
              Số điện thoại
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "#2C3E50",
                fontWeight: 700,
                fontFamily: '"Lexend", sans-serif',
              }}
            >
              +84 123 456 7890
            </Typography>
          </Box>
        </Box>

        {/* Email */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <EmailIcon sx={{ color: "#2C3E50", fontSize: 32 }} />
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: "#666",
                fontFamily: '"Lexend", sans-serif',
                display: "block",
              }}
            >
              Email
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "#2C3E50",
                fontWeight: 700,
                fontFamily: '"Lexend", sans-serif',
              }}
            >
              abc@gmail.com
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactInfo;
