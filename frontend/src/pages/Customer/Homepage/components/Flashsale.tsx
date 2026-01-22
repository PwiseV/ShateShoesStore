import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Stack, Button, Container } from "@mui/material";

const FlashSale: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 23, minutes: 59, seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { ...prev, days: Math.max(0, prev.days - 1), hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const TimeBox: React.FC<{ val: number; label: string }> = ({ val, label }) => (
    <Stack alignItems="center" minWidth={{ xs: 40, md: 55 }}>
      <Box sx={{ fontSize: { xs: "1.1rem", md: "1.6rem" }, fontWeight: 800, lineHeight: 1 }}>
        {String(val).padStart(2, "0")}
      </Box>
      <Typography variant="caption" sx={{ fontSize: "0.6rem", fontWeight: 600, textTransform: "uppercase", mt: 0.2, opacity: 0.7 }}>
        {label}
      </Typography>
    </Stack>
  );

  const products = [
    { id: "p1", title: "Vintage Sneaker", img: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600" },
    { id: "p2", title: "Classic Runner", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600" },
  ];

  return (
    <Container maxWidth="lg" sx={{ mb: 4, px: { xs: 2, md: 4 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          gap: 2,
          alignItems: "stretch",
          width: "100%",
          minHeight: "320px", // Đã giảm chiều cao để bớt "to"
        }}
      >
        {/* LEFT: Countdown panel - Gọn gàng hơn */}
        <Box sx={{ flex: "0 0 55%" }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              p: { xs: 2, md: 4 }, // Padding vừa phải
              background: "linear-gradient(135deg, #2C4A5C 0%, #1A2E3A 100%)",
              color: "white",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontSize: { xs: "1.5rem", md: "2.5rem" }, fontWeight: 800, mb: 0.5 }}>
              Flash Sale!
            </Typography>
            <Typography sx={{ mb: 3, opacity: 0.8, fontSize: "0.85rem", maxWidth: "90%" }}>
              Ưu đãi giới hạn cho những đôi giày đẳng cấp.
            </Typography>
            
            <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, md: 1.5 }, mb: 3 }}>
              <TimeBox val={timeLeft.days} label="Ngày" />
              <Typography sx={{ fontSize: "1.2rem", pb: 1.5 }}>:</Typography>
              <TimeBox val={timeLeft.hours} label="Giờ" />
              <Typography sx={{ fontSize: "1.2rem", pb: 1.5 }}>:</Typography>
              <TimeBox val={timeLeft.minutes} label="Phút" />
              <Typography sx={{ fontSize: "1.2rem", pb: 1.5 }}>:</Typography>
              <TimeBox val={timeLeft.seconds} label="Giây" />
            </Box>

            <Button
              variant="contained"
              size="small"
              sx={{
                bgcolor: "white",
                color: "#2C4A5C",
                width: "fit-content",
                px: 3,
                fontWeight: 700,
                borderRadius: "4px",
                "&:hover": { bgcolor: "#f0f0f0" }
              }}
            >
              MUA NGAY
            </Button>
          </Paper>
        </Box>

        {/* RIGHT: Products - Kích thước vừa vặn */}
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, flex: 1 }}>
          {products.map((p) => (
            <Paper
              key={p.id}
              elevation={0}
              sx={{
                borderRadius: 4,
                p: 2,
                flex: 1,
                border: "1px solid #eee",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  width: { xs: 80, md: 130 }, // Ảnh nhỏ lại
                  height: { xs: 80, md: 130 },
                  borderRadius: "50%",
                  overflow: "hidden",
                  mb: 1.5
                }}
              >
                <img src={p.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </Box>
              <Typography sx={{ fontSize: "0.9rem", fontWeight: 700, color: "#2C4A5C" }} noWrap>
                {p.title}
              </Typography>
              <Button size="small" sx={{ mt: 1, fontSize: "0.7rem", color: "#666" }}>
                Chi tiết
              </Button>
            </Paper>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default FlashSale;