import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Stack, Button } from "@mui/material";

const FlashSale: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0)
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const TimeBox: React.FC<{ val: number; label: string }> = ({
    val,
    label,
  }) => (
    <Stack alignItems="center" minWidth={64}>
      <Box sx={{ fontSize: "1.9rem", fontWeight: 700, lineHeight: 1 }}>
        {String(val).padStart(2, "0")}
      </Box>
      <Typography
        variant="caption"
        sx={{
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.85)",
          letterSpacing: "1px",
          mt: 0.5,
        }}
      >
        {label}
      </Typography>
    </Stack>
  );

  const products = [
    {
      id: "p1",
      title: "Vintage Sneaker",
      desc: "Giày chạy bộ cực kỳ thoải mái...",
      img: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600",
    },
    {
      id: "p2",
      title: "Classic Runner",
      desc: "Thiết kế tối giản, phù hợp mọi phong cách.",
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    },
  ];

  return (
    <Box
      component="section"
      sx={{ margin: "0 2rem", maxWidth: "1200px", mx: "0 auto", mb: 5 }}
    >
      {/* Outer flex container: two main columns always horizontal */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          alignItems: "stretch",
          width: "100%",
          minHeight: 420,
        }}
      >
        {/* LEFT: Countdown panel (flex:2) */}
        <Box sx={{ flex: "2 1 0" }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              p: 3,
              background: "#2C4A5C",
              color: "white",
              height: "100%",
              minWidth: 650,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Top: Title + description */}
            <Box>
              <Typography sx={{ fontSize: "3rem", fontWeight: 700, mb: 1 }}>
                Flash Sale!
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.95rem",
                  color: "rgba(255,255,255,0.85)",
                  maxWidth: 520,
                }}
              >
                Thời gian ưu đãi đặc biệt đã bắt đầu - hãy để đôi giày hoàn hảo
                nâng bước bạn với mức giá ưu đãi chỉ trong thời gian giới hạn.
              </Typography>
            </Box>

            {/* Middle: centered time counter + button */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                mt: 3,
              }}
            >
              {/* TIME ROW */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <TimeBox val={timeLeft.days} label="Days" />
                <Typography sx={{ fontSize: "1.6rem", opacity: 0.6 }}>
                  :
                </Typography>
                <TimeBox val={timeLeft.hours} label="Hours" />
                <Typography sx={{ fontSize: "1.6rem", opacity: 0.6 }}>
                  :
                </Typography>
                <TimeBox val={timeLeft.minutes} label="Mins" />
                <Typography sx={{ fontSize: "1.6rem", opacity: 0.6 }}>
                  :
                </Typography>
                <TimeBox val={timeLeft.seconds} label="Secs" />
              </Box>

              {/* BUTTON centered under counter */}
              <Button
                variant="outlined"
                sx={{
                  borderColor: "rgba(255,255,255,0.18)",
                  color: "white",
                  textTransform: "none",
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  whiteSpace: "nowrap",
                  mt: 1,
                  "&:hover": {
                    borderColor: "rgba(255,255,255,0.28)",
                    backgroundColor: "rgba(255,255,255,0.02)",
                  },
                }}
              >
                See more →
              </Button>
            </Box>

            {/* Spacer to push nothing — keep Paper flexible */}
            <Box sx={{ flex: "1 1 auto" }} />
          </Paper>
        </Box>

        {/* RIGHT: products panel (flex:1) — product cards arranged horizontally */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          {products.map((p) => (
            <Paper
              key={p.id}
              elevation={1}
              sx={{
                borderRadius: 3,
                p: 2,
                minWidth: 220,
                width: 220,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                alignItems: "center",
                pt: 8,
                pb: 8,
              }}
            >
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: "#F5F5F5",
                  border: "3px solid #2C4A5C",
                }}
              >
                <Box
                  component="img"
                  src={p.img}
                  alt={p.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Box>

              <Typography
                sx={{ fontSize: "1rem", fontWeight: 700, color: "#2C3E50" }}
              >
                {p.title}
                <Typography
                  sx={{ color: "#777", fontSize: "0.85rem", flex: "1 1 auto" }}
                >
                  {p.desc}
                </Typography>
              </Typography>

              <Button
                variant="contained"
                size="large"
                sx={{
                  mt: 1,
                  background: "#4A7C9E",
                  color: "white",
                  textTransform: "none",
                  borderRadius: "50px",
                  py: 0.6,
                  "&:hover": { background: "#3c6b80" },
                }}
              >
                Find more
              </Button>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FlashSale;
