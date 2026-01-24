import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Stack, Button, Container, CircularProgress } from "@mui/material";
import { getAllCategories } from "../../../../services/productlistServices";
// --- INTERFACES ---
interface SubCategory {
  id: string;
  name: string;
}

interface ParentCategory {
  id: string;
  name: string;
  category: SubCategory[];
}

const FlashSale: React.FC = () => {
  const [categories, setCategories] = useState<ParentCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 23, minutes: 59, seconds: 59 });
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {

        setLoading(true);
        const response = await getAllCategories();
        if (response.success) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Lỗi khi fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // 2. Logic Countdown
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

  return (
    <Container maxWidth="lg" sx={{ mb: 4, px: { xs: 2, md: 4 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Mobile dọc, Desktop ngang
          gap: 2,
          alignItems: "stretch",
          width: "100%",
          minHeight: "350px",
        }}
      >
        {/* LEFT: Countdown panel */}
        <Box sx={{ flex: { xs: "1", md: "0 0 40%" } }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              p: { xs: 3, md: 5 },
              background: "linear-gradient(135deg, #2C4A5C 0%, #1A2E3A 100%)",
              color: "white",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontSize: { xs: "1.5rem", md: "2.2rem" }, fontWeight: 800, mb: 1 }}>
              Flash Sale!
            </Typography>
            <Typography sx={{ mb: 4, opacity: 0.8, fontSize: "0.9rem" }}>
              Ưu đãi dành riêng cho các dòng {categories[0]?.name || "Giày dép"} mới nhất.
            </Typography>
            
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4 }}>
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
              sx={{
                bgcolor: "white",
                color: "#2C4A5C",
                width: "fit-content",
                px: 4,
                py: 1,
                fontWeight: 700,
                "&:hover": { bgcolor: "#f0f0f0" }
              }}
            >
              KHÁM PHÁ NGAY
            </Button>
          </Paper>
        </Box>

        {/* RIGHT: Categories từ Backend */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
              <CircularProgress color="inherit" />
            </Box>
          ) : (
            categories.map((parent) => (
              <Paper
                key={parent.id}
                elevation={0}
                sx={{
                  borderRadius: 4,
                  p: 2.5,
                  flex: 1,
                  border: "1px solid #eee",
                  background: "#F8F9FD"
                }}
              >
                <Typography sx={{ fontSize: "1rem", fontWeight: 800, color: "#2C4A5C", mb: 2, borderLeft: "4px solid #567C8D", pl: 1.5 }}>
                  {parent.name.toUpperCase()}
                </Typography>
                
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {parent.category.map((sub) => (
                    <Button
                      key={sub.id}
                      variant="outlined"
                      size="small"
                      sx={{
                        borderRadius: "8px",
                        textTransform: "none",
                        borderColor: "#D1D5DB",
                        color: "#4B5563",
                        fontSize: "0.75rem",
                        "&:hover": { borderColor: "#567C8D", color: "#567C8D" }
                      }}
                    >
                      {sub.name}
                    </Button>
                  ))}
                </Box>
              </Paper>
            ))
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default FlashSale;