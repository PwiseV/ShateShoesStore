import React from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";

const Newsletter = () => {
  return (
    <Box
      sx={{ bgcolor: "#34495E", color: "white", py: 10, textAlign: "center" }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, mb: 1, fontFamily: '"Lexend", sans-serif' }}
        >
          Get Your Style Inspiration
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, mb: 5, fontFamily: '"Lexend", sans-serif' }}
        >
          Straight To Your Box
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mb: 4,
            flexWrap: "wrap",
          }}
        >
          <TextField
            placeholder="example@email.com"
            variant="outlined"
            sx={{
              bgcolor: "white",
              borderRadius: "50px",
              width: { xs: "100%", sm: "350px" },
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
                "& fieldset": { border: "none" },
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              bgcolor: "#5D7C89",
              borderRadius: "50px",
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontWeight: 700,
              boxShadow: "none",
              "&:hover": { bgcolor: "#4a6370", boxShadow: "none" },
            }}
          >
            Send message
          </Button>
        </Box>

        <Typography
          variant="caption"
          sx={{
            opacity: 0.8,
            display: "block",
            maxWidth: 600,
            mx: "auto",
            lineHeight: 1.6,
            color: "#F2F1FA",
          }}
        >
          Hộp thư của bạn sắp xinh hơn rồi đó 💌
          <br />
          Đăng ký để nhận tin về bộ sưu tập mới, ưu đãi độc quyền và các mẹo
          phối giày cực hay nhé!
        </Typography>
      </Container>
    </Box>
  );
};

export default Newsletter;
